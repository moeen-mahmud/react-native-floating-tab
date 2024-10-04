import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";

import { springConfig } from "../../config";
import { TTabBarButton } from "../../types";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const SharpCurvyTabButton = ({ isFocused, label, routeName, color, icon, routes, colors, fontSize, ...props }: TTabBarButton) => {
    const animatedStyles = useAnimatedStyle(() => {
        const scale = withSpring(isFocused ? 1.4 : 1, springConfig);

        const backgroundColor = withSpring(isFocused ? colors.focusColor : "transparent", springConfig);

        return {
            backgroundColor,
            padding: 8,
            borderRadius: 50,
            transform: [isFocused ? { translateY: withSpring(-35) } : { translateY: withSpring(0) }, { scale }],
        };
    }, [isFocused]);

    // const shouldCurveFirstItem = useMemo(() => {
    //     const index = routes.findIndex(route => route.name === routeName);
    //     return index === 0;
    // }, [routes, routeName]);

    // const shouldCurveLastItem = useMemo(() => {
    //     const index = routes.findIndex(route => route.name === routeName);
    //     return index === routes.length - 1;
    // }, [routes, routeName]);

    return (
        <AnimatedTouchableOpacity
            activeOpacity={1}
            style={[
                styles.container,
                {
                    backgroundColor: isFocused ? "transparent" : colors.primaryColor,
                    // borderTopLeftRadius: shouldCurveFirstItem ? 8 : 0,
                    // borderBottomLeftRadius: shouldCurveFirstItem ? 8 : 0,
                    // borderTopRightRadius: shouldCurveLastItem ? 8 : 0,
                    // borderBottomRightRadius: shouldCurveLastItem ? 8 : 0,
                },
            ]}
            {...props}
        >
            {isFocused && (
                <Svg
                    width={78}
                    height={68}
                    fill="none"
                    style={styles.svg}
                    {...props}
                >
                    <Path
                        fill={colors.primaryColor}
                        fillRule="evenodd"
                        d="M4.047 0H.8v67.911h76.4V0h-3.247C72.856 18.351 57.627 32.895 39 32.895 20.373 32.895 5.144 18.35 4.047 0Z"
                        clipRule="evenodd"
                    />
                </Svg>
            )}
            <Animated.View style={[animatedStyles]}>{icon}</Animated.View>

            <Text
                style={{
                    color,
                    fontSize,
                }}
            >
                {label}
            </Text>
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
        paddingVertical: 10,
    },
    svg: {
        position: "absolute",
        top: 0,
    },
    iconWrapper: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
});
