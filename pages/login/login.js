// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']){
          //已经授权 可以获取userInfo
          wx.navigateBack({
            delta:1
          })
        }
      },
      fail:(error)=>{
        console.log(new Error(error));
      }
    })
  },
  login:function(e){
    if(e.detail.errorMsg=="getUserInfo:fail auth deny"){
      // 取消授权
      return;
    }else{
      // 同意授权
      wx.navigateBack({
        delta:1
      });
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})