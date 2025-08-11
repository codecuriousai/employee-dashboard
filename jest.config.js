module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts",
      "!src/index.js"
    ],
    coverageReporters: ["json", "lcov", "text", "clover", "html"],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    }
  };