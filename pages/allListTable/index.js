import {request} from "../../request/index.js"
Page({

  data: {
    active: 0,
    schoolListArray:[],
    coachListArray:[],
    regSiteListArray:[],
  },

  params:{
    PageSize:10,
    CurrentPage:1
  },
  coachparams:{
    PageSize:10,
    CurrentPage:1
  },
  regSiteparams:{
    PageSize:10,
    CurrentPage:1
  },

  isCoachFirstCome:true,
  isregSiteFirstCome:true,
  scrollIndex:0,
  schoolTotalPage:0,
  coachTotalPage:0,
  regsiteTotalPage:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchoolList()
    
    var active = parseInt(options.active)
    var that = this
    that.setData({
      active
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  getSchoolList(){
    request({url:'GetInsList'},this.params)
    .then(result=>{
      this.setData({
        schoolListArray:[...this.data.schoolListArray,...result.data.Data],
      })
      this.schoolTotalPage=result.data.Page.TotalPage
      wx.stopPullDownRefresh();
    })
  },
  getCoachList(){
    request({url:'GetCoachList'},this.coachparams)
    .then(result=>{
      this.setData({
        coachListArray:[...this.data.coachListArray,...result.data.Data],
      })
      this.coachTotalPage=result.data.Page.TotalPage
      wx.stopPullDownRefresh();
    })
  },
  getRegSiteList(){
    request({url:'GetRegSiteList'},this.regSiteparams)
    .then(result=>{
      this.setData({
        regSiteListArray:[...this.data.regSiteListArray,...result.data.Data],
      })
      this.regsiteTotalPage=result.data.Page.TotalPage
      wx.stopPullDownRefresh();
    })
  },
  // 滚动条触底 上拉加载更多页
  onReachBottom() {
    var params = {}
    var totalpage=0
    if(this.scrollIndex===0){
      params=this.params
      totalpage=this.schoolTotalPage
    }else if(this.scrollIndex===1){
      params=this.coachparams
      totalpage=this.coachTotalPage
    }else{
      params=this.regSiteparams
      totalpage=this.regsiteTotalPage
    }
    if(params.CurrentPage>=totalpage){
      wx.showToast({
        title: '\n没有更多了\n',
        icon: 'none',
        duration: 1500,
      });
    }else{
      params.CurrentPage++;
      if(this.scrollIndex===0){
        this.getSchoolList()
      }else if(this.scrollIndex===1){
        this.getCoachList()
      }else{
        this.getRegSiteList()
      }
    }
  },
  //下拉刷新
  onPullDownRefresh(){
    if(this.scrollIndex===0){
      this.setData({schoolListArray:[]})
      this.params.CurrentPage = 1;
      this.getSchoolList()
    }else if(this.scrollIndex===1){
      this.setData({coachListArray:[]})
      this.coachparams.CurrentPage = 1;
      this.getCoachList()
    }else{
      this.setData({getRegSiteList:[]})
      this.regSiteparams.CurrentPage = 1;
      this.getRegSiteList()
    }
   
  },
  applyBtnClick(){
    wx.navigateTo({
      url: '/pages/applyUpload/index?model='+JSON.stringify(this.data.model),
    });
  },
  // 点击驾校查看详情
  schoolDetailClick(e){
    const {index} = e.currentTarget.dataset
    let modelStr = JSON.stringify(this.data.schoolListArray[index])
    wx.navigateTo({
      url: '/pages/schoolDetail/index?detailType=0&model='+modelStr,
    });
  },
  //点击coach详情
  coachDetailClick(e){
    const {index} = e.currentTarget.dataset
    let modelStr = JSON.stringify(this.data.coachListArray[index])
    wx.navigateTo({
      url: '/pages/schoolDetail/index?detailType=1&model='+modelStr,
    });
  },
  regSiteDetailClick(e){
    const {index} = e.currentTarget.dataset
    let modelStr = JSON.stringify(this.data.regSiteListArray[index])
    wx.navigateTo({
      url: '/pages/schoolDetail/index?detailType=2&model='+modelStr,
    });
  },

  //切换标签
  tabsChange(e){
    const index=e.detail.index
    this.scrollIndex = index
    if(index===1){
      if(this.isCoachFirstCome){
        this.getCoachList();
        this.isCoachFirstCome=false
      }
    }else if(index===2){
      if(this.isregSiteFirstCome){
        this.getRegSiteList();
        this.isregSiteFirstCome=false
      }
    }
  }
})