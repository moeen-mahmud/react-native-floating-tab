import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { TabBarButtonV1 } from './TabBarButtonV1';
import { TTabBar } from '../../types';

export const TabBarV1 = ({
    state,
    descriptors,
    navigation,
    insets,
    focusColor = '#EF4D75',
    primaryColor = '#ffffff',
    inactiveColor = '#757172',
    fontSize = 11,
}: TTabBar) => {
    const routes = useMemo(
        () =>
            state.routes.filter(
                route => !['_sitemap', '+not-found'].includes(route.name),
            ),
        [state.routes],
    );

    const findLabel = (routeName: string) => {
        const route = routes.find(route => route.name === routeName);
        if (!route) return routeName;
        const { options } = descriptors[route.key];
        return options.tabBarLabel ?? options.title ?? '';
    };

    const handleOnPress = (routeName: string) => {
        navigation.navigate(routeName);
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    ...styles.tabbar,
                    bottom: insets.bottom,
                }}
            >
                {routes.map(route => {
                    const label = findLabel(route.name);

                    const { options } = descriptors[route.key];

                    const isFocused =
                        state.index === state.routes.indexOf(route);

                    return (
                        <TabBarButtonV1
                            key={route.name}
                            onPress={() => handleOnPress(route.name)}
                            isFocused={isFocused}
                            routeName={route.name}
                            color={isFocused ? primaryColor : inactiveColor}
                            label={typeof label === 'string' ? label : ''}
                            routes={routes}
                            icon={
                                options.tabBarIcon &&
                                options.tabBarIcon({
                                    focused: isFocused,
                                    color: isFocused
                                        ? primaryColor
                                        : inactiveColor,
                                    size: 20,
                                })
                            }
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
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabbar: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderCurve: 'continuous',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
});
