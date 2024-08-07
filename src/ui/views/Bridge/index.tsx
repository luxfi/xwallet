import React from 'react';
import BridgeNavBar from '@/ui/component/Bridge/BridgeNavBar';
import FrameShow from '@/ui/component/Bridge/FrameShow';
const Bridge = () => {
  return (
    <React.Fragment>
      <BridgeNavBar />
      <FrameShow url="https://bridge.lux.network/" />
    </React.Fragment>
  );
};
export default Bridge;
