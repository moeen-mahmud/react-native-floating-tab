import { useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";

import { ElevatedTabButton } from "@/lib/components/ElevatedTab/SplashedTabButton";
import { colorFamilies, initialFontSize } from "@/lib/config";
import { shadow, tabbar, tabContainer } from "@/lib/styles";
import { TTabBar } from "@/lib/types";

export const ElevatedTab: React.FC<TTabBar> = ({
    state,
    descriptors,
    navigation,
    insets,
    focusColor = colorFamilies.focusColor,
    primaryColor = colorFamilies.primaryColor,
    inactiveColor = colorFamilies.inactiveColor,
    fontSize = initialFontSize,
}) => {
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
        <View style={styles.container}>
            <View
                style={[
                    {
                        ...styles.tabbar,
                        backgroundColor: primaryColor,
                        bottom: Platform.OS === "ios" ? insets.bottom : insets.bottom + 20,
                    },
                    shadow,
                ]}
            >
                {routes.map(route => {
                    const label = findLabel(route.name);

                    const { options } = descriptors[route.key];

                    const isFocused = state.index === state.routes.indexOf(route);

                    return (
                        <ElevatedTabButton
                            key={route.name}
                            onPress={() => handleOnPress(route.name)}
                            isFocused={isFocused}
                            routeName={route.name}
                            color={isFocused ? focusColor : inactiveColor}
                            label={typeof label === "string" ? label : ""}
                            routes={routes}
                            icon={
                                options.tabBarIcon &&
                                options.tabBarIcon({
                                    focused: isFocused,
                                    color: isFocused ? focusColor : inactiveColor,
                                    size: 20,
                                })
                            }
                            options={options}
                            colors={{
                                focusColor,
                                primaryColor,
                                inactiveColor,
                            }}
                            fontSize={fontSize}
                        />
                    );
                })}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: tabContainer,
    tabbar: {
        ...tabbar,
        justifyContent: "space-between",
    },
});
