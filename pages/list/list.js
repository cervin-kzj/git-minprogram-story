// pages/list/list.js
import { requestPostList } from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyid:"",
    contentlist:[],
    page:1,
    isLogin:true,
    userInfo:null,
    slideButtons: [{
      type:'warn',
      text: '查看'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    // console.log("onLoad",e);
    wx.setNavigationBarTitle({
      title: e.classify,
    });
    this.setData({
      classifyid:e.classifyid
    });
    try{
      this.getList();
    }
    catch(error){
      console.log(new Error(error));
    }

    let that=this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']){
          // 获取用户信息
          wx.getUserInfo({
            success: function(res) {
              var userInfo = res.userInfo
              that.setData({
                userInfo,
                isLogin:true
              });
            }
          });
        }else{
          that.setData({
            isLogin:false
          });
        }
      },
      fail:(error)=>{
        console.log(new Error(error));
      }
    })
  },
  /**
   * 获取故事列表
   */
  getList:async function(){
    wx.showLoading({
      title: '数据加载中',
    })
    try{
      let obj={
        classifyId:this.data.classifyid,
        page:this.data.page
      }
      let arrList=await requestPostList(obj);
      if(arrList.data.showapi_res_body.contentlist.length>0){
        wx.hideLoading({});
      }
      let newArrList=[...this.data.contentlist,...arrList.data.showapi_res_body.contentlist];
      this.setData({
        contentlist:newArrList
      });
    }
    catch(error){
      console.log(new Error(error));
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
  onShow: function (e) {
    // console.log("onShow");
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
    this.data.page++;
    this.getList();
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
  todetail:function(e){
    let {id,title}=e.target.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&title=${title}`,
    })
  }
})