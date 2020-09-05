// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    isLogin:false, //是否登录(默认false未登录)
    storyArr:[],//登录用户足迹
    slideButtons: [
      {
      type:'warn',
      text: '查看'
      },
      {
        text: '删除',
      }
    ],
    // 提示框
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{text: '取消'}, {text: '确定'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("onLoad")
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
    let that=this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']){
          // 获取用户信息
          wx.getUserInfo({
            success: function(res) {
              var userInfo = res.userInfo
              // console.log(userInfo,this,that);
              that.setData({
                userInfo,
                isLogin:true
              });
            }
          });
          this.setData({
            storyArr:wx.getStorageSync('storyArr')
          })
        }else{
          that.setData({
            isLogin:false
          });
        }
      },
      fail:(error)=>{
        console.log("error",error);
      }
    })
  },
  toLogin:function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
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

  },

  /**
   * 跳转故事详情
   * @param {*} e 
   */
  slideButtonTap:function(e){
    let {id,title}=e.target.dataset;
    switch(e.detail.index){
      case 0:
         wx.navigateTo({
            url: `/pages/detail/detail?id=${id}&title=${title}`,
         });
        break;
      case 1:
        this.setData({
          dialogShow: true
        })
        break;  
    }
  },
  /**
   * 关闭提示框
   * @param {*} e 
   */
  tapDialogButton(e) {
    if(e.detail.index==1){
      let result=wx.getStorageSync('storyArr').filter((item,index)=>{
        return item.id!=e.target.dataset.id
      });
      wx.setStorageSync('storyArr',result);
      this.setData({
        storyArr:result
      });
    }
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    });
  },
})