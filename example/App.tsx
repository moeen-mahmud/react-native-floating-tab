import { StyleSheet, Text, View } from 'react-native';

import * as ReactNativeFloatingTab from 'react-native-floating-tab';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ReactNativeFloatingTab.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
