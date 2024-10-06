import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { sizes } from "@/lib/styles";
import { TTabBarButton } from "@/lib/types";

type TSlideBarTabButton = {
    setDimensions: ({ height, width, x }: { height: number; width: number; x: number }) => void;
} & TTabBarButton;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const SlideBarTabButton: React.FC<TSlideBarTabButton> = ({
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
    }, [isFocused, scale]);

    const animatedTextStyles = useAnimatedStyle(() => {
        const textColor = interpolateColor(scale.value, [0, 1], [colors.inactiveColor, colors.primaryColor]);

        return {
            color: textColor,
            transform: [
                {
                    scale: scale.value,
                },
            ],
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
            style={[
                styles.container,
                {
                    flex: isFocused ? 2 : 1,
                },
            ]}
            {...props}
        >
            <Animated.View style={[styles.icon]}>{icon}</Animated.View>
            {label && isFocused && (
                <>
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
                </>
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
    icon: { paddingVertical: 8, borderRadius: sizes.border.circle },
    iconWrapper: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
});
