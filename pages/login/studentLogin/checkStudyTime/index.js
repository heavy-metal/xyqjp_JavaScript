// pages/login/studentLogin/checkStudyTime/index.js
import {request} from "../../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArray:['科目一','科目二','科目三','科目四'],
    listArray:[]
  },
  totalPage,

  params:{
    UserId:'',
    PageSize:10,
    CurrentPage:1,
    StuId:'',
    Subject:1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
  },

  onShow: function () {

  },

  getdata(){
    var model = wx.getStorageSync('loginModel');
    this.params.UserId = model.UserId
    this.params.StuId = model.StuId
    request({url:'GetStudyList'},this.params)
    .then(result=>{
      this.setData({
        listArray:[...this.data.listArray,...result.data.Data],
      })
      this.totalPage=result.data.Page.TotalPage
      wx.stopPullDownRefresh();
    })
  }
})