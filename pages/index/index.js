//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    slider:[],
    classfly:[],
    floor:[],
    showTop:false,
    interval: 2000,
    duration: 1000
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 获取事件请求轮播图方法
  // 1.0 封装请求轮播图的方法
  getSliderData() {
    // wx.request 请求方法
    wx.request({
      // url 请求地址
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      // success 请求成功执行的回调函数
      success: res => {
        // 输出 res 返回值查看结构
        // console.log(res);
        // 数据解构 message
        const {
          message
        } = res.data;
        // 把 message 数据更新到页面 data 中
        this.setData({
          slider: message
        });
      }
    });
  },
// 请求分页菜单数据
getClassflyData(){
  wx.request({
    url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
    success:(res)=>{
      // console.log(res.data)
      this.setData({
        classfly:res.data.message
      })
    }
  })
},
// 获取首页楼层数据
  getFloorData(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success:(res)=>{
        console.log(res.data)
        this.setData({
          floor:res.data.message
        })
      }
    })
  },
  goTop(event){
    console.log(event)
    const {top} = event.currentTarget.dataset
    // 调用滚动页面的效果
    wx.pageScrollTo({
      scrollTop: top,
      duration: 300
    })
  },
  onPageScroll(event){
    // console.log(event)
    const scrollTop = event.scrollTop
    if (scrollTop>200){
      this.setData({
        showTop:true
      })
    }else{
      this.setData({
        showTop: false
      })
    }
  },
  onLoad: function () {
    this.getSliderData();
    this.getClassflyData();
    this.getFloorData();
  },
  
})
