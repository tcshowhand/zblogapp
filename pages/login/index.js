const app = getApp();
import { getLogin } from '../../utils/request.js';

Page({
    data: {
        buttonClass: 'buttonClass',
        showLogin: true,
        showCustomLogin: true,
        resData: '',
        customLoginData: ''
    },

    getphonenumber: function (e) {
        let res = '';
        if (e.detail && e.detail.errMsg === 'getPhoneNumber:ok') {
            swan.getLoginCode({
                success: res => {
                    getLogin({
                        encryptedData: e.detail.encryptedData,
                        errMsg: e.detail.errMsg,
                        iv: e.detail.iv,
                        app: 1,
                        code: res.code
                    }).then(date => {

                    });
                }
            });
        } else {
            res = '获取手机号信息失败';
            swan.showToast({
                title: '请先在百度app登录百度账户',
                icon: 'none'
            });
        }
    },
    loaderror: function (e) {
        let res = '获取手机号信息失败';
        if (e.detail) {
            swan.showToast({
                title: e.detail.errMsg,
                icon: 'none'
            });
        }
        this.setData({
            resData: res
        });
    },
});