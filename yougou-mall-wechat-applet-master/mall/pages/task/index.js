Page({
  data: {
    tasks: []
  },
  onLoad: function() {
    // 模拟获取任务数据
    this.setData({
      tasks: [
        { id: 1, name: '浇水', status: '未完成' },
        { id: 2, name: '施肥', status: '已完成' }
      ]
    });
  }
});