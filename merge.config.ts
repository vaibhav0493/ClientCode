// const testRailOptions = {
//     // Whether to add <properties> with all annotations; default is false
//     embedAnnotationsAsProperties: true,
//     // Where to put the report.
//     outputFile: "./test-results/junit-report.xml",
// }

export default {
    reporter: [
        ["html", { outputFile: `all-blob-reports` }],
        ["json", { outputFile: `test-results.json` }],
        // ["junit", testRailOptions],
    ],
}
