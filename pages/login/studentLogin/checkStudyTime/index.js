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
  totalPage:0,

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
    this.params.StuId = model.UserId
    request({url:'GetStudyList'},this.params)
    .then(result=>{
      this.setData({
        listArray:[...this.data.listArray,...result.data.Data],
      })
      this.totalPage=result.data.Page.TotalPage
      wx.stopPullDownRefresh();
    })
  },

  tapsChangeClick(e){
    this.setData({listArray:[]})
    this.params.Subject=e.detail.index+1
    this.getdata()
  },

  // 滚动条触底 上拉加载更多页
  onReachBottom() { 
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
      this.setData({listArray:[]})
      this.params.CurrentPage = 1;
      this.getdata()
  },

})