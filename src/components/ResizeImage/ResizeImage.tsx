import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';

type Props = React.ComponentProps<typeof Image> & {
  width: number;
};

export default ({source, width: showWidth}: Props) => {
  const [height, setHeight] = useState<number>(200);
  useEffect(() => {
    if (source.uri) {
      Image.getSize(source.uri, (width: number, height: number) => {
        const showHeight = (showWidth * height) / width;
        setHeight(showHeight);
      });
    }
  });
  return (
    <Image
      source={source}
      style={{
        width: showWidth,
        height: height,
        resizeMode: 'cover',
      }}
    />
  );
};
