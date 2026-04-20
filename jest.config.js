module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.spec.(ts|tsx)", "**/?(*.)+(spec).(ts|tsx)"],
};
