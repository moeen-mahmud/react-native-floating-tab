import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { SlideBarTabButton } from "@/lib/components/SlideBarTab/SlideBarTabButton";
import { TTabBar } from "@/lib/types";

export const SlideBarTab = ({
    state,
    descriptors,
    navigation,
    insets,
    focusColor = "#EF4D75",
    primaryColor = "#ffffff",
    inactiveColor = "#757172",
    fontSize = 11,
}: TTabBar) => {
    const translateX = useSharedValue(0);
    // const scale = useSharedValue(0);

    const [dimensions, setDimensions] = useState({
        height: 0,
        width: 0,
        x: 0,
    });

    useEffect(() => {
        translateX.value = withSpring(dimensions.x);
    }, [state.index, dimensions]);

    // useEffect(() => {
    //     scale.value = withTiming(0.5, { duration: 0 }, () => {
    //         scale.value = withTiming(1, { duration: 350 });
    //     });
    // }, [state.index]);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                // { scale: scale.value },
            ],
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
            style={{
                ...styles.tabbar,
                backgroundColor: primaryColor,
                bottom: insets.bottom,
            }}
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
                        left: 0,
                    },
                    styles.highlighterContainer,
                    animatedStyles,
                ]}
            >
                <View
                    style={{
                        backgroundColor: focusColor,
                        width: dimensions.width - 20,
                        height: dimensions.height,
                        borderRadius: 50,
                    }}
                />
            </Animated.View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    tabbar: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        borderCurve: "continuous",
        shadowColor: "black",
        shadowOffset: { width: 0, height: -10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },

    highlighterContainer: {
        zIndex: 2,
        flex: 1,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
});
