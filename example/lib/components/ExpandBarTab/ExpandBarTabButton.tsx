import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

import { TTabBarButton } from "@/lib/types";

type TExpandBarTabButton = {
    dimensions: {
        height: number;
        width: number;
        x: number;
    };
    setDimensions: ({ height, width, x }: { height: number; width: number; x: number }) => void;
} & TTabBarButton;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const ExpandBarTabButton: React.FC<TExpandBarTabButton> = ({
    isFocused,
    label,
    color,
    icon,
    colors,
    fontSize,
    dimensions,
    routes,
    setDimensions,
    ...props
}) => {
    const opacity = useSharedValue(0); // For fading in the label

    useEffect(() => {
        opacity.value = withTiming(isFocused ? 1 : 0, { duration: 500 });
    }, [isFocused, opacity]);

    const animatedHighlightContainer = useAnimatedStyle(() => {
        const animatedWidth = withSpring(isFocused ? dimensions.width - 10 : 0);
        return {
            width: animatedWidth,
        };
    });

    const animatedContainer = useAnimatedStyle(() => {
        const flexValue = withSpring(isFocused ? 2 : 1);

        return {
            flex: flexValue,
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
            style={[styles.container, animatedContainer]}
            {...props}
        >
            {/* The animated expanding highlight */}
            <Animated.View
                style={[
                    {
                        height: dimensions.height,
                        backgroundColor: isFocused ? colors.focusColor : "transparent",
                    },
                    styles.highlightContainer,
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
        zIndex: 3,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        flexDirection: "row",
    },
    highlightContainer: { position: "absolute", borderRadius: 50, left: 5 },
    icon: { paddingVertical: 8, borderRadius: 50 },
});
