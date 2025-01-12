module.exports = (api) => {
  /** @type {import('@babel/core').ConfigFunction} */
  api.cache(true)
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
        },
      ],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "~/": "./",
            "@ui/": ["./components/ui/"],
            "tailwind.config": "./tailwind.config.js",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  }
}
