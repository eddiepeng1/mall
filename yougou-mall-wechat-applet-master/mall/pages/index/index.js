import { request } from "../../request/index.js";

Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },

  // 添加跳转函数
  navigateToTask() {
    wx.switchTab({
      url: "/pages/task/index"
    });
  },
  navigateToRecord() {
    wx.switchTab({
      url: "/pages/record/index"
    });
  },
  navigateToMonitor() {
    wx.switchTab({
      url: "/pages/monitor/index"
    });
  }
});