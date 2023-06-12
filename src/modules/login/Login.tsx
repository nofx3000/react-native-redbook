import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import icon_logo_main from '../../assets/icon_main_logo.png';
import icon_unselected from '../../assets/icon_unselected.png';
import icon_selected from '../../assets/icon_selected.png';

export default () => {
  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
  const [check, setCheck] = useState<boolean>(false);

  const renderQuickLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingHorizontal: 40,
      },
      protocalLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
      },
      redioButton: {
        width: 20,
        height: 20,
      },
    });
    return (
      <View style={styles.root}>
        <View style={styles.protocalLayout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
            }}>
            <Image
              source={check ? icon_selected : icon_unselected}
              style={styles.redioButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderInputLogin = () => {
    return <View />;
  };

  return (
    <View style={styles.root}>
      {loginType === 'quick' ? renderQuickLogin() : renderInputLogin()}
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
