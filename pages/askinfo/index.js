// 详情页
const app = getApp();
import utils from '../../utils/request.js';
Page({
    data: {
        id: '',
        // 地址
        result: {},
        // 内容
        RelatedList: [],
        // 相关
        abstract: '',
        // 摘要
        followData: [{
            type: 'primary'
        }],
        sty: 0,
        disabled: true,
        // 关注
        commentParam: {
            snid: '0',
            path: 'pages/home/index',
            title: '豫唐百度小程序 - ',
            content: '豫唐百度小程序',
            images: []
        },
        detailPath: '',
        // 底部互动 bar 的配置
        toolbarConfig: {
            moduleList: ['comment', 'like', 'favor', 'share']
            // 若 moduleList 中配置有 share 模块，默认是有，则该属性为必填，title 必传
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.id = options.id; // 接收id
        this.getArticle();
    },
    /**
     * 文章数据获取--数据调用加载
     */
    getArticle() {
        utils.userAskInfo({
            id: this.data.id
        }).then(res => {
            const post = res.data;
            post.Content = post.Content
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/<section/g, '<div')
            .replace(/\/section>/g, '\div>')
            .replace(/&nbsp;/g, ' ')
            .replace(/pre class="prism-highlight/g, 'pre style="overflow: auto; padding-top: 22px; padding-bottom: 22px; color: #690; font-size: 14px; background-color: #f2f4fc; padding: 1em; margin: .5em 0;" class="prism-highlight language-php" selectable="true" space="ensp"')
            .replace(/<img/gi, '<img class="rich-img" style="max-width:100%!important;" ');
            post.PostTime = utils.formatMsgTime(Number(post.PostTime) * 1000, 1);
            post.UpdateTime = utils.formatMsgTime(Number(post.UpdateTime) * 1000, 1);
            this.setData({
                'result': post,
                'RelatedList': post.RelatedList,
                'commentParam.snid': 'a'+ post.kongId,
                'commentParam.path': '/pages/konginfo/index?id=' + post.kongId,
                'commentParam.title': post.kongAlias,
                'commentParam.content': post.kongAlias,
                'commentParam.images': [],
                'toolbarConfig.placeholder': '吐槽一下',
                'toolbarConfig.share.title': post.kongAlias,
                'toolbarConfig.share.path': '/pages/konginfo/index?id=' + post.kongId,
                'detailPath': '/pages/konginfo/index?id=' + post.kongId,
            })
        });
    },

    // 跳转内容页
    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/article/index?id=' + id
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        requireDynamicLib('myDynamicLib').listenEvent();
    },

    clickComment(e) {
        swan.showToast({
            title: this.data.result.Title
        });
    },
    // bindfavorstatuschange 事件可能的应用场景：用户点击关注后，设置隐藏按钮
    favorstatuschange(e) {
        if (e.detail && e.detail.isFavor === true) {
            this.setData({
                'disabled': false
            });
        }
    },
    score: function (e) {
        //点击按钮，样式改变
        let that = this;
        that.setData({
          sty: 1
        });
    },
    // 取消事件后提示信息
    statuschange(e) {
    },

    playTTS() {
        // 低版本开发者工具环境下，可能不支持 TTS 语音播报模拟，请使用百度 APP 打开小程序体验
        swan.canIUse('playSystemTTS')
            && swan.playSystemTTS({
                success() {
                },
                fail(reason) {

                },
                complete() {
                }
            });
    }
});