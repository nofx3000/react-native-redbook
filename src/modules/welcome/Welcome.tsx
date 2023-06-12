import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';

import icon_logo_main from '../../assets/icon_main_logo.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    setTimeout(() => {
      startLogin();
    }, 3000);
  }, []);

  const startLogin = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.root}>
      <Image source={icon_logo_main} style={styles.logo_main} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo_main: {
    width: 200,
    height: 100,
    marginTop: 200,
    resizeMode: 'contain',
  },
});
