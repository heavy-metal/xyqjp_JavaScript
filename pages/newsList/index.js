import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    InfoType:0
  },
  params:{
    PageSize:10,
    CurrentPage:1,
    InfoType:0
  },

  TotalPage:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let InfoType = parseInt(options.InfoType)
    var that = this
    that.params.InfoType = InfoType
    that.setData({InfoType})
    that.getdata()
    
  },

  getdata(){
    request({url:'GetInfoList'},this.params)
    .then(result=>{
      this.setData({
        dataList:[...this.data.dataList,...result.data.Data],
        TotalPage:result.data.Page.TotalPage
      })
      wx.stopPullDownRefresh();
    })
  },
  // 滚动条触底 上拉加载更多页
  onReachBottom() {
    if (this.params.CurrentPage>=this.TotalPage){
      wx.showToast({
        title: '\n没有更多了\n',
        icon: 'none',
        duration: 1500,
      });
    }else{
      this.params.CurrentPage++
      this.getdata()
    }
  },
  //下拉刷新
  onPullDownRefresh(){
    this.setData({dataList:[]})
    this.params.CurrentPage = 1;
    this.getdata()
  },
  onClick(e){
    const {index} = e.currentTarget.dataset
    var url = this.data.dataList[index].FileUrl
    wx.navigateTo({
      url: '/pages/web/index?url='+url,
    });
  },
})