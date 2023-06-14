import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../home/Home';
import Mine from '../mine/Mine';
import Message from '../message/Message';
import Shop from '../shop/Shop';
import icon_tab_home_normal from '../../assets/icon_tab_home_normal.png';
import icon_tab_home_selected from '../../assets/icon_tab_home_selected.png';

import icon_tab_shop_normal from '../../assets/icon_tab_shop_normal.png';
import icon_tab_shop_selected from '../../assets/icon_tab_shop_selected.png';

import icon_tab_mine_normal from '../../assets/icon_tab_mine_normal.png';
import icon_tab_mine_selected from '../../assets/icon_tab_mine_selected.png';

import icon_tab_message_normal from '../../assets/icon_tab_message_normal.png';
import icon_tab_message_selected from '../../assets/icon_tab_message_selected.png';

const BottomTab = createBottomTabNavigator();

export default () => {
  return (
    <View style={styles.root}>
      <BottomTab.Navigator
        screenOptions={({route}) => {
          return {
            tabBarIcon: ({focused, color, size}) => {
              let img: any;
              switch (route.name) {
                case 'Home':
                  img = focused ? icon_tab_home_selected : icon_tab_home_normal;
                  break;
                case 'Shop':
                  img = focused ? icon_tab_shop_selected : icon_tab_shop_normal;
                  break;
                case 'Message':
                  img = focused
                    ? icon_tab_message_selected
                    : icon_tab_message_normal;
                  break;
                case 'Mine':
                  img = focused ? icon_tab_mine_selected : icon_tab_mine_normal;
                  break;
                default:
                  img = focused ? icon_tab_home_selected : icon_tab_home_normal;
                  break;
              }
              return (
                <Image
                  source={img}
                  style={{
                    width: size,
                    height: size,
                    tintColor: color,
                  }}
                />
              );
            },
          };
        }}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            title: '首页',
          }}
        />
        <BottomTab.Screen
          name="Mine"
          component={Mine}
          options={{
            title: '我的',
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
          name="Shop"
          component={Shop}
          options={{
            title: '购物',
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
});
