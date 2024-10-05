import { useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";

import { ElevatedTabButton } from "@/lib/components/ElevatedTab/ElevatedTabButton";
import { colorFamilies, iconSize, initialFontSize } from "@/lib/config";
import { shadow, tabbar, tabContainer } from "@/lib/styles";
import { TTabBar } from "@/lib/types";
import { filteredRoute, findLabel } from "@/lib/utils";

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
    const routes = useMemo(() => filteredRoute({ state, exclude: ["_sitemap", "+not-found"] }), [state.routes]);

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
                    const label = findLabel({
                        routeName: route.name,
                        descriptors,
                        routes,
                    });

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
                                    size: iconSize,
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
