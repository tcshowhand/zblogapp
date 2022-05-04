// 详情页
const app = getApp();
import utils from '../../utils/request.js';
Page({
    data: {
        id: '',
        adid: 0,
        ad2: 0,
        result: {},
        RelatedList: [],
        abstract: '',
        followData: [{
            type: 'primary'
        }],
        sty: 0,
        disabled: true,
        // 关注
        commentParam: {
            snid: '0',
            path: 'pages/home/index',
            title: '豫唐百度小程序',
            content: '豫唐百度小程序',
            images: []
        },
        detailPath: '',
        toolbarConfig: {
            moduleList: ['comment', 'like', 'favor', 'share']
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
        utils.getArticle({
            id: this.data.id,
            viewnums:1
        }).then(res => {
            const post = res.data.post;
            post.Content = post.Content
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/<section/g, '<div')
            .replace(/\/section>/g, '\div>')
            .replace(/&nbsp;/g, ' ')
            .replace(/pre class="prism-highlight/g, 'pre style="overflow: auto; padding-top: 22px; padding-bottom: 22px; color: #690; font-size: 14px; background-color: #f2f4fc; padding: 1em; margin: .5em 0;" class="prism-highlight language-php" selectable="true" space="ensp"')
            .replace(/<img([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img')
            .replace(/<img/gi, '<img class="rich-img" style="max-width:100%!important;" ')
            .replace(/<h2([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<h2')
            .replace(/<h2([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<h2')
            .replace(/<h2>/ig, '<h2 style="border-bottom: 1px solid #dfe2ef;padding: 0 0 1rem;font-size: 20px;">');

            post.PostTime = utils.formatMsgTime(Number(post.PostTime) * 1000, 1);
            post.UpdateTime = utils.formatMsgTime(Number(post.UpdateTime) * 1000, 1);
            this.setData({
                'commentParam.snid': this.data.id,
                'commentParam.path': '/pages/article/index?id=' + this.data.id,
                'commentParam.title': post.Title.substring(0,15),
                'commentParam.content': post.Intro.replace(/<[^>]+>/g, "").substring(0,15),
                'commentParam.images': post.Thumb,
                'toolbarConfig.placeholder': '吐槽一下',
                'toolbarConfig.share.title': post.Title.substring(0,15),
                'toolbarConfig.share.path': '/pages/article/index?id=' + this.data.id,
                'detailPath': '/pages/article/index?id=' + this.data.id,
                'result': post,
                'RelatedList': post.RelatedList,
                'adid': res.data.post.adid,
                'ad2': res.data.post.ad2
            });
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        utils.getArticle({
            id: this.data.id,
        }).then(res => {
            swan.setNavigationBarTitle({
                title: "文章详情页"
            });
            var article = res.data.post;
            res.data.post.UpdateTime = utils.toDate(Number(res.data.post.UpdateTime) * 1000, 1);
            swan.setPageInfo({
                title: article.Title,
                keywords: article.TagsName,
                description: article.Intro.replace(/<[^>]+>/g, "").substring(0,30),
                articleTitle: article.Title,
                releaseDate: res.data.post.UpdateTime,
                image: article.Thumb,
                visit: {
                    pv: article.ViewNums
                }
            })
        })
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
    },
    commentshow(){
        this.setData({
            interactionModal: !0
        });
    },
    commentshowa(){
        this.setData({
            interactionModal: 0
        });
    },
    smtform() {
        swan.navigateTo({
            url: '/pages/smtform/index'
        });
    },
    smttel() {
        swan.makePhoneCall({
            phoneNumber: this.data.result.tel
        });
    },
});