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
import FlowList from '../../components/flowlist/FlowList';
import ResizeImage from '../../components/ResizeImage/ResizeImage';
import Heart from '../../components/Heart/Heart';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default observer(() => {
  const store = useLocalStore(() => new HomeStore());
  useEffect(() => {
    store.requestHomeList();
  }, []);

  const renderItem = ({item, index}: {item: ArticleSimple; index: number}) => {
    return (
      <View style={styles.item}>
        <ResizeImage
          source={{uri: item.image}}
          width={(SCREEN_WIDTH - 18) / 2}
        />
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image source={{uri: item.avatarUrl}} style={styles.avatarImg} />
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <Heart
            value={item.isFavorite}
            onValueChanged={(value: boolean) => {
              console.log(value);
            }}
          />
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
        </View>
      </View>
    );
  };

  const refreshNewData = () => {
    store.resetPage();
    store.requestHomeList();
  };

  const loadMoreData = () => {
    store.requestHomeList();
  };

  const Footer = () => {
    return <Text style={styles.footerTxt}>没有更多数据</Text>;
  };

  return (
    <View style={styles.root}>
      <FlowList
        style={styles.flatList}
        data={store.homeList}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        numColumns={2}
        refreshing={store.refreshing}
        onRefresh={() => {
          refreshNewData();
        }}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          loadMoreData();
        }}
        ListFooterComponent={Footer}>
        首页
      </FlowList>
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
  footerTxt: {
    width: '100%',
    fontSize: 12,
    color: '#999',
    marginVertical: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
