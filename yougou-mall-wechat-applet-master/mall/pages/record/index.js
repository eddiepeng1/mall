Page({
  data: {
    record: ''
  },
  bindInput: function(e) {
    this.setData({
      record: e.detail.value
    });
  },
  uploadRecord: function() {
    if (this.data.record) {
      // 模拟上传记录
      wx.showToast({
        title: '记录上传成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '请输入记录',
        icon: 'none'
      });
    }
  }
});