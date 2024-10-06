import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { sizes } from "../../styles";
import { TTabBarButton } from "../../types";

type TRollingBallTabButton = {
    setDimensions: ({ height, width, x }: { height: number; width: number; x: number }) => void;
} & TTabBarButton;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const RollingBallTabButton: React.FC<TRollingBallTabButton> = ({
    isFocused,
    label,
    routeName,
    color,
    icon,
    routes,
    colors,
    fontSize,
    setDimensions,
    ...props
}) => {
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused, { duration: 350 });
    }, [scale, isFocused]);

    const animatedStyles = useAnimatedStyle(() => {
        const scaleValue = withSpring(interpolate(scale.value, [0, 1], [1, 1.4]));

        return {
            transform: [{ scale: scaleValue }],
        };
    });

    const animatedTextStyles = useAnimatedStyle(() => {
        const textColor = interpolateColor(scale.value, [0, 1], [colors.inactiveColor, "transparent"]);

        return {
            color: textColor,
        };
    });

    return (
        <AnimatedTouchableOpacity
            onLayout={e => {
                isFocused &&
                    setDimensions({
                        height: e.nativeEvent.layout.height,
                        width: e.nativeEvent.layout.width,
                        x: e.nativeEvent.layout.x,
                    });
            }}
            activeOpacity={1}
            style={[styles.container]}
            {...props}
        >
            <Animated.View style={[styles.icon, animatedStyles]}>{icon}</Animated.View>
            {label && (
                <>
                    {!isFocused && (
                        <Animated.Text
                            numberOfLines={1}
                            style={[
                                {
                                    color,
                                    fontSize,
                                },
                                animatedTextStyles,
                            ]}
                        >
                            {label}
                        </Animated.Text>
                    )}
                </>
            )}
        </AnimatedTouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    iconWrapper: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        padding: 8,
        borderRadius: sizes.border.circle,
    },
});
