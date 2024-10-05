import { ViewStyle } from "react-native";

export const shadow: ViewStyle = { shadowColor: "#000000", shadowOffset: { width: 0, height: 10 }, shadowRadius: 10, shadowOpacity: 0.1 };

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
