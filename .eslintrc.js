module.exports = {
  'env': {
    'browser': true,
    'es2020': true,
  },
  "globals": {
    "process": "writable",
    "test": "readonly",
    "expect": "readonly",
  },
  'extends': [
    'plugin:react/recommended',
    "eslint:recommended",
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },

    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    "react/prop-types": [0],
    "require-jsdoc": [0],
    "max-len": [0]
  },
  "settings": {
    "react": {
      "version": "detect",
    },
  }
};
