import utils from '../../utils/request.js';
Page({
    data: {

    },
    formSubmit(e) {

        console.log(e.detail.formId)
        utils.postSmtForm({
            title: e.detail.value.intro,
            uid: this.data.id,
            formid: e.detail.formId
        }).then(res => {
            swan.showToast({
                title: res.message,
                icon: 'success',
                duration: 1000
            });
        });
    },
    onShow: function () {
        var login = 0;
        try {
            login = swan.getStorageSync('login')
        } catch (e) {
            // Do something when catch error
        }
        this.setData({
            'login': login
        });

        utils.getKongInfo({
            id: this.data.id
        }).then(res => {
            const post = res.data;
            this.data.id = post.ID;
            this.setData({
                'uid': post.ID,
                'Alias': post.Alias,
                'Info': post.info,
            })
        });

    },
    onLoad: function (options) {
        this.data.id = options.id;
    },
    getphonenumber: function (e) {
        let res = '';
        if (e.detail && e.detail.errMsg === 'getPhoneNumber:ok') {
            swan.getLoginCode({
                success: res => {
                    utils.getLogin({
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