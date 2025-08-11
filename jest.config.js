module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.js",
    "!src/**/__tests__/**",  // exclude test folders
    "!src/**/?(*.)+(spec|test).[jt]s?(x)" // exclude test files
  ],
  coverageReporters: [
    "json",    // for machine-readable
    "lcov",    // for coverage tools
    "text",    // summary in console
    "clover",  // alternative XML format
    "html"     // for nice local / artifact viewing
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
