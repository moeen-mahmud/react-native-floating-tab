import { TDetermineFocused, TFilteredRoute, TFindLabel, THandleNavigate, TMapOperation } from "@/lib/types";

export const filteredRoute = ({ state, exclude }: TFilteredRoute) => {
    return state.routes.filter(route => (exclude?.length ? !exclude.includes(route.name) : !["_sitemap", "+not-found"].includes(route.name)));
};

export const findLabel = ({ routeName, routes, descriptors }: TFindLabel) => {
    const route = routes.find(route => route.name === routeName);
    if (!route) return routeName;
    const { options } = descriptors[route.key];
    return options.tabBarLabel ?? options.title ?? "";
};

export const handleNavigate = ({ navigation, routeName }: THandleNavigate): void => {
    navigation.navigate(routeName);
};

export const determineFocused = ({ state, route }: TDetermineFocused): boolean => state.index === state.routes.indexOf(route);

export const mapOperation = ({ routeName, descriptors, routes, state, route }: TMapOperation) => {
    const label = findLabel({
        routeName,
        descriptors,
        routes,
    });

    const { options } = descriptors[route.key];

    const isFocused = determineFocused({ state, route });

    return {
        label,
        isFocused,
        options,
    };
};
