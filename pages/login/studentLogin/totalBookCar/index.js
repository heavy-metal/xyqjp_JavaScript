// pages/login/studentLogin/totalBookCar/index.js

import {request} from "../../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArray:['具体时间','本次消费','项目场地','可预约','教练'],
    contentArray:[]
  },
  arr:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.GetStudyGroupInfoByGroupId()
    
    this.arr = JSON.parse(options.arr)
   
  },

  GetStudyGroupInfoByGroupId(){//由培训组ID获取培训组信息（用于预约
    var model = wx.getStorageSync('loginModel');
    request({url:'GetStudyGroupInfoByGroupId'},{UserId:model.UserId,GroupId:model.GroupId})
    .then(result=>{
      this.GetStudentThisWeekYyCount(result.data.Data.WeekTimes)
    })
  },
  GetStudentThisWeekYyCount(allcount){
    var model = wx.getStorageSync('loginModel');
    request({url:'GetStudentThisWeekYyCount'},{UserId:model.UserId,StuId:model.UserId})
    .then(result=>{
      var that = this
      
      var arr = that.arr
      var money = 0
      arr.forEach(element => {
        money+=parseInt(element.Price)
      });
      var time = arr[0].SchDate + '  ' + arr[0].SchTimeBegin + ' ~ ' + arr[arr.length-1].SchTimeEnd
      var price = '共需付费' + money + '元'
      var address = arr[0].Subject + '  ' + arr[0].RegionName
      var count = '本周可预约次数为'+String(allcount - result.data.Data)
      var coachname = arr[0].CoachName
      that.setData({
        contentArray:[time,price,address,count,coachname]
      })
    })
  },
  //提交
  submitClick(){
    var model = wx.getStorageSync('loginModel');
    var arr1 = []
    this.arr.forEach(element => {
      arr1.push(element.Id)
    });
    var arrStr = arr1.join(',')//将数组转换成string并以逗号隔开
    console.log(arrStr)
    request({url:'OrderAdd'},{SeduIds:arrStr,UserId:model.UserId,CoachId:this.arr[0].CoachId,StuId:model.UserId})
    .then(result=>{
      wx.showToast({
        title: '预约成功！',
        icon: 'success',
      });
    })
      setTimeout(function () {
        wx.navigateBack({
          delta: 3
        });
      }, 1300)
  },
 
})