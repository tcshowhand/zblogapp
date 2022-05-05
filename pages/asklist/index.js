// 列表
import utils from '../../utils/request.js';

const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        state: true,
        id: 4,
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
        utils.userAskList({
            'type': this.data.id,
            'page': this.data.page
        }).then(res => {
            var datas = res.data.list;

            if(this.data.page==1){
                this.setData({
                    navList: datas,
                    id: this.data.id,
                    typename:res.data.typename
                });
            }else{
                this.setData({
                    navList: this.data.navList.concat(datas),
                    typename:res.data.typename
                });
            }

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
            url: '/pages/askinfo/index?id=' + id
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
        swan.hideNavigationBarLoading();
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
        swan.setNavigationBarTitle({ title: '在线咨询' });
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.refresh();
    },

    bindHeaderTap: function (e) {
        this.data.id = e.currentTarget.dataset.type;
        this.getNavList();
    },
    cancelOrder: function (e) {
        let id= e.currentTarget.dataset.id;
        utils.cancelask({
            id: id
        }).then(res => {
            this.getNavList();
        });
    },
});