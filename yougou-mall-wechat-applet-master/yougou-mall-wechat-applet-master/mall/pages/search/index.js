/**
 1 输入框绑定值 改变事件 input事件
    1 获取到输入框的值
    2 合法性判断
    3 检验通过 把输入框的值发送到后台
    4 返回的数据打印到页面上
2 防抖（防止抖动）定时器实现
    0 防抖 一般用在输入框中 防止重复发送请求
    1 节流 一般是用在用户上拉下拉
    1 定义全局定时器id
    
 */

// 引入用来发送请求的方法 一定要把路径补全
import {request} from "../../request/index.js"

// pages/search/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 搜索返回的数据
        goods:[],
        // 取消按钮是否隐藏
        isFocus:false,
        // 输入框的值
        inpValue:""
    },
    TimeId:-1,

    handleInput(e){
        console.log(e);
        // 1 获取输入框的值
        const value=e.detail.value;
        console.log(value);
        // 2 检测合法性
        if(!value.trim()){
            // 值不合法
            clearTimeout(this.TimeId);
            this.setData({
                goods:[],
                isFocus:false
            })
            return
        }
        // 3 准备发送请求数据
        this.setData({
            isFocus:true
        })
        clearTimeout(this.TimeId);
        this.TimeId=setTimeout(()=>{
            this.qsearch(value);
        }, 1000)
    },
    // 发送请求获取搜索数据
    qsearch(query){
        request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch", data:{query}})
        .then(res=>{
            // console.log(res);
            this.setData({
                goods:res.data.message
            })
        })
    },
    // 点击取消按钮触发事件
    handleCancel(){
        this.setData({
            inpValue:"",
            isFocus:false,
            goods:[]
        })
    }

})