// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);

// module.exports = config;

module.exports = (async () => {
    let defaultConfig = await getDefaultConfig(__dirname);

    const { transformer, resolver } = defaultConfig;

    defaultConfig.transformer = {
        ...transformer,
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
    };

    defaultConfig.resolver = {
        ...resolver,
        assetExts: resolver.assetExts.filter(ext => ext !== "svg"),
        sourceExts: [...resolver.sourceExts, "svg"],
    };

    defaultConfig.resolver.resolverMainFields.unshift("sbmodern");
    return defaultConfig;
})();
