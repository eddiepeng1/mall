/**
1 页面被打开的时候  onShow
    0 onShow 不同于onload 无法在形参上接收options参数
    1 获取url上的参数type
    2 根据type 去发送请求获取订单数据
    3 渲染页面
 */

// pages/order/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"全部",
                isActive:true
            },
            {
                id:1,
                value:"待付款",
                isActive:false
            },
            {
                id:2,
                value:"待发货",
                isActive:false
            },
            {
                id:3,
                value:"退货/退款",
                isActive:false
            }
        ]

    },

    onShow(options){
        // 拿不到option形参
        // console.log(options);
        // 1 获取当前小程序的页面栈-数组 长度最大是10页面
        // 2 数组中 索引最大的页面就是当前页面
        let pages = getCurrentPages();
        // console.log(pages);
        let currentPage=pages[pages.length-1];
        console.log(currentPage.options );
        
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

   
})