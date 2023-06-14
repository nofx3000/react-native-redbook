import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
  TextInput,
  LayoutAnimation,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {formatPhone, replaceBlank} from '../../utils/StringUtil';
import UserStore from '../../stores/UserStore';

import icon_logo_main from '../../assets/icon_main_logo.png';
import icon_unselected from '../../assets/icon_unselected.png';
import icon_selected from '../../assets/icon_selected.png';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_wx_small from '../../assets/icon_wx_small.png';
import icon_triangle from '../../assets/icon_triangle.png';
import icon_eye_open from '../../assets/icon_eye_open.png';
import icon_eye_close from '../../assets/icon_eye_close.png';
import icon_exchange from '../../assets/icon_exchange.png';
import icon_wx from '../../assets/icon_wx.png';
import icon_qq from '../../assets/icon_qq.webp';
import icon_close_modal from '../../assets/icon_close_modal.png';

export default () => {
  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
  const [check, setCheck] = useState<boolean>(false);
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('187 5160 9896');
  const [pwd, setPwd] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<any>>();

  const canLogin = phone?.length === 13 && pwd?.length > 0 && check;

  const renderQuickLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        // !!! 由下至上flex布局，顶部logo绝对定位
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingHorizontal: 56,
      },
      otherLoginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 100,
      },
      otherLoginTxt: {
        fontSize: 16,
        color: '#303080',
      },
      icon_arrow: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginLeft: 6,
        transform: [
          {
            rotate: '180deg',
          },
        ],
      },
      wxLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#05c160',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      icon_wx: {
        width: 40,
        height: 40,
      },
      wxLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      oneKeyLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
      },
      oneKeyLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      logoMain: {
        width: 180,
        height: 95,
        resizeMode: 'contain',
        position: 'absolute',
        top: 160,
      },
    });
    return (
      <View style={styles.root}>
        <View style={allstyles.protocolLayout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
            }}>
            <Image
              source={check ? icon_selected : icon_unselected}
              style={allstyles.radioButton}
            />
          </TouchableOpacity>
          <Text style={allstyles.labelTxt}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.baidu.com');
            }}>
            <Text style={allstyles.protocolText}>
              《用户协议》和《隐私政策》
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.otherLoginButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setLoginType((type: 'quick' | 'input') => {
              if (type === 'quick') {
                return 'input';
              }
              return 'quick';
            });
          }}>
          <Text style={styles.otherLoginTxt}>其他登录方式</Text>
          <Image source={icon_arrow} style={styles.icon_arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.wxLoginButton} activeOpacity={0.7}>
          <Image source={icon_wx_small} style={styles.icon_wx} />
          <Text style={styles.wxLoginTxt}>微信登录</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.oneKeyLoginButton} activeOpacity={0.7}>
          <Text style={styles.oneKeyLoginTxt}>一键登录</Text>
        </TouchableOpacity>

        <Image style={styles.logoMain} source={icon_logo_main} />
      </View>
    );
  };

  const renderInputLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 48,
      },
      pwdLogin: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 56,
      },
      tips: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 8,
      },
      phoneLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 28,
      },
      triangle: {
        width: 12,
        height: 6,
        marginLeft: 6,
      },
      pre86: {
        fontSize: 24,
        color: '#bbb',
      },
      phoneInput: {
        // 剩余空间占满
        flex: 1,
        height: 60,
        backgroundColor: 'transparent',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#333',
        marginLeft: 16,
      },
      pwdLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 8,
      },
      pwdInput: {
        marginLeft: 0,
        marginRight: 16,
      },
      iconEye: {
        width: 30,
        height: 30,
      },
      changeLayout: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
      },
      exchangeIcon: {
        width: 16,
        height: 16,
      },
      codeLoginTxt: {
        fontSize: 14,
        color: '#303080',
        flex: 1,
        marginLeft: 4,
      },
      forgetPwdTxt: {
        fontSize: 14,
        color: '#303080',
      },
      loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20,
      },
      loginButtonDisable: {
        backgroundColor: 'gray',
      },
      loginTxt: {
        fontSize: 20,
        color: 'white',
      },
      wxqqLayout: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 54,
      },
      iconWx: {
        width: 50,
        height: 50,
        marginRight: 60,
      },
      iconQQ: {
        width: 50,
        height: 50,
        marginLeft: 60,
      },
      closeButton: {
        position: 'absolute',
        left: 36,
        top: 24,
      },
      closeImg: {
        width: 28,
        height: 28,
      },
    });
    return (
      <View style={styles.root}>
        <Text style={styles.pwdLogin}>密码登录</Text>
        <Text style={styles.tips}>未注册的手机号登录后将自动注册</Text>
        <View style={styles.phoneLayout}>
          <Text style={styles.pre86}>+86</Text>
          <Image source={icon_triangle} style={styles.triangle} />
          <TextInput
            style={styles.phoneInput}
            placeholderTextColor="#bbb"
            placeholder="请输入手机号码"
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={13}
            value={phone}
            onChangeText={(text: string) => {
              setPhone(formatPhone(text));
            }}
          />
        </View>
        <View style={styles.pwdLayout}>
          <TextInput
            style={[styles.phoneInput, styles.pwdInput]}
            placeholderTextColor="#bbb"
            placeholder="请输入密码"
            autoFocus={false}
            value={pwd}
            onChangeText={(text: string) => setPwd(text)}
            secureTextEntry={!eyeOpen}
          />
          <TouchableOpacity
            onPress={() => {
              setEyeOpen(!eyeOpen);
            }}>
            <Image
              source={eyeOpen ? icon_eye_open : icon_eye_close}
              style={styles.iconEye}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.changeLayout}>
          <Image source={icon_exchange} style={styles.exchangeIcon} />
          <Text style={styles.codeLoginTxt}>验证码登录</Text>
          <Text style={styles.forgetPwdTxt}>忘记密码？</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.loginButton,
            canLogin ? undefined : styles.loginButtonDisable,
          ]}
          activeOpacity={canLogin ? 0.7 : 1}
          onPress={() => {
            if (!canLogin) {
              return;
            }
            const purePhone = replaceBlank(phone);
            UserStore.requestLogin(purePhone, pwd, (success: boolean) => {
              if (success) {
                navigation.replace('MainTab');
              } else {
                ToastAndroid.show('登录失败', ToastAndroid.LONG);
              }
            });
          }}>
          <Text style={styles.loginTxt}>登录</Text>
        </TouchableOpacity>
        <View style={allstyles.protocolLayout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
            }}>
            <Image
              source={check ? icon_selected : icon_unselected}
              style={allstyles.radioButton}
            />
          </TouchableOpacity>
          <Text style={allstyles.labelTxt}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.baidu.com');
            }}>
            <Text style={allstyles.protocolText}>
              《用户协议》和《隐私政策》
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wxqqLayout}>
          <Image source={icon_wx} style={styles.iconWx} />
          <Image source={icon_qq} style={styles.iconQQ} />
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setLoginType('quick');
          }}>
          <Image source={icon_close_modal} style={styles.closeImg} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={allstyles.root}>
      {loginType === 'quick' ? renderQuickLogin() : renderInputLogin()}
    </View>
  );
};

const allstyles = StyleSheet.create({
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
  protocolLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
  },
  labelTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    lineHeight: 20,
  },
  protocolText: {
    fontSize: 12,
    color: '#1020ff',
    lineHeight: 20,
  },
});
