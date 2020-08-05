// pages/login/coachLogin/checkStudent/index.js
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
    this.getStudentAtId()
  },

  getdata(){
    var model = wx.getStorageSync('loginModel');
    this.params.UserId = model.UserId
    request({url:'SearchStudent'},this.params)
    .then(result=>{
      var arr = result.data.Data
      arr.forEach(element => {
        //判断字符串是否包含某字符
        element.attentionName = this.data.studentAttentionId.indexOf(element.StuId)>=0?'已关注':'+ 关注'
      });
      this.setData({
        listArray:[...this.data.listArray,...arr]
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
        this.params.StuName = e.detail
        delete this.params.Mobile
        delete this.params.IdCard
        break;
      case '手机号':
        this.params.Mobile = e.detail
        delete this.params.StuName
        delete this.params.IdCard
        break;
      default:
        this.params.IdCard = e.detail
        delete this.params.Mobile
        delete this.params.StuName
        break;
    }
    
  },
  //选择搜索条件
  searchTypeChange(){
    this.setData({ isShow: true });
  },

  //获取关注学员
  getStudentAtId(){
    var model = wx.getStorageSync('loginModel');
    request({url:'GetStudentAtId'},{UserId:model.UserId})
    .then(result=>{
      this.getdata()
      this.setData({
        studentAttentionId:result.data.Data
      })
    })
  },

  attentionBtnClick(e){
    var loginModel = wx.getStorageSync('loginModel');
    const index = e.currentTarget.dataset.index
    var listArray = this.data.listArray
    var model = listArray[index]
    var attentionName = 'listArray['+index+'].attentionName'
    console.log(model)
    if(model.attentionName==='已关注'){
      request({url:'StudentAtDel'},{UserId:loginModel.UserId,StuId:model.StuId})
      .then(result=>{
        wx.showToast({
          title: '已取消关注!',
          icon: 'success',
        });
        this.setData({
          [attentionName]: '+ 关注'
        })
      })
    }else{
      request({url:'StudentAtAdd'},{UserId:loginModel.UserId,StuId:model.StuId})
      .then(result=>{
        wx.showToast({
          title: '已关注该学员!',
          icon: 'success',
        });
        this.setData({
          [attentionName]: '已关注'
        })
      })
    }
  },


  //详情
  itemTap(e){
    const index = e.currentTarget.dataset.index
    var listArray = this.data.listArray
    var model = listArray[index]
    wx.navigateTo({
      url: '/pages/login/coachLogin/checkStudentDetail/index?model='+JSON.stringify(model)
    });
  }
})