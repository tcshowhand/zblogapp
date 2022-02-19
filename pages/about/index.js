// resume.js
import utils from '../../utils/request.js';
const app = getApp();

Page({
    data: {
    },
    onShow: function (options) {
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
            this.toast('清理成功', 'none');
            this.refresh();
        }
    }
});