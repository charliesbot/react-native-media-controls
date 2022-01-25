const copy = require("rollup-plugin-copy-assets");

module.exports = {
  rollup(config, options) {
    const { localDev, name } = options;
    const outputDirectory = (() => {
      if (localDev) {
        return `example/${name}`;
      }

      return `dist/`;
    })();

    const external = config.external;
    config.external = id => external(id) || id.endsWith(".png");

    config.plugins = [
      ...config.plugins,
      copy({
        assets: ["src/assets"],
        dest: `${outputDirectory}/assets`,
      }),
    ];

    if (localDev) {
      config.output.file = config.output.file.replace("dist", outputDirectory);
    }

    return config;
  },
};
