import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

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
