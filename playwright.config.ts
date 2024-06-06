import { defineConfig, devices, test } from "@playwright/test"
import dotenv from "dotenv"
dotenv.config()

export default defineConfig({
    testDir: "./tests",
    timeout: 4 * 60 * 1000,
    expect: {
        timeout: 30 * 1000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 1,
    workers: process.env.CI ? 2 : undefined,
    reporter: process.env.CI ? [["list"], ["blob"], ["allure-playwright"]] : [["list"], ["html"],["allure-playwright"]],
    use: {
        actionTimeout: 60 * 1000,
        trace: "on-first-retry",
        video: "on-first-retry",
        screenshot: "only-on-failure",
    },

    projects: [
        {
            name: "auth",
            use: {
                ...devices["Desktop Chrome"],
            },
            testMatch: "setup.auth.ts",
        },
        {
            name: "cleanup",
            use: {
                ...devices["Desktop Chrome"],
            },
            testMatch: ["setup.clearusers.ts", "setup.clearsessions.ts"],
            dependencies: ["auth"],
        },
        {
            name: "basic",
            use: {
                ...devices["Desktop Chrome"],
            },
            testDir: "./tests/basic",
            dependencies: process.env.CI ? undefined : ["cleanup", "smoke"],
        },
        {
            name: "schedule",
            use: {
                ...devices["Desktop Chrome"],
            },
            testDir: "./tests/scheduleBuilder",
            dependencies: process.env.CI ? undefined : ["cleanup", "smoke"],
        },
        {
            name: "bookingform",
            use: {
                ...devices["Desktop Chrome"],
            },
            testDir: "./tests/formConfig",
            dependencies: process.env.CI ? undefined : ["cleanup"],
        },
        {
            name: "bulkupload",
            use: {
                ...devices["Desktop Chrome"],
            },
            testDir: "./tests/bulkupload",
            dependencies: process.env.CI ? undefined : ["cleanup"],
        },
        {
            name: "locations",
            use: {
                permissions: ["microphone", "camera"],
                ...devices["Desktop Chrome"],
            },
            testDir: "./tests/locations",
            dependencies: process.env.CI ? undefined : ["cleanup"],
        },
        {
            name: "reports",
            use: {
                permissions: ["microphone", "camera"],
                ...devices["Desktop Chrome"],
            },
            testDir: "./tests/reports",
            dependencies: process.env.CI ? undefined : ["cleanup"],
        },
        {
            name: "sessions",
            use: {
                permissions: ["microphone", "camera"],
                ...devices["Desktop Chrome"],
            },
            testDir: "./tests/sessions",
            dependencies: process.env.CI ? undefined : ["cleanup"],
        },
        {
            name: "smoke",
            use: {
                permissions: ["microphone", "camera"],
                ...devices["Desktop Chrome"],
            },
            testDir: "./tests/smoke",
            testIgnore: /.*Logout.*/,
            dependencies: process.env.CI ? undefined : ["cleanup"],
        },
        {
            name: "smokeLogout",
            use: {
                permissions: ["microphone", "camera"],
                ...devices["Desktop Chrome"],
            },
            testDir: "./tests/smoke",
            testMatch: /.*Logout.*/,
            dependencies: process.env.CI ? undefined : ["cleanup", "smoke"],
        },
        {
            name: "users",
            use: {
                permissions: ["microphone", "camera"],
                ...devices["Desktop Chrome"],
            },
            testMatch: "tests/users",
            dependencies: process.env.CI ? undefined : ["cleanup"],
        },
    ],
})
