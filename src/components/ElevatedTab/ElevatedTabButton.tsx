import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

import { sizes } from "../../styles";
import { TTabBarButton } from "../../types";

type TElevatedTabButton = TTabBarButton & {
    options: BottomTabNavigationOptions;
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const ElevatedTabButton: React.FC<TElevatedTabButton> = ({
    isFocused,
    label,
    routeName,
    color,
    icon,
    routes,
    colors,
    fontSize,
    options,
    ...props
}) => {
    const opacity = useSharedValue(0); // For fading in the label

    useEffect(() => {
        opacity.value = withTiming(isFocused ? 1 : 0);
    }, [isFocused, opacity]);

    const animatedStyles = useAnimatedStyle(() => {
        const color = interpolateColor(opacity.value, [0, 1], [colors.primaryColor, colors.focusColor]);

        return {
            color,
            transform: [
                {
                    translateY: withSpring(isFocused ? -2 : 0),
                },
            ],
        };
    }, [isFocused]);

    const animatedTextStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withSpring(isFocused ? -2 : 0),
                },
            ],
            opacity: opacity.value, // Fade in effect
        };
    }, [isFocused]);

    return (
        <AnimatedTouchableOpacity
            activeOpacity={1}
            style={[styles.container]}
            {...props}
        >
            <Animated.View
                style={[
                    {
                        transform: [
                            {
                                scale: withSpring(isFocused ? 0.9 : 1),
                            },
                        ],
                    },
                    animatedStyles,
                ]}
            >
                {icon}
            </Animated.View>

            {label && isFocused && (
                <Animated.Text
                    numberOfLines={1}
                    style={[
                        {
                            fontSize,
                            color,
                        },
                        animatedTextStyles,
                    ]}
                >
                    {label}
                </Animated.Text>
            )}
        </AnimatedTouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 68,
        paddingVertical: sizes.padding.vertical,
    },
});
