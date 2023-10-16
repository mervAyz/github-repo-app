module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
      "\\.(css|sass)$": "identity-obj-proxy",
    },
    testEnvironment: 'jsdom',
  };
  
  