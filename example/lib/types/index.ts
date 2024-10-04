import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
export type TTabBarButton = {
    isFocused: boolean;
    label: string;
    routeName: string;
    color: string;
    icon: any;
    routes: any[];
    onPress: () => void;
    colors: {
        focusColor: string;
        primaryColor: string;
        inactiveColor: string;
    };
    fontSize: number;
};

export type TTabBar = {
    focusColor?: string;
    primaryColor?: string;
    inactiveColor?: string;
    tabBackgroundColor?: string;
    fontSize?: number;
} & BottomTabBarProps;
