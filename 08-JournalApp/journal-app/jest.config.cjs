module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  transformIgnorePatterns: [],
  //el transformIgnorePatterns es simplemente para que los modulos de node sean ignorados y no haya problema en el testing
};
