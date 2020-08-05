// pages/login/schoolLogin/checkCoach/index.js

import {request} from "../../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentAttentionId:'',
    isShow:false,
    searchName:'姓名',
    listArray:[],
    searchTypeArray:[
      {
        name: '姓名',
        color: 'gray',
        index:1
      },
      {
        name: '手机号',
        color: 'gray',
        index:2
      },
      {
        name: '证件号',
        color: 'gray',
        index:3
      }]
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
    request({url:'SearchCoach'},this.params)
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
  onClose() {
    this.setData({ isShow: false });
  },

  onSelect(event) {
    this.setData({
      searchName:event.detail.name
    })
    
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
    
    switch (this.data.searchName) {
      case '姓名':
        this.params.CoachName = e.detail
        delete this.params.Mobile
        delete this.params.IdCard
        break;
      case '手机号':
        this.params.Mobile = e.detail
        delete this.params.CoachName
        delete this.params.IdCard
        break;
      default:
        this.params.IdCard = e.detail
        delete this.params.Mobile
        delete this.params.CoachName
        break;
    }
    
  },
  //选择搜索条件
  searchTypeChange(){
    this.setData({ isShow: true });
  },



  //详情
  itemTap(e){
    const index = e.currentTarget.dataset.index
    var listArray = this.data.listArray
    var model = listArray[index]
    wx.navigateTo({
      url: '/pages/login/schoolLogin/checkSchoolDetail/index?type=checkCoach&model='+JSON.stringify(model)
    });
  }
})
