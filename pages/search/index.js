import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolListArray:[],
    coachListArray:[],
    regSiteListArray:[],
    districtArray:[],
    districtNumArr:[],
    index:0,
    show:false,
    districtName:'全部',
    districtNum:'',
    searchText:''
  },
  params:{
    PageSize:10,
    CurrentPage:1,
    Name:'',
    District:''
  },
  coachparams:{
    PageSize:10,
    CurrentPage:1,
    Name:'',
    District:''
  },
  regSiteparams:{
    PageSize:10,
    CurrentPage:1,
    Name:'',
    District:''
  },

  tabsChangeIndex:0,
  schoolTotalPage:0,
  coachTotalPage:0,
  regsiteTotalPage:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDistictData()
  },
  clicj(){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  //切换地区
  districtClick(e){
    this.onClose()
    const {index} = e.currentTarget.dataset
    var districtNum = this.data.districtNumArr[index]
    var districtName = this.data.districtArray[index].name
    this.setData({
      districtName,
      districtNum
    })
    this.params.District = districtNum
    this.coachparams.District = districtNum
    this.regSiteparams.District = districtNum
    this.onSearch()
    // if(this.tabsChangeIndex===0){
    //   this.params.Name = this.data.searchText
    //   this.setData({schoolListArray:[]})
    //   this.getSchoolList()
    // }else if(this.tabsChangeIndex===1){
    //   this.coachparams.Name = this.data.searchText
    //   this.setData({coachListArray:[]})
    //   this.getCoachList()
    // }else if(this.tabsChangeIndex===2){
    //   this.regSiteparams.Name = this.data.searchText
    //   this.setData({regSiteListArray:[]})
    //   this.getRegSiteList()
    // }

  },
  //切换tabs菜单
  tabsChange(e){
    this.tabsChangeIndex = e.detail.index
    if(this.data.searchText===''&&this.data.districtNum===''){return}
    this.onSearch()
  },

  //输入内容发生改变
  searchbarChange(e){
    var searchText = e.detail
    this.setData({searchText})
  },

  // 搜索内容
  onSearch(){
    var searchText = this.data.searchText
    
    if(this.tabsChangeIndex===0){
      this.setData({schoolListArray:[]})
      this.params.Name = searchText
      this.getSchoolList()
    }else if(this.tabsChangeIndex===1){
      this.setData({coachListArray:[]})
      this.coachparams.Name = searchText
      this.getCoachList()
    }else{
      this.setData({regSiteListArray:[]})
      this.regSiteparams.Name = searchText
      this.getRegSiteList()
    }
  },
  // 滚动条触底 上拉加载更多页
  onReachBottom() {
    var params = {}
    var totalpage=0
    if(this.tabsChangeIndex===0){
      params=this.params
      totalpage=this.schoolTotalPage
    }else if(this.tabsChangeIndex===1){
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
      if(this.tabsChangeIndex===0){
        this.getSchoolList()
      }else if(this.tabsChangeIndex===1){
        this.getCoachList()
      }else{
        this.getRegSiteList()
      }
    }
  },
   //下拉刷新
  onPullDownRefresh(){
    wx.stopPullDownRefresh();
  },

  getDistictData(){
    request({url:'GetDistrict'})
    .then(result=>{
      var arr = result.data.Data
      var districtArray = []
      var districtNumArr = []
      arr.forEach(element => {
        districtArray.push({name:element.Name})
        districtNumArr.push(element.District)
      });
      this.setData({
        districtArray,
        districtNumArr
      })
    })
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
})