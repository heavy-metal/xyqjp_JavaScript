// pages/login/usersmessage/index.js
import {request} from "../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArray:[],
    infoArray:[],
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var model = wx.getStorageSync('loginModel');
    
    this.getbaseMessageData(model)
  },

  onShow: function () {
    console.log(this.data.infoArray)
  },

  getbaseMessageData(loginModel){
    var url = ''
    var params = {}
    
    if(loginModel.LoginType==='学员'){
      url = 'GetStudentInfo'
      params.UserId = loginModel.UserId
      params.StuId = loginModel.UserId
    }else if(loginModel.LoginType==='教练'){
      url = 'GetCoachInfo'
      params.CoachId = loginModel.UserId
    }else{
      url = 'GetInsInfo'
      params.InsId = loginModel.InsId
    }
    
    request({url:url},params)
    .then(result=>{
      var model = result.data.Data
      console.log(result)
      var titleArray = []
      var infoArray = []
      if(loginModel.LoginType==='学员'){
        titleArray = ["姓名","所属驾校","统一编号","证件号","手机","注册日期","培训车型","培训状态","第一部分","第二部分","第三部分","第四部分","上次登录时间"]
        infoArray = [model.Name,model.SchoolName,model.StuNum,model.IdCard,model.Mobile,model.ApplyDate,model.TrainType,model.StudyState,model.State1,model.State2,model.State3,model.State4,model.LastTime]
      }else if(loginModel.LoginType==='教练'){
        titleArray = ["姓名","所属驾校","统一编号","证件号","手机","准考车型","教练星级","车牌号","上次登录时间"] 
        infoArray = [model.Name,model.SchoolName,model.CoachNum,model.IdCard,model.Mobile,model.TeachPermitted,model.StarLevel,model.LicNum,model.LastTime]
      }else{
        titleArray = ["驾校名称","统一编号","分类等级","经营范围","行政区划","车辆数量","报名电话","地址"]
        infoArray = [model.ShortName,model.InsCode,model.Level,model.BusiScope,model.District,String(model.TracarNum) ,model.RegTel,model.Address]
      }
      this.setData({
        titleArray,
        infoArray,
      })
    })
  },
})