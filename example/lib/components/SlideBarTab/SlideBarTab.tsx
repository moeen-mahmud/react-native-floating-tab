import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { SlideBarTabButton } from "@/lib/components/SlideBarTab/SlideBarTabButton";
import { colorFamilies, initialFontSize } from "@/lib/config";
import { shadow, tabbar, tabContainer } from "@/lib/styles";
import { TTabBar } from "@/lib/types";

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

    const routes = useMemo(() => state.routes.filter(route => !["_sitemap", "+not-found"].includes(route.name)), [state.routes]);

    const findLabel = (routeName: string) => {
        const route = routes.find(route => route.name === routeName);
        if (!route) return routeName;
        const { options } = descriptors[route.key];
        return options.tabBarLabel ?? options.title ?? "";
    };

    const handleOnPress = (routeName: string) => {
        navigation.navigate(routeName);
    };

    return (
        <View
            style={[
                {
                    ...styles.tabbar,
                    backgroundColor: primaryColor,
                    bottom: insets.bottom,
                },
                shadow,
            ]}
        >
            {routes.map(route => {
                const label = findLabel(route.name);
                const { options } = descriptors[route.key];

                const isFocused = state.index === state.routes.indexOf(route);

                return (
                    <SlideBarTabButton
                        key={route.name}
                        onPress={() => handleOnPress(route.name)}
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
                                size: 20,
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
                            width: dimensions.width - 20,
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

        marginHorizontal: 20,
        paddingVertical: 10,
    },

    highlighterContainer: {
        zIndex: 2,
        flex: 1,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        left: 0,
    },
    highlighter: { borderRadius: 50 },
});
