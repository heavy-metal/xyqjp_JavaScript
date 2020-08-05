// pages/login/studentLogin/studyProgress/index.js

import {request} from "../../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArray:['第一部分','第二部分','第三部分','第四部分'],
    arrl:[],
    model:{},
    gradientColor: {
      '0%': '#CCFBFF',//9FA5D5 //CCFBFF
      '100%': '#EF96C5',//E8F5C8 //EF96C5
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
  },
  getdata(){
    var model = wx.getStorageSync('loginModel');
    request({url:'GetStudyState'},{UserId:model.UserId,StuId:model.UserId})
    .then(result=>{
      var model = result.data.Data
      var arr = []
      arr = [
        {title:'第一部分',
         state:model.State1,
         data:[
           {didstudy:'已学:'+String(model.T_Times1)+'/'+String(model.P_Times1),progress:(model.T_Times1/model.P_Times1).toFixed(1)*100},
           {didstudy:'面授'+String(model.H_Times1)+'/'+String(model.P_Theory1),progress:(model.H_Times1/model.P_Theory1).toFixed(1)*100},
           {didstudy:'通过'+String(model.C_Times1)+'/'+String(model.P_Times1),progress:(model.C_Times1/model.P_Times1).toFixed(1)*100}
         ]  
        },
        {title:'第二部分',
         state:model.State2+',里程'+model.Miles2,
         data:[
           {didstudy:'已学:'+String(model.T_Times2)+'/'+String(model.P_Times2),progress:(model.T_Times2/model.P_Times2).toFixed(1)*100},
           {didstudy:'模拟'+String(model.S_Times2),progress:model.S_Times2},
           {didstudy:'通过'+String(model.C_Times2)+'/'+String(model.P_Times2),progress:(model.C_Times2/model.P_Times2).toFixed(1)*100}
         ]  
        },
        {title:'第三部分',
         state:model.State3+',里程'+model.Miles3,
         data:[
           {didstudy:'已学:'+String(model.T_Times3)+'/'+String(model.P_Times3),progress:(model.T_Times3/model.P_Times3).toFixed(1)*100},
           {didstudy:'模拟'+String(model.S_Times3),progress:model.S_Times2},
           {didstudy:'通过'+String(model.C_Times3)+'/'+String(model.P_Times3),progress:(model.C_Times3/model.P_Times3).toFixed(1)*100}
         ]  
        },
        {title:'第四部分',
         state:model.State4,
         data:[
           {didstudy:'已学:'+String(model.T_Times4)+'/'+String(model.P_Times4),progress:(model.T_Times4/model.P_Times4).toFixed(1)*100},
           {didstudy:'面授'+String(model.H_Times4)+'/'+String(model.P_Theory4),progress:(model.H_Times4/model.P_Theory4).toFixed(1)*100},
           {didstudy:'通过'+String(model.C_Times4)+'/'+String(model.P_Times4),progress:(model.C_Times4/model.P_Times4).toFixed(1)*100}
         ]  
        }
      ]
      this.setData({
        arr,
        model
      })
      
      
    })
  },
})