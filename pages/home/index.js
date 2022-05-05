// 首页
import utils from '../../utils/request.js';
const app = getApp();


Page({
    data: {
        swiper: [],
        conList: [],
        hostList: [],
        page: 1,
        state: false,
        adid: 0,
        ad1: 0,
    },
    onLoad: function (options) {
        this.getHome();
    },
    getHome() {
        utils.getHome({
            page: this.data.page
        }).then(res => {
            var datas = res.data.list;
            const datacc = datas.map(item => {
                item.PostTime = utils.formatMsgTime(Number(item.PostTime) * 1000, 1);
                return item;
            });
            this.setData({
                conList: this.data.conList.concat(datas)
            });
            var info = {
                conList: this.data.conList.concat(datas)
            }
            swan.setStorage({
                key: "zblog-cache",
                data: info
            });
            if (res.data.pagebar.PageAll <= this.data.page) {
                this.setData({
                    state: true
                });
            }
        });
    },
    refresh() {
        this.setData({
            state: false,
            conList: [],
            page: '1'
        });
        this.getHome();
        swan.hideNavigationBarLoading();
        swan.stopPullDownRefresh();
    },
    turnPage() {
        this.data.page = Number(this.data.page) + 1;
        this.getHome();
    },
    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/article/index?id=' + id
        });
    },
    onShow: function () {
        utils.getSettings({
        }).then(res => {
            this.setData({
                toolnav: res.data.toolnav,
                navimg: res.data.info.navimg,
                onask: res.data.info.onask,
                adid: res.data.info.adid,
                ad1: res.data.info.ad1,
                bannerid: res.data.info.bannerid,
            });
            swan.setNavigationBarTitle({
                title: res.data.info.name
            });
            swan.setPageInfo({
                title: res.data.info.title,
                keywords: res.data.info.keywords,
                description: res.data.info.description,
                articleTitle: res.data.info.title,
                releaseDate: [],
                image: []
            });
        })
    },
    onPullDownRefresh: function () {
        this.refresh(1);
    },
    onReachBottom: function () {
        this.turnPage();
    }
});