import { getKongInfo } from '../../utils/request.js';
Page({
    data: {
        commentParam: {
            snid: '0',
            path: 'pages/home/index',
            title: '豫唐星座命理百度智能小程序 - ',
            content: '豫唐星座命理百度智能小程序',
            images: []
        },
        detailPath: ''
    },
    onLoad: function (options) {
        // swan.login();
        this.data.id = options.id;
        this.getArticle();
    },
    getArticle() {
        getKongInfo({
            id: this.data.id
        }).then(res => {
            const post = res.data;
            this.setData({
                'result': post,
                'addx': post.addx,
                'addy': post.addy,
                'alias': post.Alias,
                'add': post.add,
                'commentParam.snid': 'a'+ post.ID,
                'commentParam.path': '/pages/konginfo/index?id=' + post.ID,
                'commentParam.title': post.Alias,
                'detailPath': '/pages/konginfo/index?id=' + post.ID,
            })
        });
    },

    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/konginfo/index?id=' + id
        });
    },
    gomap () {
        swan.openLocation({
            latitude: this.data.addx,
            longitude: this.data.addy,
            scale: 18,
            name: this.data.alias,
            address: this.data.add,
            success: res => {
                console.log('openLocation success', res);
            },
            fail : err => {
                swan.showToast({
                    title: '检查位置权限',
                    icon: 'none'
                })
                console.log('openLocation fail', err);
            }
        });
    }
});