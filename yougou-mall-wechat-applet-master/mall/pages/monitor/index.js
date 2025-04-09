Page({
  data: {
    data: {
      temperature: 25,
      humidity: 60
    }
  },
  onLoad: function() {
    // 模拟实时数据监控
    const that = this;
    setInterval(function() {
      that.setData({
        data: {
          temperature: (Math.random() * 10 + 20).toFixed(1),
          humidity: (Math.random() * 20 + 50).toFixed(1)
        }
      });
    }, 2000);
  }
});