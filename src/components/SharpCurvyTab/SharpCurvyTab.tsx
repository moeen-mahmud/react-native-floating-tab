import { useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";

import { SharpCurvyTabButton } from "./SharpCurvyTabButton";
import { colorFamilies, iconSize, initialFontSize } from "../../config";
import { shadow, sizes, tabbar, tabContainer } from "../../styles";
import { TTabBar } from "../../types";
import { filteredRoute, handleNavigate, mapOperation } from "../../utils";

export const SharpCurvyTab: React.FC<TTabBar> = ({
    state,
    descriptors,
    navigation,
    insets,
    focusColor = colorFamilies.focusColor,
    primaryColor = colorFamilies.primaryColor,
    inactiveColor = colorFamilies.inactiveColor,
    fontSize = initialFontSize,
}) => {
    const routes = useMemo(() => filteredRoute({ state, exclude: ["_sitemap", "+not-found"] }), [state.routes]);

    return (
        <View style={styles.container}>
            <View
                style={[
                    {
                        ...styles.tabbar,
                        bottom: Platform.OS === "ios" ? insets.bottom + sizes.insets.bottom.ios : insets.bottom + sizes.insets.bottom.android,
                    },
                    shadow,
                ]}
            >
                {routes.map(route => {
                    const { label, options, isFocused } = mapOperation({
                        state,
                        route,
                        routeKey: route.key,
                        descriptors,
                        routeName: route.name,
                        routes,
                    });

                    return (
                        <SharpCurvyTabButton
                            key={route.name}
                            onPress={() =>
                                handleNavigate({
                                    navigation,
                                    routeName: route.name,
                                })
                            }
                            isFocused={isFocused}
                            routeName={route.name}
                            color={isFocused ? primaryColor : inactiveColor}
                            label={typeof label === "string" ? label : ""}
                            routes={routes}
                            icon={
                                options.tabBarIcon &&
                                options.tabBarIcon({
                                    focused: isFocused,
                                    color: isFocused ? primaryColor : inactiveColor,
                                    size: iconSize,
                                })
                            }
                            colors={{
                                focusColor,
                                primaryColor,
                                inactiveColor,
                            }}
                            fontSize={fontSize}
                        />
                    );
                })}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: tabContainer,
    tabbar: {
        ...tabbar,
        backgroundColor: "transparent",
        justifyContent: "space-between",
    },
});
