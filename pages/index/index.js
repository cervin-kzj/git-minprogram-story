//index.js
//获取应用实例
let bannerlist=['/static/0.jpg','/static/1.jpg','/static/2.jpg'];
Page({
  data:{
    bannerlist,
    seconds:bannerlist.length
  },
  onShow(){
  },
  bannerchange(e){
    var seconds =  this.data.seconds
    seconds--;
    if(seconds <=0){
      wx.switchTab({
        url: '/pages/type/type',
      })
      return false;
    }
    this.setData({
      seconds,
    })
  },
  /**
   * jumpAdv 直接跳转
   */
  jumpAdv(){
    wx.switchTab({
      url:"/pages/type/type"
    })
  }
})
