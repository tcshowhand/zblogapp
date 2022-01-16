import utils from '../../utils/request.js';
Page({
    data: {

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
                'onpay': post.onpay,
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
    introInput:function(e)
    {
        this.setData({
            intro: e.detail.value
        })
    },
    formSubmit(e) {
        utils.postSmtForm({
            title: this.data.intro,
            uid: this.data.id
        }).then(res => {
            swan.showToast({
                title: res.message,
                icon: 'success',
                duration: 1000
            });
        });
    },
    requestPolymerPayment(e) {
        utils.userPay({
            title: this.data.intro,
            uid: this.data.id
        }).then(res => {
            let data = res.data;
                if (data.errno !== 0) {
                    console.log('create order err', data);
                    return;
                }
                let orderInfo = data.data;
                swan.requestPolymerPayment({
                    orderInfo: orderInfo,
                    bannedChannels: this.getData('bannedChannels'),
                    success: res =>  {
                        swan.showToast({
                            title: '支付成功',
                            icon: 'success'
                        });
                    }
                });
        });
    },
});