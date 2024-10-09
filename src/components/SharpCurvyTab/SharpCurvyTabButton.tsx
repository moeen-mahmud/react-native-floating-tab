import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";

import { springConfig } from "../../config";
import { sizes } from "../../styles";
import { TTabBarButton } from "../../types";
import { CurveSVGComponent } from "../CurveSVG/CurveSVGComponent";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const SharpCurvyTabButton: React.FC<TTabBarButton> = ({ isFocused, label, routeName, color, icon, routes, colors, fontSize, ...props }) => {
    const animatedStyles = useAnimatedStyle(() => {
        const backgroundColor = withSpring(isFocused ? colors.focusColor : "transparent", springConfig);

        return {
            backgroundColor,
            transform: [{ translateY: withSpring(isFocused ? -35 : 0) }],
        };
    }, [isFocused]);
    //TODO: Work in progress
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

                    //TODO: Work in progress
                    // borderTopLeftRadius: shouldCurveFirstItem ? 8 : 0,
                    // borderBottomLeftRadius: shouldCurveFirstItem ? 8 : 0,
                    // borderTopRightRadius: shouldCurveLastItem ? 8 : 0,
                    // borderBottomRightRadius: shouldCurveLastItem ? 8 : 0,
                },
            ]}
            {...props}
        >
            {isFocused && (
                <CurveSVGComponent
                    styles={styles.svg}
                    colors={colors}
                />
            )}
            <Animated.View style={[{ transform: [{ scale: withSpring(isFocused ? 1.4 : 1, springConfig) }] }, animatedStyles, styles.iconWrapper]}>
                {icon}
            </Animated.View>

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
        paddingVertical: sizes.padding.vertical,
    },
    svg: {
        position: "absolute",
        top: 0,
    },
    iconWrapper: {
        padding: 8,
        borderRadius: sizes.border.circle,
    },
});
