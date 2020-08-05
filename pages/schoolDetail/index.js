

import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    model:{},
    titleArray:[],
    contentArray:[],
    classList:[],
    type:'',
  },

  detailType:{
    school:'0',
    coach:'1',
    regsite:'2'
  },

  params:{
    InsId:'',
    PageSize:10,
    CurrentPage:1
  },
  isFirstCome:false,
  tabsTitle:'',
  totalPage:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var type = options.detailType
    var model = JSON.parse(options.model)
    var that=this
    var titleArray = []
    var contentArray = []
    if(type===that.detailType.school){
      model.image = model.SchImage
      titleArray=['驾校名称','经营范围','电话','地址','车辆数','地区']
      contentArray=[model.ShortName,model.BusiScope,model.RegTel,model.Address,model.TracarNum,model.District]
    }else if(type===that.detailType.coach) {
      model.image = model.CoachImage
      titleArray=['教练名字','性别','电话','经营范围','所属驾校','驾校区域'],
      contentArray=[model.Name,model.Sex,model.Mobile,model.TeachPermitted,model.SchoolName,model.District]
    }else if (type===that.detailType.regsite){
      model.image = model.RegSiteImage
      titleArray=['报名地点','所属驾校','电话','地区'],
      contentArray=[model.RegSiteName,model.SchoolName,model.Tel,model.District]
    }
    
    that.setData({
      model,
      contentArray,
      titleArray,
      type
    })
    
  },

  getClassData(){
    this.params.InsId = this.data.model.InsId
    request({url:'GetClassList'},this.params)
    .then(result=>{
      this.setData({
        classList:[...this.data.classList,...result.data.Data]
      })
      this.totalPage=result.data.Page.TotalPage
      wx.stopPullDownRefresh();
    })
  },

//点击切换了tabs
  onClick(e) {
    this.tabsTitle=e.detail.title
    // console.log(e)
    if (this.isFirstCome===false){
      this.getClassData()
      this.isFirstCome=true
    }
  },

  // 滚动条触底 上拉加载更多页
  onReachBottom() {
    if(this.tabsTitle!='报班'){return}
    if(this.params.CurrentPage>=this.totalPage){
      wx.showToast({
        title: '\n没有更多了\n',
        icon: 'none',
        duration: 1500,
      });
    }else{
      this.params.CurrentPage++;
      this.getClassData();
    }
  },
  //下拉刷新
  onPullDownRefresh(){
    if(this.tabsTitle==='报班'){
      this.setData({
        classList:[]
      })
      this.params.CurrentPage = 1;
      this.getClassData()
    }else{
      wx.stopPullDownRefresh();
    }
   
  },
  //详情页面报名
  applyBtnClick(){
    wx.navigateTo({
      url: '/pages/applyUpload/index?model='+JSON.stringify(this.data.model),
    });
  },
  //班级报名
  classApplyBtnClick(e){
    const {index} = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/applyUpload/index?model='+JSON.stringify(this.data.classList[index]),
    });
  }

})