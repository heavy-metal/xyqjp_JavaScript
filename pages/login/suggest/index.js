// pages/login/suggest/index.js

import {request} from "../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statesArray:['待处理','已处理','继续跟踪'],
    totalPage:0,
    listArray:[],
    active:0,
    typeName:'请选择',
    typeArray:[
      {
        name: '投诉',
        color: 'gray',
        index:1
      },
      {
        name: '咨询',
        color: 'gray',
        index:2
      },
      {
        name: '建议',
        color: 'gray',
        index:3
      },
      {
        name: '求助',
        color: 'gray',
        index:4
      },
      {
        name: '系统反馈',
        color: 'gray',
        index:5
      }
    ],
    isShow:false,
  },
  params:{
    Title:'',
    Content:'',
    UserId:'',
    Type:0
  },
  
  listParams:{
    UserId:'',
    PageSize:10,
    CurrentPage:1
  },
  tabsIndex:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  clickLoginType(){
    this.setData({isShow:true})
  },

  onClose() {
    this.setData({ isShow: false });
  },

  onSelect(event) {
    this.setData({
      typeName:event.detail.name
    })
    this.params.Type = event.detail.index
  },
  titleOnChange(e){
    this.params.Title = e.detail
  },

  contentOnChange(e){
    this.params.Content = e.detail
  },

  tabsChange(e){
    var index = e.detail.index
    this.tabsIndex = index
    if(index===1&&this.data.listArray.length===0){
      this.getFeedbackList()
    }
  },

  //提交
  BtnClick(){

    if(this.params.Type===0){
      wx.showToast({
        title: '请选择反馈类型',
        icon: 'none',
      });
      return
    }
    if(this.params.Title===''||this.params.Content===''){
      wx.showToast({
        title: '标题或内容不能为空',
        icon: 'none',
      });
      return
    }
    var model = wx.getStorageSync('loginModel');
    this.params.UserId = model.UserId
    request({url:'FeedbackAdd'},this.params)
    .then(result=>{
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      });
      
      var that = this
      setTimeout(function () {
        that.setData({active:1})
        that.tabsIndex=1
        that.onLoad()
        that.onPullDownRefresh()
      }, 1300)
    })
  },

  getFeedbackList(){
    
    var model = wx.getStorageSync('loginModel');
    this.listParams.UserId = model.UserId
    request({url:'GetFeedbackList '},this.listParams)
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
    if(this.tabsIndex!=1){return}
    if(this.listParams.CurrentPage>=this.totalPage){
      wx.showToast({
        title: '\n没有更多了\n',
        icon: 'none',
      });
    }else{
      this.listParams.CurrentPage++;
      this.getFeedbackList();
    }
  },
  //下拉刷新
  onPullDownRefresh(){
    if(this.tabsIndex===1){
      this.setData({
        listArray:[]
      })
      this.listParams.CurrentPage = 1;
      this.getFeedbackList();
    }else{
      wx.stopPullDownRefresh();
    }
   
  },

  suggestDetailClick(e){
    var index = e.currentTarget.dataset.index
    var FeedbackId = this.data.listArray[index].FeedbackId
    wx.navigateTo({
      url: '/pages/login/suggestDetail/index?FeedbackId='+FeedbackId,
    });
  }
})