
/**
1 点击 "+" 触发tap点击事件
    1 调用小程序内置选择图片的API
    2 获取图片路径  数组格式 多张图片
    3 把图片路径 存到data变量中
    4 根据图片数组 进行循环显示
2 点击 自定义图片 组件
    1 获取被点击元素的索引
    2 获取data中的数组元素
    3 根据索引 删除数组中的对应元素
    4 把数组重新赋值会data中
3 点击提交
    1 获取文本域的内容
        1 data中定义变量 表示输入框内容
        2 文本域 绑定输入事件 事件触发的时候 把输入框的值赋值到变量中
    2 对这些内容进行 合法性校验
    3 验证通过 用户选择的图片 上传到专门的图片服务器 返回图片外网连接
        1 遍历图片数组
        2 挨个上传
        3 自己在维护图片数组 存放 图片上传后的外网连接
    4 文本域和图片外网链接 一起提交到服务器   前端模拟  并不会真正发送请求
    5 清空当且页面
    6 返回上一页
 */


// pages/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"体验问题",
                isActive:true
            },
            {
                id:1,
                value:"商品/商家投诉",
                isActive:false
            },
            

        ],
        // 被选中的图片路径数组
        chooseImgs:[],
        // 文本域内容
        textVal:""

    },

    // 外网的图片路径数组
    UpLoadImgs:[],

    


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

    // 点击+ 触发选择图片
    handleChooseImg(){
        // 调用小程序内置选择图片API
        wx.chooseImage({
            // 同时选中图片的数量
            count: 9,
            // 图片的来源 照相机 相册
            sizeType: ['original','compressed'],
            sourceType: ['album','camera'],
            success: (result)=>{
                // console.log(result);
                // 将图片路径赋值给data
                this.setData({
                    // chooseImgs:result.tempFilePaths
                    // 数组拼接
                    chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
                })
            }
        });
    },

    // 点击自定义图片组件
    handleRemoveImg(e){
        // 获取被点击组件的索引
        const {index}=e.currentTarget.dataset;
        // console.log(index)
        // 获取data中的图片数组
        let {chooseImgs}=this.data;
        // 删除元素
        chooseImgs.splice(index,1)
        this.setData({
            chooseImgs
        })
    },

    // 文本域的输入事件
    handleTextInput(e){
        this.setData({
            textVal:e.detail.value
        })
    },

    // 提交按钮点击事件
    handleForm(){
        // 1 获取文本域内容
        const {textVal,chooseImgs} = this.data;
        // 2 合法性验证
        if(!textVal.trim()){
            // 不合法
            wx.showToast({
                title: '输入不合法',
                icon: 'none',
                mask: true
            });
            return;
        }
        // 3 准备上传图片到专门的服务器
        // 上传文件的api 不支持多个文件同时上传 遍历数组 挨个上传

        // 显示正在等待图片弹窗
        wx.showLoading({
            title: "正在上传中",
            mask: true
        });

        // 判断有没有需要上传的图片数组

        if(chooseImgs.length != 0){
            chooseImgs.forEach((v,i)=>{
            wx.uploadFile({
                // 图片要上传到哪里
                url: '',
                // 被上传的图片路径
                filePath: v ,
                // 上传的图片名称 后台来获取文件 file
                name: "file" ,
                // 顺带的文本信息
                formData: {},
                success: (result)=>{
                    console.log(result);
                    let url=JSON.parse(result.data).url;
                    this.UpLoadImgs.push(url);

                    // 所有的图片都上传完毕才触发
                    if(i===chooseImgs.length-1){
                        // 关闭loading
                        wx.hideLoading();
                        console.log("把文本内容和外网数组提交到后台中")
                        // 提交都成功了
                        // 重置页面
                        this.setData({
                            textVal:"",
                            chooseImgs:[]
                        })

                        // 返回上一个页面
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                },
                fail: ()=>{},
                complete: ()=>{}
            });
        })
        }else{
            console.log("只是提交了文本")
            wx.navigateBack({
                delta: 1
            });
        }

        


    }

})