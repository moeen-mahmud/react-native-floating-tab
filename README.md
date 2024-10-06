# react-native-floating-tab

A collection of simple animated floating bottom tabs for React Native. Supports React Navigation and Expo Router

> **Note:** This is a beta release and may contain bugs. A report and a fix for any bugs found will be highly appreciated.

## Demo

See the demo of the components here => [Demo](https://imgur.com/a/3S9maUi)

## Requirements

- React Native `0.72` and above | [React Native](https://reactnative.dev/)
- Expo SDK `51` and above | [Expo SDK](https://docs.expo.dev/)
- React Navigation or Expo Router | [React Navigation](https://reactnavigation.org/) | [Expo Router](https://docs.expo.dev/router/introduction/)
- React Native Reanimated (by default included in Expo) | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- React Native SVG | [React Native SVG](https://github.com/software-mansion/react-native-svg)

## Installation

```bash
npm install react-native-floating-tab@1.0.1-beta.0

```

## Usage

```jsx
import { ExpandBarTab, RollingBallTab, SharpCurvyTab, SlideBarTab, ElevatedTab } from "react-native-floating-tab";

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false,
            }}
            initialRouteName="index"
            backBehavior="history"
            tabBar={props => <ExpandBarTab {...props} />}
            // tabBar={props => <RollingBallTab {...props} />}
            // tabBar={props => <SharpCurvyTab {...props} />}
            // tabBar={props => <SlideBarTab {...props} />}
            // tabBar={props => <ElevatedTab {...props} />}
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
            {/* Add more screens here */}
        </Tabs>
    )

}
```

## Running the Example

To run the example, clone the repository and run the following commands. Make sure your project environment is set up properly.

```bash
cd example
npm install

# For Android
npm run android

# For iOS
npm run ios
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. I'm still working on improving the library and adding more features. Any contributions you make are **greatly appreciated**.

> **Note:** A detailed **Contributing** guide will be added soon.

## Running the project locally

To run the project locally, clone the repository and run the following commands. Make sure your project environment is set up properly.

```bash
npm install

npm run build # I haven't add any test yet. So, just build the project
```

After successful build, you can locally package the library and use it in your project.

```bash
npm pack

```

This will create a `.tgz` file in the root directory. You can use this file in your project by moving it to the example directory and running `npm install <package.tgz>`.

Then, run the example project as mentioned [above](#running-the-example).

## License

See the [LICENSE](./LICENSE) file for license rights and limitations (MIT).

Build with ❤️ by [Moeen Mahmud](https://github.com/moeen-mahmud)
