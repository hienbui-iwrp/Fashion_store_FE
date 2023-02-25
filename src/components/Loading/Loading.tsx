import * as React from 'react';
import { Spin } from 'antd';

export interface ILoadingProps {
}

export default function Loading(props: ILoadingProps) {
  return (
    <Spin style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
  );
}
