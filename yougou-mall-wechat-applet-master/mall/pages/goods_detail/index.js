
/*
    1.发送请求获取数据
    2.点击轮播图 预览大图
        1.给轮播图绑定点击事件
        2.调用小程序api previewImage
    3. 点击加入购物车
        1 先绑定点击事件
        2 获取缓存中的购物车数据 数组格式
        3 先判断 当前商品是否存在与购物车
        4 如果存在 修改商品数据 执行购物车数量++ 重新把购物车数组 填充回缓存中
        5 不存在与购物车的数组中 直接给购物车数组添加一份新元素 新元素带上 购买属性num 重新把购物车数组 填充回缓存中
        6 弹出提示  
    4. 商品收藏
        1 页面onShow的时候 加载缓存中的商品收藏数据
        2 判断当前商品是不是被收藏
            1 是 改变商品收藏图标
            2 不是
        3 点击商品收藏按钮
            1 判断该商品是否存在于缓存数组中
            2  已经存在 把该商品删除
            3 不存在 把商品添加到收藏数组中 重新存入缓存
*/

// 引入用来发送请求的方法 一定要把路径补全
import {request} from "../../request/index.js"

// pages/goods_detail/index.js
Page({

   
    data: {
        goodsObj:{},
        // 商品是否被收藏
        isCollect:false
    },

    // 商品对象
    GoodsInfo:{},

    onShow: function () {
        
        // onShow本身是无法获取options的  借助页面栈实现
        let pages = getCurrentPages();
        let currentPage = pages[pages.length-1];
        let options = currentPage.options;

        const {goods_id} = options;

        // console.log(goods_id);
        this.getGoodsDetail(goods_id);

        
    },
 
    // 获取商品详情数据
    getGoodsDetail(goods_id){
        request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail", data:{goods_id}})
        .then(res=>{
            this.GoodsInfo=res;
            console.log(this.GoodsInfo);
            // 1 获取缓存中的商品收藏数组
            let collect=wx.getStorageSync("collect")||[];
            // 2 判断当前商品是否被收藏 some是有一个为true 则返回值为true
            let isCollect=collect.some(v=>v.data.message.goods_id===this.GoodsInfo.data.message.goods_id)
            // console.log(res);
            this.setData({
                goodsObj:res,
                isCollect
            })
        })
    },

    // 点击轮播图 放大预览
    handlePreviewImage(e){
        // console.log("预览")
        // 1 构造要预览的图片数组
        const urls = this.GoodsInfo.data.message.pics.map(v=>v.pics_mid);
        // 2 要接收传递过来的图片url
        const current = e.currentTarget.dataset.url
        wx.previewImage({
            current,
            urls
        });
    },

    //点击加入购物车
    handleCartAdd(){
        // 1 获取缓存中的购物车数组
        let cart=wx.getStorageSync("cart")||[];
        console.log(cart);
        // 2 判断商品对象是否存于购物车数组中
        let index=cart.findIndex(v=>v.data.message.goods_id===this.GoodsInfo.data.message.goods_id);
        if(index===-1){
            // 不存在 第一次添加
            this.GoodsInfo.num=1;
            // 给购物车页面中的全选加上值
            this.GoodsInfo.checked=true;
            // 给购物车数据item赋值goods_id方便购物车页面复选框取值索引
            this.GoodsInfo.goods_id=this.GoodsInfo.data.message.goods_id;
            cart.push(this.GoodsInfo);
        }else{
            // 已经存在购物车的数据 执行num++
            cart[index].num++;
        }
        // 5 把购物车重新添加到缓存中
        wx.setStorageSync("cart",cart)
        // 6 弹窗提示
        wx.showToast({
            title: '加入购物车成功',
            icon: 'success',
            mask: true
        });
    },

    // 点击商品收藏图标变化
    handleCollect(){
        let isCollect=false;
        // 1 获取缓存中的商品收藏数组
        let collect=wx.getStorageSync("collect")||[];
        // 2 判断该商品是否被收藏过
        // findIndex 找不到匹配条件下的数据 则会返回-1
        console.log(this.GoodsInfo.data.message.goods_id);
        let index=collect.findIndex(v=>v.data.message.goods_id===this.GoodsInfo.data.message.goods_id)
        console.log(index);
        // 3 当index ！=-1 表示 已经收藏过了  那么取消收藏
        if(index!==-1){
            // 已经收藏过了
            collect.splice(index,1);
            isCollect=false;
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                mask:true
            });
        }else{
            // 没有收藏
            collect.push(this.GoodsInfo);
            isCollect=true;
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                mask:true
            });
        }

        // 4 把数组存入到缓存中
        wx.setStorageSync("collect", collect);
        // 5 修改data中的属性 isCollect
        this.setData({
            isCollect
        })
    }


})