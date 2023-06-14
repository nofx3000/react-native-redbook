import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default () => {
  return (
    <View style={styles.root}>
      <Text>商店</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
