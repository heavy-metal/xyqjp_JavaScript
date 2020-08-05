// pages/login/coachLogin/didAttentionList/index.js
import {request} from "../../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
  },
  getdata(){
    var model = wx.getStorageSync('loginModel');
    this.params.UserId = model.UserId
    request({url:'GetStudentAt'},this.params)
    .then(result=>{
      var arr = result.data.Data
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
    
    this.searchbarChange(e)
   
    this.onPullDownRefresh()
  },

  //点击清空控件时触发
  searchClearClick(){
    delete this.params.Mobile
    delete this.params.StuName
    delete this.params.IdCard
    this.onPullDownRefresh()
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

 
  attentionBtnClick(e){
    var loginModel = wx.getStorageSync('loginModel');
    const index = e.currentTarget.dataset.index
    var listArray = this.data.listArray
    var model = listArray[index]
    // var attentionName = 'listArray['+index+'].attentionName'
    console.log(model)
    var that = this
    request({url:'StudentAtDel'},{UserId:loginModel.UserId,StuId:model.StuId})
      .then(result=>{
        wx.showToast({
          title: '已取消关注!',
          icon: 'success',
        });
        var arr = listArray.filter(o=> o.StuId!=model.StuId)//过滤掉数组中的mdoel
        
        that.setData({
          listArray: arr
        })
        // console.log(arr)
      })
      
    
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