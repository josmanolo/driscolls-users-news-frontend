module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
  transformIgnorePatterns: ["node_modules/(?!axios)"],
};
