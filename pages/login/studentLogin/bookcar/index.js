// pages/login/studentLogin/bookcar/index.js
import {request} from "../../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArray:[]
  },
  totalPage:0,

  params:{
    UserId:'',
    PageSize:10,
    CurrentPage:1,
    StuId:'',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
  },

  getdata(){
    var model = wx.getStorageSync('loginModel');
    this.params.UserId = model.UserId
    this.params.StuId = model.UserId
    request({url:'SearchStuAppCoach'},this.params)
    .then(result=>{
      this.setData({
        listArray:[...this.data.listArray,...result.data.Data],
      })
      this.totalPage=result.data.Page.TotalPage
      wx.stopPullDownRefresh();
    })
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

  //选择教练
  selectedCoachClick(){

  }
})