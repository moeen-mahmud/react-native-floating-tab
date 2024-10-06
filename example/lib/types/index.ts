import { BottomTabBarProps, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export type TColors = {
    focusColor: string;
    primaryColor: string;
    inactiveColor: string;
};

export type TTabBarButton = {
    isFocused: boolean;
    label: string;
    routeName: string;
    color: string;
    icon: any;
    routes: any[];
    onPress: () => void;
    colors: TColors;
    fontSize: number;
};

export type TTabBar = {
    focusColor?: string;
    primaryColor?: string;
    inactiveColor?: string;
    tabBackgroundColor?: string;
    fontSize?: number;
} & BottomTabBarProps;

export type TFilteredRoute = {
    state: BottomTabBarProps["state"];
    exclude?: string[];
};

export type TFindLabel = {
    routeName: string;
    routes: BottomTabBarProps["state"]["routes"];
    descriptors: BottomTabBarProps["descriptors"];
};

export type THandleNavigate = {
    routeName: string;
    navigation: BottomTabBarProps["navigation"];
};

export type TDetermineFocused = {
    state: BottomTabBarProps["state"];
    route: BottomTabBarProps["state"]["routes"][0];
};

export type TMapOperation = {
    routeName: string;
    descriptors: BottomTabBarProps["descriptors"];
    routes: BottomTabBarProps["state"]["routes"];
    state: BottomTabBarProps["state"];
    routeKey: string;
    route: BottomTabBarProps["state"]["routes"][0];
};
