import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { ElevatedTab, ExpandBarTab, RollingBallTab, SharpCurvyTab, SlideBarTab } from "react-native-floating-tab";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false,
            }}
            initialRouteName="index"
            backBehavior="history"
            // tabBar={props => <RollingBallTab {...props} />}
            // tabBar={props => <SharpCurvyTab {...props} />}
            // tabBar={props => <SlideBarTab {...props} />}
            // tabBar={props => <ElevatedTab {...props} />}
            // tabBar={props => <ExpandBarTab {...props} />}
        >
            <Tabs.Screen
                name="calendar"
                options={{
                    title: "Calendar",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "calendar" : "calendar-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "code-slash" : "code-slash-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="message"
                options={{
                    title: "Message",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "chatbox" : "chatbox-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    title: "Notification",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "notifications" : "notifications-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
