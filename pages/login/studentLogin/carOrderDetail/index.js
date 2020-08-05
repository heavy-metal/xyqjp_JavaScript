// pages/login/studentLogin/carOrderDetail/index.js

import {request} from "../../../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArray:['培训部分','培训教练','教练电话','训练场','订单金额','实付金额','订单状态','支付状态','支付时间','下单时间','培训时间','订单号'],
    infoArray:[],
    scoreTitleArray:['教学质量:','教学态度:','教学规范:','行为准则:'],
    StuPjState:0,//判断是否已评价
    scoreArray:[],
    content:''
  },
  orderArray:['关闭','取消','正常'],
  payStatesArray:['退款','未支付','已支付'],
  model:{},
  params:{
    Quality:0,
    Attitude:0,
    Standard:0,
    Honest:0,
    UserId:'',
    OrderNo:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var model = JSON.parse(options.model)
      this.model = model
      var StuPjState = model.StuPjState
      var that = this
      var str = model.BeginTime.substring(0,model.BeginTime.length-1-2)+' ~ '+model.EndTime.substring(5,model.EndTime.length-1-2)
      var infoArray = []
      infoArray = [model.Subject,model.CoachName,model.CoachMobile,model.RegionName,model.AmountYF,model.AmountSF,this.orderArray[model.OrderState+1],this.payStatesArray[model.PayState+1],model.PayDate,model.OrderDate,str,model.OrderNo]
      that.setData({
        infoArray,
        StuPjState
      })
  },
  cancelOrderClick(){
    var model = wx.getStorageSync('loginModel');
    request({url:'GetOrderByOrderNo'},{UserId:model.UserId,OrderNo:this.model.OrderNo})
    .then(result=>{
        wx.showToast({
          title: '取消成功!',
          icon: 'success',
        });
    })
    
  },

  changeTabsClick(e){
    const index = e.detail.index
    if (index === 1 && this.data.scoreArray.length===0 && this.data.StuPjState===1) {
      var model = wx.getStorageSync('loginModel');
    request({url:'GetOrderEvaluationByOrderNo'},{UserId:model.UserId,OrderNo:this.model.OrderNo})
    .then(result=>{
       var data = result.data.Data
       var content = data.Content
       this.setData({
         scoreArray:[data.Quality,data.Attitude,data.Standard,data.Honest],
         content
       })
    })
    }
  },
  starsonChange(e){
    var value = e.detail
    const index = e.currentTarget.dataset.index
    var params = this.params
    switch (index) {
      case 0:
        this.params.Quality = value
        break;
      case 1:
        this.params.Attitude = value
        break;  
      case 2:
        this.params.Standard = value
        break;
      default:
        this.params.Honest = value
        break;
    }
  },
  field_change(e){
    this.params.Content = e.detail.value
  },
  //提交
  uploadScoreClick(){
    
    if (this.params.Quality===0||this.params.Attitude===0||this.params.Standard===0||this.params.Honest===0){
      wx.showToast({
        title: '评分项不可以有0哦',
        icon: 'none'
      });
      return
    }
    var model = wx.getStorageSync('loginModel');
    this.params.UserId = model.UserId
    this.params.OrderNo = this.model.OrderNo
    request({url:'OrderEvaluation'},this.params)
    .then(result=>{

      wx.setStorageSync('isScore', {isScore:'ok'});
        wx.showToast({
          title: '提交成功,评分已完成!',
          icon: 'success',
        });
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 1300)
    })
    
  }
})