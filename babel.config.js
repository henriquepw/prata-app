module.exports = (api) => {
  /** @type {import('@babel/core').ConfigFunction} */
  api.cache(true)
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          unstable_transformImportMeta: true,
        },
      ],
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "~/": "./src/",
          },
        },
      ],
      "react-native-worklets/plugin",
    ],
  }
}
