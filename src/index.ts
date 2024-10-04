import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ReactNativeFloatingTab.web.ts
// and on native platforms to ReactNativeFloatingTab.ts
import ReactNativeFloatingTabModule from './ReactNativeFloatingTabModule';
import ReactNativeFloatingTabView from './ReactNativeFloatingTabView';
import { ChangeEventPayload, ReactNativeFloatingTabViewProps } from './ReactNativeFloatingTab.types';

// Get the native constant value.
export const PI = ReactNativeFloatingTabModule.PI;

export function hello(): string {
  return ReactNativeFloatingTabModule.hello();
}

export async function setValueAsync(value: string) {
  return await ReactNativeFloatingTabModule.setValueAsync(value);
}

const emitter = new EventEmitter(ReactNativeFloatingTabModule ?? NativeModulesProxy.ReactNativeFloatingTab);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ReactNativeFloatingTabView, ReactNativeFloatingTabViewProps, ChangeEventPayload };
