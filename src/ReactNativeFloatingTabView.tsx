import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ReactNativeFloatingTabViewProps } from './ReactNativeFloatingTab.types';

const NativeView: React.ComponentType<ReactNativeFloatingTabViewProps> =
  requireNativeViewManager('ReactNativeFloatingTab');

export default function ReactNativeFloatingTabView(props: ReactNativeFloatingTabViewProps) {
  return <NativeView {...props} />;
}
