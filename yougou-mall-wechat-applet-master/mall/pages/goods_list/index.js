// 引入用来发送请求的方法 一定要把路径补全
import {request} from "../../request/index.js"
// pages/goods_list/index.js

/*
1. 用户上划页面 滚动条触底 开始加载下一页数据
    1 找到滚动条触底事件 微信小程序官方文档
    2 判断是否有下一页
        1 获取到总页数 总共23条数据
        总页数 = Math.ceil(总条数 / pagesize) = Math.ceil(23/10)
        2 获取当前页码  pagenum
        3 判断 当前页码是否大于等于总页数  表示没有下一页数据了

    3 如果没有下一页 弹出提示
    4 如果有下一页 加载下一页
        1. 当前页码 ++
        2. 重新发送请求 获取数据
        3，数据返回后 对data中数组进行拼接 而不是替换

2. 下拉刷新页面
    1 触发下拉刷新事件 需要在页面json文件中开启配置项
        找到触底下拉刷新监听事件
    2 重置 数据 数组
    3 重置页码 设置为1
    4 重新发送请求
    5 请求数据回来 需要手动关闭 等待刷新效果
*/


Page({
    data: {
        tabs:[
            {
                id:0,
                value:"综合",
                isActive:true
            },
            {
                id:1,
                value:"销量",
                isActive:false
            },
            {
                id:2,
                value:"价格",
                isActive:false
            }

        ],
        goodsList:[]
    },

    // 接口要的参数
    QueryParams:{
        query:"",
        cid:"",
        pagenum:1,
        pagesize:10
    },

    onLoad: function (options) {
        // console.log(options)
        this.QueryParams.cid=options.cid||"";
        this.QueryParams.query=options.query||"";
        this.getGoodsList();

        
          

    },

    // 获取总页数
    totalPages:1,

    // 获取商品列表数据
    getGoodsList(){
        request({
            url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
            data:this.QueryParams
        })
        // 请求成功后做的事
        .then(res=>{

            // 获取数据总数
            const total = res.data.message.total;
            // console.log(total);
            // 计算总页数
            this.totalPages=Math.ceil(total / this.QueryParams.pagesize)
            // console.log(this.totalPages)
            // 发送请求成功后获取goods数据
            // console.log(res.data.message.goods);
            this.setData({
                // goodsList:res.data.message.goods
                // 拼接数组
                goodsList:[...this.data.goodsList,...res.data.message.goods]
            })
            //  手动关闭下拉刷新效果
            wx.stopPullDownRefresh();

        })
    },

    // 标题点击事件 是从子组件传递过来的
    handleTabsItemChange(e){
        // 1 获取被点击标题的索引
        const {index} = e.detail
        // 2 修改原数组
        let {tabs} = this.data
        // 遍历循环tabs数组  如果索引等于被点击索引 则将该索引项添加激活效果
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
        // 3 赋值到data中
        this.setData({
            tabs
        })
    
    },

    // 页面上划 滚动条触底事件
    onReachBottom(){
        // console.log("页面触底")
        // 1 判断有没有下一页数据
        if(this.QueryParams.pagenum>=this.totalPages){
            // console.log("没有下一页数据了");
            wx.showToast({
                title: '没有更多数据',
            });
        }else{
            // console.log("存在下一页数据");
            this.QueryParams.pagenum++;
            this.getGoodsList();
        }
    },
    // 下拉刷新监听事件
    onPullDownRefresh(){
        // console.log("下拉刷新");
        // 1 重置数组
        this.setData({
            goodsList:[]
        })
        // 2 重置页码
        this.QueryParams.pagenum=1;
        // 3 发送请求
        this.getGoodsList();
    }
})