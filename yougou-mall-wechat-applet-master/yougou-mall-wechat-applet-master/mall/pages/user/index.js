// pages/user/index.js
Page({

    data:{
        userinfo:{},
        // 被收藏的商品数量
        collectNums:0
    },
    // onLoad(options){
    //     // console.log(options)
    //     let _options=options;
    //     console.log(_options)
    // },
    onShow(){
        const userinfo=wx.getStorageSync("userinfo");
        const collect=wx.getStorageSync("collect")||[];
        this.setData({
            userinfo,
            collectNums:collect.length
        })
    },

    logout: function() {
      // 清除登录状态并跳转到个人中心
      wx.clearStorageSync(); // 清除本地存储的用户信息
      wx.reLaunch({
        url: '/pages/user/index' // 跳转到个人中心
      });
    },

    // 登录 获取个人信息
    // getUserProfile(e){
    //     wx.getUserProfile({
    //         desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //         success: (res) => {
    //             const {userInfo}=res;
    //             console.log(userInfo)
    //             // 设置到缓存中
    //             wx.setStorageSync("userinfo", userInfo);
    //             // 重新返回当前页
    //             wx.navigateBack({
    //                 delta: 0
    //             });
    //             // 重新跳到个人中心 刷新页面
    //             // this.onLoad(_options);
    //             // onReady();
    //         }
    //       })
    // }

})