// 列表
import utils from '../../utils/request.js';

const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        state: true,
        id: '',
        title: '',
        intro: '',
        page: '1',
        navList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.id = options.id; // 接收id
        this.getNavList();
    },

    getNavList() {
        utils.getKongList({
            'cate_id': this.data.id,
            'page': this.data.page
        }).then(res => {
            var datas = res.data.list;

            const datacc = datas.map(item => {
                item.PostTime = utils.formatMsgTime(Number(item.PostTime) * 1000, 1);
                return item;
            });

            this.setData({
                navList: this.data.navList.concat(datas)
            });

            if (res.data.pagebar.PageFirst <= this.data.page) {
                this.setData({
                    state: true
                });
            }
        });

    },

    // 查看详情
    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/konginfo/index?id=' + id
        });
    },

    // 刷新
    refresh() {
        this.setData({
            state: true,
            id: '',
            title: '',
            intro: '',
            page: '1',
            navList: []
        });

        this.getNavList();
        //隐藏导航条加载动画
        swan.hideNavigationBarLoading();
        //停止下拉刷新
        swan.stopPullDownRefresh();
    },

    turnPage() {
        this.data.page = Number(this.data.page) + 1;
        this.getNavList();
    },

    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {
        swan.setNavigationBarTitle({ title: '员工列表' });
    },

    onPullDownRefresh: function () {
        this.refresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.turnPage();
    }
});