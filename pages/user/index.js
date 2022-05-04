// resume.js
import utils from '../../utils/request.js';
const app = getApp();

Page({
    data: {
        isLogin:0
    },
    onShow: function (options) {
        var isLogin = 0;
        try {
            isLogin = swan.getStorageSync('login')
        } catch (e) {
        }
        this.setData({
            'isLogin': isLogin
        });
        swan.setNavigationBarTitle({
            title: "个人中心",
        });
        swan.setPageInfo({
            title:"个人中心",
            keywords: "个人中心",
            description: "个人中心",
            articleTitle: "个人中心",
            releaseDate: [],
            image: []
        });
        utils.getSettings({
        }).then(res => {
            this.setData({
                name: res.data.info.name,
                aboutimg: res.data.info.aboutimg,
                aboutback: res.data.info.aboutback,
                userimg: res.data.info.userimg,
                aboutid: res.data.info.aboutid,
                announceid: res.data.info.mzid,
                contacton: res.data.info.contacton,
                navimg: res.data.info.navimg,
                onask: res.data.info.onask
            });
        })
    },
    onListItemTap(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '../page/index?id=' + id
        });
    },
    toast(title, icon = 'none') {
        swan.showToast({title, icon});
    },
    refresh() {
        this.setData({
            login: 0,
        });
        swan.hideNavigationBarLoading();
        //停止下拉刷新
        swan.stopPullDownRefresh();
    },
    clearStorage() {
        let res = swan.clearStorageSync();
        if (!(res instanceof Error)) {
            this.setData({
                'isLogin': 0
            });
            this.refresh();
        }
    },
    onLogin() {
        swan.navigateTo({
          url: '../login/index',
        });
    },
    onTargetOrder(e) {
        let _this = this;
        if (!_this.onCheckLogin()) {
            return false;
        }
        let id = e.currentTarget.dataset.type;
        swan.navigateTo({
            url: '/pages/asklist/index?id=' + id
        });
    },
    onCheckLogin() {
        let _this = this;
        if (!_this.data.isLogin) {
            swan.showToast({
                title: '很抱歉，您还没有登录',
                icon: 'none'
            });
            return false;
        }
        return true;
    }
});