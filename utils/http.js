/**
 * 封装wx.request请求
 * commonJs引入
 * es6抛出 
 */
let requestConfigModule=require("./config.js");

export const request=(option)=>{
  let {baseUrl}=requestConfigModule;
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `${baseUrl}/${option.url}`,
      method:option.method,
      data:option.data || {},
      header:option.header || {
        'content-type': 'application/json' // 默认值
      },
      success:function(success){
        resolve(success);
      },
      fail:function(fail){
        reject(fail);
      }
    })
  });
}