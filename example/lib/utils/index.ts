import { TFilteredRoute, TFindLabel } from "@/lib/types";

export const filteredRoute = ({ state, exclude }: TFilteredRoute) =>
    state.routes.filter(route => (exclude?.length ? !exclude.includes(route.name) : !["_sitemap", "+not-found"].includes(route.name)));

export const findLabel = ({ routeName, routes, descriptors }: TFindLabel) => {
    const route = routes.find(route => route.name === routeName);
    if (!route) return routeName;
    const { options } = descriptors[route.key];
    return options.tabBarLabel ?? options.title ?? "";
};
