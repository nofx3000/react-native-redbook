import React, {useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {useLocalStore} from 'mobx-react';
import HomeStore from './HomeStore';
import {observer} from 'mobx-react';

import icon_heart from '../../assets/icon_heart.png';
import icon_heart_empty from '../../assets/icon_heart_empty.png';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default observer(() => {
  const store = useLocalStore(() => new HomeStore());
  useEffect(() => {
    store.requestHomeList();
  }, []);

  const renderItem = ({item, index}: {item: ArticleSimple; index: number}) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.image}} style={styles.itemImage} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image source={{uri: item.avatarUrl}} style={styles.avatarImg} />
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <Image source={icon_heart_empty} style={styles.heart} />
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        style={styles.flatList}
        data={store.homeList}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        numColumns={2}>
        首页
      </FlatList>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  container: {
    paddingTop: 6,
  },
  item: {
    width: (SCREEN_WIDTH - 18) / 2,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 12,
    marginVertical: 4,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    flex: 1,
  },
  countTxt: {
    fontSize: 14,
    marginLeft: 4,
  },
});
