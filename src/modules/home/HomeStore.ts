import {action, observable} from 'mobx';
import {request} from '../../utils/request';
import {ToastAndroid} from 'react-native';

const SIZE = 10;

export default class HomeStore {
  page: number = 1;
  @observable homeList: ArticleSimple[] = [];
  @observable refreshing: boolean = false;
  @action
  resetPage = () => {
    this.page = 1;
    this.homeList = [];
  };
  requestHomeList = async () => {
    if (this.refreshing) {
      return;
    }
    try {
      const params = {
        page: this.page,
        size: SIZE,
      };
      this.refreshing = true;
      const {data} = await request('homeList', params);
      if (data?.length > 0) {
        this.homeList = [...this.homeList, ...data];
        this.page++;
      } else {
        // 提示没有内容了
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.refreshing = false;
    }
  };
}
