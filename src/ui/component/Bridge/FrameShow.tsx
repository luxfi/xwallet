import React, { useState } from 'react';
interface Props {
  url: string;
}
const FrameShow: React.FC<Props> = ({ url }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleLoad = () => {
    setIsLoading(false);
  };
  return (
    <React.Fragment>
      {isLoading && <p>Loading...</p>}
      <iframe
        src={url}
        width={'100%'}
        height={'640px'}
        style={{ border: 'none' }}
        onLoad={handleLoad}
      ></iframe>
    </React.Fragment>
  );
};
export default FrameShow;
