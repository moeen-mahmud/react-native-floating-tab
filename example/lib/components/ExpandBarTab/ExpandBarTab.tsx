import { useEffect, useMemo, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";

import { ExpandBarTabButton } from "@/lib/components/ExpandBarTab/ExpandBarTabButton";
import { colorFamilies, iconSize, initialFontSize } from "@/lib/config";
import { shadow, sizes, tabbar, tabContainer } from "@/lib/styles";
import { TTabBar } from "@/lib/types";
import { filteredRoute, handleNavigate, mapOperation } from "@/lib/utils";

export const ExpandBarTab: React.FC<TTabBar> = ({
    state,
    descriptors,
    navigation,
    insets,
    focusColor = colorFamilies.focusColor,
    primaryColor = colorFamilies.primaryColor,
    inactiveColor = colorFamilies.inactiveColor,
    fontSize = initialFontSize,
}) => {
    const translateX = useSharedValue(0);

    const [dimensions, setDimensions] = useState({
        height: 0,
        width: 0,
        x: 0,
    });

    useEffect(() => {
        translateX.value = withSpring(dimensions.x);
    }, [state.index, dimensions]);

    const routes = useMemo(() => filteredRoute({ state, exclude: ["_sitemap", "+not-found"] }), [state.routes]);

    return (
        <View
            style={[
                {
                    ...styles.tabbar,
                    backgroundColor: primaryColor,
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
                    <ExpandBarTabButton
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
                        setDimensions={setDimensions}
                        dimensions={dimensions}
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
    );
};
const styles = StyleSheet.create({
    container: tabContainer,
    tabbar: {
        ...tabbar,
        justifyContent: "center",

        marginHorizontal: sizes.margin.horizontal,
        paddingVertical: sizes.padding.vertical,
    },
});
