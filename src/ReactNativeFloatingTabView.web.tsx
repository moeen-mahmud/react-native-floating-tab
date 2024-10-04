import * as React from 'react';

import { ReactNativeFloatingTabViewProps } from './ReactNativeFloatingTab.types';

export default function ReactNativeFloatingTabView(props: ReactNativeFloatingTabViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
