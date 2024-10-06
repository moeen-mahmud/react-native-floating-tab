import {
    colorFamilies,
    filteredRoute,
    handleNavigate,
    iconSize,
    initialFontSize,
    mapOperation,
    shadow,
    sizes,
    tabbar,
    tabContainer,
    TTabBar,
} from "@react-native-floating-tab";
import { useEffect, useMemo, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { SlideBarTabButton } from "./SlideBarTabButton";

export const SlideBarTab: React.FC<TTabBar> = ({
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
                    <SlideBarTabButton
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
                        colors={{
                            focusColor,
                            primaryColor,
                            inactiveColor,
                        }}
                        fontSize={fontSize}
                    />
                );
            })}

            <Animated.View
                style={[
                    {
                        width: dimensions.width,
                        height: dimensions.height,
                    },
                    styles.highlighterContainer,
                    animatedStyles,
                ]}
            >
                <View
                    style={[
                        {
                            backgroundColor: focusColor,
                            width: dimensions.width - sizes.dimensions.widthGap,
                            height: dimensions.height,
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
        justifyContent: "center",

        marginHorizontal: sizes.margin.horizontal,
        paddingVertical: sizes.padding.vertical,
    },

    highlighterContainer: {
        zIndex: 2,
        flex: 1,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        left: 0,
    },
    highlighter: { borderRadius: sizes.border.circle },
});
