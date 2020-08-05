// pages/login/coachLogin/searchOrder/index.js
const app = getApp();
var util = require('../../../../utils/util.js');
import {request} from "../../../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderArray:['关闭','取消','正常'],
    payStatesArray:['退款','未支付','已支付'],
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
    TrainDate:'',
    PageSize:10,
    CurrentPage:1
  },
  totalPage:0,
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
    this.params.TrainDate = this.data.titleText
    request({url:'SearchOrder'},this.params)
    .then(result=>{
      this.setData({
        listArray:[...this.data.listArray,...result.data.Data]
      })
      this.totalPage=result.data.Page.TotalPage
      wx.stopPullDownRefresh();
    })
  },
  

  // 滚动条触底 上拉加载更多页
  onReachBottom() {
    if(this.params.CurrentPage>=this.totalPage){
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
    this.setData({listArray:[]})
    this.params.CurrentPage = 1;
    this.getdata()
   
  },
  //订单详情
  orderDetailClick(e){
    const {index} = e.currentTarget.dataset
    var model = this.data.listArray[index]
    wx.navigateTo({
      url: '/pages/login/coachLogin/searchOrderDetail/index?model='+JSON.stringify(model)
    });
  },

})