// pages/login/coachLogin/checkStudentDetail/index.js

import {request} from "../../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArray : ["姓名","所属驾校","统一编号","证件号","手机","注册日期","培训车型","培训状态","第一部分","第二部分","第三部分","第四部分","上次登录时间"],
    infoArray:[],
    studytimeArray:['科目一','科目二','科目三','科目四'],
    listArray:[],
    subTabsShow:false,
    model:{},//学习进度的数据
    arr:[],//学习进度数据组
    gradientColor: {
      '0%': '#CCFBFF',//9FA5D5 //CCFBFF
      '100%': '#EF96C5',//E8F5C8 //EF96C5
    },
  },
  totalPage:0,

  params:{
    UserId:'',
    PageSize:10,
    CurrentPage:1,
    StuId:'',
    Subject:1
  },
  studentModel:{},
  firstComeStudytime:true,
  tapsIndex:0,//切换标题的下标
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var studentModel = JSON.parse(options.model)
    this.getbaseMessageData(studentModel)
    this.studentModel = studentModel
  },
  
  getbaseMessageData(studentModel){
    var loginModel = wx.getStorageSync('loginModel');
    request({url:'GetStudentInfo'},{UserId:loginModel.UserId,StuId:studentModel.StuId})
    .then(result=>{
      var model = result.data.Data
      this.setData({
        infoArray:[model.Name,model.SchoolName,model.StuNum,model.IdCard,model.Mobile,model.ApplyDate,model.TrainType,model.StudyState,model.State1,model.State2,model.State3,model.State4,model.LastTime]
      })
    })
  },
  getdata(){
    var model = wx.getStorageSync('loginModel');
    this.params.UserId = model.UserId
    this.params.StuId = this.studentModel.StuId
    request({url:'GetStudyList'},this.params)
    .then(result=>{
      this.setData({
        listArray:[...this.data.listArray,...result.data.Data],
      })
      this.totalPage=result.data.Page.TotalPage
      wx.stopPullDownRefresh();
    })
  },

  tapsChangeClick(e){//科目一标题切换
    this.setData({listArray:[]})
    this.params.Subject=e.detail.index+1
    this.getdata()
  },

  // 滚动条触底 上拉加载更多页
  onReachBottom() { 
    if(this.tapsIndex!=1){return}
    if(this.params.CurrentPage>=this.params.PageSize){
      wx.showToast({
        title: '\n没有更多了\n',
        icon: 'none',
        duration: 1500,
      });
    }else{
      this.params.CurrentPage++;
      this.getdata();
    }
  },
  //下拉刷新
  onPullDownRefresh(){
    if(this.tapsIndex!=1){
      wx.stopPullDownRefresh();
      return
    }
      this.setData({listArray:[]})
      this.params.CurrentPage = 1;
      this.getdata()
  },

  tabsChange(e){
    const index = e.detail.index
    this.tapsIndex = index
    this.setData({
      subTabsShow:index===1?true:false
    })
    if (index===1&&this.firstComeStudytime===true){
      this.firstComeStudytime=false
      this.getdata()
    }
    if(index===2&&this.data.arr.length===0){
      this.getProgressData()
    }
  },


  getProgressData(){
    var loginModel = wx.getStorageSync('loginModel');
    request({url:'GetStudyState'},{UserId:loginModel.UserId,StuId:this.studentModel.StuId})
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
