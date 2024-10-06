import { useEffect, useMemo, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { RollingBallTabButton } from "./RollingBallTabButton";
import { colorFamilies, iconSize, initialFontSize } from "../../config";
import { shadow, sizes, tabbar, tabContainer } from "../../styles";
import { TTabBar } from "../../types";
import { filteredRoute, handleNavigate, mapOperation } from "../../utils";

export const RollingBallTab: React.FC<TTabBar> = ({
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

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
            height: "auto",
        };
    });

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
                    <RollingBallTabButton
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
                        setDimensions={setDimensions}
                    />
                );
            })}

            <Animated.View
                style={[
                    {
                        width: dimensions.width,
                    },
                    styles.highlighterContainer,
                    animatedStyles,
                ]}
            >
                <View
                    style={[
                        {
                            backgroundColor: focusColor,
                        },
                        styles.highlighter,
                    ]}
                />
            </Animated.View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: tabContainer,
    tabbar: {
        ...tabbar,
        justifyContent: "space-between",

        marginHorizontal: sizes.margin.horizontal,
        paddingVertical: sizes.padding.vertical,
    },

    highlighterContainer: {
        paddingVertical: sizes.padding.vertical,
        zIndex: 2,
        flex: 1,
        position: "absolute",
        left: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    highlighter: { width: sizes.border.circle, height: sizes.border.circle, borderRadius: sizes.border.circle },
});
