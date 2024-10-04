import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

import { TTabBarButton } from "@/lib/types";
import { springConfig } from "@/lib/config";

type TTabBarButtonV3 = {
    dimensions: {
        height: number;
        width: number;
        x: number;
    };
    setDimensions: ({ height, width, x }: { height: number; width: number; x: number }) => void;
} & TTabBarButton;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const ExpandBarTabButton = ({ isFocused, label, color, icon, colors, fontSize, dimensions, setDimensions, ...props }: TTabBarButtonV3) => {
    const opacity = useSharedValue(0); // For fading in the label

    useEffect(() => {
        opacity.value = withTiming(isFocused ? 1 : 0, { duration: 350 });
    }, [isFocused, dimensions, opacity]);

    const animatedHighlightContainer = useAnimatedStyle(() => {
        const animatedWidth = withSpring(isFocused ? dimensions.width - 10 : 0);
        return {
            width: animatedWidth,
        };
    });

    const animatedTextStyles = useAnimatedStyle(() => {
        const textColor = interpolateColor(opacity.value, [0, 1], [colors.inactiveColor, colors.primaryColor]);

        return {
            color: textColor,
            opacity: opacity.value, // Fade in effect
        };
    });

    return (
        <AnimatedTouchableOpacity
            onLayout={e => {
                if (isFocused) {
                    setDimensions({
                        height: e.nativeEvent.layout.height,
                        width: e.nativeEvent.layout.width,
                        x: e.nativeEvent.layout.x,
                    });
                }
            }}
            activeOpacity={1}
            style={[
                {
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                    flexDirection: "row",
                },
                styles.container,
            ]}
            {...props}
        >
            {/* The animated expanding highlight */}
            <Animated.View
                style={[
                    {
                        position: "absolute",
                        left: 5,
                        backgroundColor: isFocused ? colors.focusColor : "transparent",
                        borderRadius: 50,
                        height: dimensions.height,
                    },
                    animatedHighlightContainer,
                ]}
            />

            {/* Icon */}
            <Animated.View style={styles.icon}>{icon}</Animated.View>

            {/* Text label with animated opacity */}
            {label && isFocused && (
                <Animated.Text
                    numberOfLines={1}
                    style={[
                        {
                            fontSize,
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
        flexGrow: 1,
        zIndex: 3,
    },
    icon: { paddingVertical: 8, borderRadius: 50 },
});
