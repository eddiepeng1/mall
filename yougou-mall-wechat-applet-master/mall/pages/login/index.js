// pages/login/index.js
Page({

    // bindGetUserInfo(e){
    //     // console.log(e);
    //     const {userInfo}=e.detail;
    //     wx.setStorageSync("userinfo", userInfo);
    //     wx.navigateBack({
    //         delta: 1
    //     });
    // },

    // 登录 获取个人信息
    getUserProfile(e){
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                const {userInfo}=res;
                console.log(userInfo)
                // 设置到缓存中
                wx.setStorageSync("userinfo", userInfo);
                // 返回上一页
                wx.navigateBack({
                    delta: 1
                });
                // 重新加载页面
                // this.onShow();
            }
          })
    }
})