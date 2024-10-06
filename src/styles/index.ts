import { ViewStyle } from "react-native";

export const sizes = {
    svg: {
        width: 78,
        height: 68,
    },

    shadow: {
        shadowRadius: 10,
        shadowOpacity: 0.1,
        width: 0,
        height: 10,
    },

    border: {
        regular: 8,
        circle: 50,
    },

    insets: {
        bottom: {
            ios: 0,
            android: 20,
        },
        top: {
            ios: 0,
            android: 0,
        },
    },
    dimensions: {
        widthGap: 20,
        heightGap: 0,
    },

    margin: {
        horizontal: 20,
        vertical: 10,
    },
    padding: {
        vertical: 10,
        horizontal: 10,
    },
    gap: {
        regular: 10,
    },
};

export const shadow: ViewStyle = {
    shadowColor: "#000000",
    shadowOffset: { width: sizes.shadow.width, height: sizes.shadow.height },
    shadowRadius: sizes.shadow.shadowRadius,
    shadowOpacity: sizes.shadow.shadowOpacity,
};

export const tabContainer: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
};

export const tabbar: ViewStyle = {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 8,
    borderCurve: "continuous",
};
