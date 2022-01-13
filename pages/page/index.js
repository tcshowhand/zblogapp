// 详情页
const app = getApp();
import { getArticleInfo } from '../../utils/request.js';

Page({
    data: {
        id: '',
        result: {},
        RelatedList: [],
        abstract: '',
        followData: [{ type: 'primary' }],
        disabled: true,
        commentParam: {
            snid: '0',
            path: 'pages/home/index',
            title: '豫唐百度小程序',
            content: '豫唐百度小程序',
            images: []
        },
        detailPath: '',
        toolbarConfig: {
            moduleList: ['comment', 'favor', 'share'],
            share: {
                title: '豫唐百度小程序',
                path: '/pages/home/index'
            }
        }
    },

    onLoad: function (options) {
        this.data.id = options.id;
        this.getArticleInfo();
    },

    getArticleInfo() {
        getArticleInfo({
            id: this.data.id,
        }).then(res => {
            const post = res.data.post;
            post.Content = post.Content.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/<section/g, '<div').replace(/\/section>/g, '\div>').replace(/&nbsp;/g, ' ').replace(/pre class="prism-highlight/g, 'pre style="white-space: pre-wrap!important;background-color: #eee;padding: 5px 10px;margin: 1em 0;" class="prism-highlight').replace(/<img/gi, '<img class="rich-img" style="max-width:100%!important;display:block" ')
            .replace(/<h2([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<h2')
            .replace(/<h2([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<h2')
            .replace(/<h2>/ig, '<h2 style="border-bottom: 1px solid #dfe2ef;padding: 0 0 1rem;font-size: 20px;">');
            this.setData({
                data: post
            });
        });
    },

    onShow: function () {
        getArticleInfo({
            id: this.data.id,
        }).then(res => {
            swan.setNavigationBarTitle({ title: "文章详情页" });
            swan.setPageInfo({
                title: res.data.post.Title,
                keywords: res.data.post.TagsNames,
                description: res.data.post.Intro,
                articleTitle: res.data.post.Title,
                releaseDate: res.data.post.UpdateTime,
                image: []
            })
        })
    },

    detailsBtn(e) {
        let id = e.currentTarget.dataset.id;
        swan.navigateTo({
            url: '/pages/article/index?id=' + id
        });
    },

    onReady: function () {
        requireDynamicLib('myDynamicLib').listenEvent();
    },

    clickComment(e) {
        swan.showToast({
            title: this.data.result.Title
        });
    },

    favorstatuschange(e) {
        if (e.detail && e.detail.isFavor === true) {
            this.setData({ 'disabled': false });
        }
    },
    statuschange(e) {
    }
});