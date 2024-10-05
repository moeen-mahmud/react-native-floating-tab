import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { RollingBallTabButton } from "@/lib/components/RollingBallTab/RollingBallTabButton";
import { colorFamilies, iconSize, initialFontSize } from "@/lib/config";
import { shadow, tabbar, tabContainer } from "@/lib/styles";
import { TTabBar } from "@/lib/types";
import { filteredRoute, findLabel } from "@/lib/utils";

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
                const label = findLabel({
                    routeName: route.name,
                    descriptors,
                    routes,
                });
                const { options } = descriptors[route.key];

                const isFocused = state.index === state.routes.indexOf(route);

                return (
                    <RollingBallTabButton
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

        marginHorizontal: 20,
        paddingVertical: 10,
    },

    highlighterContainer: {
        paddingVertical: 10,
        zIndex: 2,
        flex: 1,
        position: "absolute",
        left: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    highlighter: { width: 50, height: 50, borderRadius: 50 },
});
