import {request} from '../utils/request';
import {action, flow, observable} from 'mobx';
import {save} from '../utils/Storage';

class UserStore {
  @observable userInfo: any;

  @action
  setUserInfo = (info: any) => {
    this.userInfo = info;
  };

  requestLogin = flow(function* (
    this: UserStore,
    phone: string,
    pwd: string,
    callback: (success: boolean) => void,
  ) {
    try {
      const params = {
        name: phone,
        pwd,
      };
      const {data} = yield request('login', params);
      if (data) {
        save('userInfo', JSON.stringify(data));
        this.userInfo = data;
        callback(true);
      } else {
        this.userInfo = null;
        callback(false);
      }
    } catch (error) {
      console.error(error);
      this.userInfo = null;
      callback(false);
    }
  });
}

// ESM单例导出
export default new UserStore();
