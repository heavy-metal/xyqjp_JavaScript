
let ajaxTimes = 0;
var app = getApp()
export const request = (URL,params) => {
  return new Promise((resolve,reject)=>{
    ajaxTimes++;
    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration: 10000,
    });
    //提取公共部分的url，优化
    // const baseUrl = "http://125.89.196.8:2059/MobileHttp.aspx?Cmd=";
    var baseUrl = app.globalData.baseUrl
    wx.request({
      
      ...URL,
      url: baseUrl+URL.url,
      method: 'GET',
      data: dealParams(params),
      success:(result)=>{
        
        if (result.data.Code === '1') {
          resolve(result);
        }else{
          wx.showModal({
            title: '错误提示',
            content: result.data.Message,
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#000000',
          });
    
        }
      },
      fail: (err)=>{
        console.log(err)
        reject(err);
        
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes===0){
          wx.hideToast();
        }
      }
    });
   
    
  })
 
};

function dealParams(params) {
  console.log("请求参数:", params)
  return params;
};



export const PostRequest = (URL,params) => {
  return new Promise((resolve,reject)=>{
    ajaxTimes++;
    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration: 10000,
    });
    //提取公共部分的url，优化
    const baseUrl = "http://125.89.196.8:2059/MobileHttp.aspx?Cmd=";
    wx.request({
      
      ...URL,
      url: baseUrl+URL.url,
      method: 'POST',
      data: dealParams(params),
      success:(result)=>{
        if (result.data.Code === 1) {
          resolve(result);
        }else{
          wx.showToast({
            title: result.data.Message,
          });
        }
      },
      fail: (err)=>{
        reject(err);
        
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes===0){
          wx.hideToast();
        }
      }
    })
  });
}