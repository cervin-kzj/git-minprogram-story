/**
 * wx.request 请求接口列表
 * es6引入./http
 * commonJs引入config.js
 * es6抛出接口
 */

import {request} from "./http"
let {appid,sign}=require("./config.js");

/**
 * 获取故事分类列表
 */
export const requestGetType=()=>{
  let option={
    url:"1700-1",
    method:"get",
    header:{
      'content-type': 'application/json'
    },
    data:{
      "showapi_appid": appid,
      "showapi_sign": sign,
    }
  }
  return request(option);
};

/**
 * 获取故事列表
 * @param {*} data 
 */
export const requestPostList = (data = {}) => {
  Object.assign(data,{
      showapi_appid: appid,
      showapi_sign: sign,
      classifyId:data.classifyId,
      page:data.page
  })
  let option = {
    url: "1700-2",
    method: "post",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data 
  }
  return request(option);
};

/**
 * 获取故事详情
 * @param {*} data 
 */
export const requestGetDetail = (data = {}) => {
  let option={
    url: "1700-3",
    method: "get",
    header:{
      'content-type': 'application/json'
    },
    data:{
      "showapi_appid": appid,
      "showapi_sign": sign,
      ...data
    }
  }
  return request(option);
}