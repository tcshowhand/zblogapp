import utils from '../../utils/request.js';
const app = getApp();
Page({
    data: {
        pageTitle: '内容搜索',
        appkey: '',
        searchBoxConf: {
            placeholder: '请填写搜索词',
            needVoice: false
        },
        searchMode: 'timely',
        searchResultConf: {
            dataType: ['2'],
            showTitle: false,
            showSpin: true
        },
        historyMode: 'home'
    },
    onLoad: function () {
        utils.getSettings({
        }).then(res => {
            this.setData({
                appkey: res.data.info.appkey,
            });
            swan.setPageInfo({
                title:"内容搜索",
                keywords: "内容搜索",
                description: "内容搜索",
                articleTitle: "内容搜索",
                releaseDate: [],
                image: []
            });
        })
    },
});