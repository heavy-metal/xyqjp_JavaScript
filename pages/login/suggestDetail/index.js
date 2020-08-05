// pages/login/suggestDetail/index.js
import {request} from "../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArray:['反馈时间','反馈类型','处理状态','标题','反馈内容','回复','处理时间'],
    contentArray:[]
  },
  statesArray:['待处理','已处理','继续跟踪'],
  FeedbackTypeArray:['投诉','咨询','建议','求助','系统反馈'],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var FeedbackId = options.FeedbackId
    this.getdata(FeedbackId)
  },
  getdata(feedbackId){
    var model = wx.getStorageSync('loginModel');
    request({url:'GetFeedbackInfo'},{UserId:model.UserId,FeedbackId:feedbackId})
    .then(result=>{
      var model1 = result.data.Data
      this.setData({
        contentArray:[model1.FeedbackTime,this.FeedbackTypeArray[model1.FeedbackType-1],this.statesArray[model1.OpState],model1.Title,model1.Content,model1.OpContent,model1.OpTime]
      })
    })
  }
})