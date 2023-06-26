import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
} from 'react-native';

import icon_heart from '../../assets/icon_heart.png';
import icon_heart_empty from '../../assets/icon_heart_empty.png';

type Props = {
  value: boolean;
  onValueChanged?: (value: boolean) => void;
  size: number;
};

export default ({value, onValueChanged, size = 20}: Props) => {
  const [showState, setShowState] = useState<boolean>(false);
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const scaleAnimation = Animated.timing(scale, {
    toValue: 1.8,
    duration: 300,
    useNativeDriver: false,
  });

  const opacityAnimation = Animated.timing(opacity, {
    toValue: 0,
    duration: 400,
    delay: 200,
    useNativeDriver: false,
  });

  useEffect(() => {
    setShowState(value);
  }, [value]);

  const onHeartPressed = () => {
    const newState = !showState;
    setShowState(newState);
    onValueChanged?.(newState);
    if (newState) {
      opacity.setValue(1);
      Animated.parallel([scaleAnimation, opacityAnimation]).start();
    } else {
      opacity.setValue(0);
      scale.setValue(1);
    }
  };

  return (
    <TouchableOpacity onPress={onHeartPressed}>
      <Image
        style={[
          styles.heart,
          {
            width: size,
            height: size,
          },
        ]}
        source={showState ? icon_heart : icon_heart_empty}
      />
      <Animated.View
        style={[
          styles.halo,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: size / 20,
            transform: [
              {
                scale,
              },
            ],
            opacity: opacity,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  halo: {
    borderColor: 'red',
    position: 'absolute',
  },
});
