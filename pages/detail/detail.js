// pages/detail/detail.js
import { requestGetDetail } from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    detailObj:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    });
    this.setData({
      id:options.id
    });
    if(wx.getStorageSync(`detailObj`).cacheId==options.id){
      this.setData({
        detailObj:wx.getStorageSync(`detailObj`)
      })
    }else{
      this.getDetail();
    }
  },
  
  /**
   * 获取故事详情
   */
  getDetail:async function(){
    try{
      wx.showLoading({
        title: '数据加载中',
      }) 
      let Obj=await requestGetDetail({id:this.data.id});
      if(Obj.errMsg=="request:ok"){
        wx.hideLoading({});
        this.setData({
          detailObj:Obj.data.showapi_res_body
        });
        Object.assign(Obj.data.showapi_res_body,{cacheId:this.data.id});
        wx.setStorageSync(`detailObj`, Obj.data.showapi_res_body);

        // 判读是否登录 是(记录足迹)
        wx.getSetting({
          success: res => {
            if(res.authSetting['scope.userInfo']){
              // 是(记录足迹)
              let story={
                id:Obj.data.showapi_res_body.id,
                title:Obj.data.showapi_res_body.title
              };
              if(wx.getStorageSync('storyArr')){
                let arr=wx.getStorageSync('storyArr');
                let result=arr.findIndex((item,index)=>{
                  return item.id==story.id
                });
                if(result==-1){
                  arr.unshift(story);
                  wx.setStorageSync('storyArr', arr);
                }
              }else{
                let arr=[];
                arr.push(story);
                wx.setStorageSync('storyArr', arr);
              }
            }
          },
          fail:(error)=>{
            // console.log(new Error(error));
          }
        })
      }
    }catch(e){
      console.log(new Error(e));
    }
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