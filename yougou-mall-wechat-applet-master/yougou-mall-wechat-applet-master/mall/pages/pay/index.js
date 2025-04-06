

/*
1 页面加载的时候
  1 从缓存中获取购物车数据 渲染到页面上
    这些数据checked=true
2 微信支付
  1 那些人 那些账号可以实现微信支付
    1 企业账号
    2 企业账号的小程序后台中 必须给开发者 添加上白名单
      1 一个appid 可以同时绑定多个开发者
      2 这些开发者可以公用这个appid 和他的开发权限
3 支付按钮
  1 先判断缓存中有没有token
  2 没有 跳转到授权页面 获取token
  3 有token
  
*/


// pages/cart/index.js
Page({

    data:{
        address:{},
        cart:[],
        totalPrice:0,
        totalNum:0
    },

    onShow(){
        // 1 获取缓存中的收货地址信息
        let address=wx.getStorageSync("address")
        // address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo
        // 1 获取缓存中的购物车数据   当cart不存在默认赋值为空数组
        let cart=wx.getStorageSync("cart")||[]
        // 过滤后的购物车数组
        cart=cart.filter(v=>v.checked);
        // this.setData({address});
        // 总价格 总数量
        let totalPrice=0;
        let totalNum=0;
        // 对cart中的每一条数据进行判断是否选中 计算选中数据的数量以及总价格
        // 因为forEach函数  对于空数组的判断也是true 所以需要判断数组是否为空
        cart.forEach(v=>{
                totalPrice+=v.num*v.data.message.goods_price;
                totalNum+=v.num;
        })
        // 2 给data赋值
        this.setData({
            cart,
            totalPrice,
            totalNum,
            address
        })
    },

    // 点击支付
    handleOrderPay(){
      // 1 判断缓存中有没有token
      const token=wx.getStorageSync("token")
      // 2 判断
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/index',
        });
        return
      }
      console.log("已存在token")
    }
})