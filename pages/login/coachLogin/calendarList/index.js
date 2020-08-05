// pages/login/coachLogin/calendarList/index.js
var util = require('../../../../utils/util.js');
import {request} from "../../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArray:[]
  },
  params:{
    UserId:'',
    CoachId:'',
    Year:0,
    Month:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date()
    this.params.Year = date.getFullYear()
    this.params.Month = date.getMonth() + 1
    this.getdata()
  },
  formatDate(date) {
    return util.formatTime(new Date(date))
  },

  //选择日期
  onConfirm(event){
    wx.navigateTo({
      url: '/pages/login/coachLogin/calendarDetailList/index?SchDate='+this.formatDate(event.detail)
    });
   console.log(this.formatDate(event.detail))
  },
  getdata(){
    var model = wx.getStorageSync('loginModel');
    this.params.UserId = model.UserId
    this.params.CoachId = model.UserId
    request({url:'GetCoachScheduleMonthGroup'},this.params)
    .then(result=>{
      this.setData({
        listArray:result.data.Data
      })
    })
  },
//点击底部列表
  itemTapped(e){
    const index = e.currentTarget.dataset.index
    var model = this.data.listArray[index]
    wx.navigateTo({
      url: '/pages/login/coachLogin/calendarDetailList/index?SchDate='+model.SchDate
    });
  }
})