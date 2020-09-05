// pages/type/type.js

import {requestGetType} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storylist:[]
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
    try {
      var value = wx.getStorageSync('storylist');
      if (value) {
        this.setData({
          storylist:value
        })
      }
      else{
        this.getType();
      }
    } catch (e) {
      console.log(new Error(e));
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

  },

  /**
   * 获取故事分类
   */
  // getType(){
  //   try{
  //     requestGetType().then((resolve)=>{
  //       console.log(resolve.data.showapi_res_body.storylist);
  //     },(reject)=>{
  //       console.log(reject);
  //     });
  //   }catch(error){
  //     console.log(new Error(error));
  //   }
  // }

  /**
   * 获取故事分类
   */
  async getType(){
    try{
      let arrList=await requestGetType();
      wx.setStorageSync('storylist', arrList.data.showapi_res_body.storylist);
      this.setData({
        storylist:arrList.data.showapi_res_body.storylist
      });
    }catch(error){
      console.log(new Error(error));
    }
  },
  /**
   * 跳向故事列表页
   * @param {*} e 
   */
  toList(e){
    let {classify,classifyid}=e.target.dataset;
    wx.navigateTo({
      url: `/pages/list/list?classify=${classify}&classifyid=${classifyid}`,
    })
  }
})