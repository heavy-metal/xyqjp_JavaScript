// pages/login/coachLogin/TeachinStatistics/index.js
const app = getApp();
var util = require('../../../../utils/util.js');
import {request} from "../../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArray:[],
    title: '教学统计',
    statusBarHeight:0,
    titleText:'',
    currentDate: new Date().getTime(),
    minDate: new Date(2010, 10, 1).getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    show:false
  },
  params:{
    UserId:'',
    CoachId:'',
    StudyDate:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var time = util.formatTime(new Date());

    this.setData({
      statusBarHeight:app.globalData.statusBarHeight,
      titleText:time
    })
    this.getdata()
  },
  backClick(){
    wx.navigateBack({
      delta: 1
    });
  },
  choosetimeTap(){
    this.setData({show:true})
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
      
    });
  },
  
  confirm(e){
    var time = util.formatTime(new Date(e.detail))
    this.setData({ 
      show: false ,
      titleText: time
    });
    this.getdata()
  },
  onClose(){
    this.setData({ show: false });
  },
  cancel(){
    this.setData({ show: false });
  },


  getdata(){
    var model = wx.getStorageSync('loginModel');
    this.params.UserId = model.UserId
    this.params.CoachId = model.UserId
    this.params.StudyDate = this.data.titleText
    request({url:'CoachDayStudySum'},this.params)
    .then(result=>{
      this.setData({
        listArray: result.data.Data
      })
    })
  },

})