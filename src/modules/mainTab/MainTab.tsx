import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import Home from '../home/Home';
import Mine from '../mine/Mine';
import Message from '../message/Message';
import Shop from '../shop/Shop';

import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

import icon_tab_publish from '../../assets/icon_tab_publish.png';

const BottomTab = createBottomTabNavigator();

const RedBookTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const {routes, index} = state;

  const onPublishPress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      },
      (res: ImagePickerResponse) => {
        const {assets} = res;
        if (assets?.length < 1) {
          console.log('选择图片失败');
          return;
        }
        const {uri, width, height, fileName, fileSize, type} = assets[0];
        console.log(uri, width, height, fileName, fileSize, type);
      },
    );
  };

  return (
    <View style={styles.tabBarContainer}>
      {routes.map((route, i) => {
        const {options} = descriptors[route.key];
        const label = options.title;
        const isFocused = index === i;
        if (i === 2) {
          return (
            <TouchableOpacity
              style={styles.tabItem}
              key={label}
              onPress={onPublishPress}>
              <Image source={icon_tab_publish} style={styles.iconTabPublish} />
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity
            style={styles.tabItem}
            key={label}
            onPress={() => {
              navigation.navigate(route.name);
            }}>
            <Text
              style={{
                fontSize: isFocused ? 18 : 16,
                color: isFocused ? '#333' : '#999',
                fontWeight: isFocused ? 'bold' : 'normal',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default () => {
  return (
    <View style={styles.root}>
      <BottomTab.Navigator tabBar={RedBookTabBar}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            title: '首页',
          }}
        />
        <BottomTab.Screen
          name="Message"
          component={Message}
          options={{
            title: '消息',
          }}
        />
        <BottomTab.Screen
          name="Publish"
          component={Shop}
          options={{
            title: '发布',
          }}
        />
        <BottomTab.Screen
          name="Shop"
          component={Shop}
          options={{
            title: '购物',
          }}
        />
        <BottomTab.Screen
          name="Mine"
          component={Mine}
          options={{
            title: '我的',
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  tabBarContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTabPublish: {
    width: 58,
    height: 42,
    resizeMode: 'contain',
  },
});
