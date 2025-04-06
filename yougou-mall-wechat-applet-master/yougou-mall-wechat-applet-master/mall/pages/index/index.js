// 引入用来发送请求的方法 一定要把路径补全
import {request} from "../../request/index.js"

//Page Object
Page({
  data: {
    // 轮播图数组
    swiperList:[],
    // 导航栏数组
    catesList:[],
    // 楼层数据
    floorList:[]
  },
  //options(Object)
  // 页面开始加载的时候就会触发
  onLoad: function(options){
    // 发送异步请求获取轮播图数据
    // 通过es6 promise语法来优化
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message 
    //     })
    //   }
    // });
    
    // 调用轮播图方法
    this.getSwiperList();
    this.getCatesList();
    this.getfloorList();
    
  
  },

  //获取轮播图数据方法
  getSwiperList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    .then(result => {
      this.setData({
          swiperList:result.data.message 
          })
    })
  },
  // 获取分类导航栏数据方法
  getCatesList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then(result => {
      this.setData({
          catesList:result.data.message 
          })
    })
  },
  // 获取楼层数据方法
  getfloorList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"})
    .then(result => {

      let res=result.data.message
      res.forEach(v=>v.product_list.forEach(v=>v.navigator_url=v.navigator_url.replace("?","/index?")))
      console.log(res);

      this.setData({
          floorList:res
          })
    })
  }
});