// pages/login/schoolLogin/searchCar/index.js

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
    CurrentPage:1,
    PageSize:10,
  },
  saveListArray:[],
  saveCurrentPage:0,
  saveTotalpage:0,
  isFirstCome:true,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
  },

  getdata(){
    var model = wx.getStorageSync('loginModel');
    this.params.UserId = model.UserId
    request({url:'SearchCar'},this.params)
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
  

  //搜索
  onSearch(e){
    
    if (this.isFirstCome){
      this.isFirstCome = false
      this.saveListArray = this.data.listArray
      this.saveCurrentPage = this.params.CurrentPage
      this.saveTotalpage = this.totalPage
    }
    this.searchbarChange(e)
   
    this.onPullDownRefresh()
  },

  //点击清空控件时触发
  searchClearClick(){
    this.params.CurrentPage = this.saveCurrentPage
    this.totalPage = this.saveTotalpage
    this.setData({listArray:this.saveListArray})
  },
  //搜索内容发生改变
  searchbarChange(e){
    this.params.LicNum = e.detail
  },

  
  //详情
  itemTap(e){
    var index = e.currentTarget.dataset.index
    var listArray = this.data.listArray
    var model = listArray[index]
    console.log(model)
    wx.navigateTo({
      url: '/pages/login/schoolLogin/checkSchoolDetail/index?type=checkCar&model='+JSON.stringify(model)
    });
  }
})