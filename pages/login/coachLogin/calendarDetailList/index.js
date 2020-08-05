// pages/login/coachLogin/calendarDetailList/index.js
import {request} from "../../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArray:[],
    titleText:'',
    typeText:'请选择',
    subject:'请选择',
    address:'请选择',
    infoArray:[],
    subjectArray:[],
    show:false,
    selectTitle:'',
    addressArray:[],
    chargesList:[],
    active:0,
  },
  params:{
    UserId:'',
    CoachId:'',
    PageSize:10,
    CurrentPage:1,
    SchDate:''
  },
  totalPage:0,
  tapsIndex:0,
  selectedIndex:0,
  ConfigId:'',
  Subject:'',
  RegionId:'',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (that.params.SchDate===''){
      var SchDate = options.SchDate
      that.params.SchDate = SchDate
      that.setData({
        titleText: SchDate
      })
    }
    
    that.getdata()
  },
  getdata(){
    var model = wx.getStorageSync('loginModel');
    this.params.UserId = model.UserId
    this.params.CoachId = model.UserId
    request({url:'GetCoachScheduleByDay'},this.params)
    .then(result=>{
      this.setData({
        listArray:[...this.data.listArray,...result.data.Data]
      })
      this.totalPage=result.data.Page.TotalPage
      wx.stopPullDownRefresh();
    })
  },
  //获取排班模版
  getSeduConfigs(){
    var model = wx.getStorageSync('loginModel');
    request({url:'GetSeduConfigs'},{UserId:model.UserId})
    .then(result=>{
      this.setData({
        infoArray:result.data.Data
      })
    })
  },
  //获取其所属驾校的训练场
  getRegionByUserId(){
    var model = wx.getStorageSync('loginModel');
    request({url:'GetRegionByUserId'},{UserId:model.UserId})
    .then(result=>{
      this.setData({
        addressArray:result.data.Data
      })
    })
  },

  // 滚动条触底 上拉加载更多页
  onReachBottom() {
    if (this.tapsIndex!=0){return}
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
    if (this.tapsIndex!=0){return}
    this.setData({listArray:[]})
    this.params.CurrentPage = 1;
    this.getdata()
   
  },
  tapsChange(e){
    var index = e.detail.index
    this.tapsIndex = index
    // console.log(e)
    if (index===1 && this.data.infoArray.length===0){
      this.getSeduConfigs()  
    }
    
    if (index===1 && this.data.addressArray.length===0){
      this.getRegionByUserId()  
    }
  },
  onClose(){
    this.setData({show:false})
  },
  typeTextClick(){//点击排班模板选择器
    this.selectedIndex = 0
    var arr = []
    this.data.infoArray.forEach(element => {
      arr.push(element.ConfigName)
    });
    this.setData({
      show: true,
      subjectArray: arr
    })
  },
  subjectClick(){
    this.selectedIndex = 1
    this.setData({
      show:true,
      subjectArray:['第二部分','第三部分']
    })
  },
  addressClick(){
    this.selectedIndex = 2
    var arr = []
    this.data.addressArray.forEach(element => {
      arr.push(element.Name)
    });
    this.setData({
      show:true,
      subjectArray:arr
    })
  },
  //选择了某个模版
  onConfirm(event){
    const { picker, value, index } = event.detail;
    var that = this
    var arr = []
    switch (this.selectedIndex) {
      case 0:
        that.setData({typeText:value})
        var ConfigId = that.data.infoArray[index].ConfigId
        that.ConfigId = ConfigId
        this.getSeduTimes(ConfigId)
        break;
      case 1:
        this.Subject = String(index+2)
        that.setData({subject:value})
        break  
      default:
        that.RegionId = that.data.addressArray[index].RegionId
        that.setData({address:value})
        break;
    }
    this.setData({
      show: false,
    })
  },

  loginBtnClick(){
    if (this.data.typeText==='请选择' || this.data.subject==='请选择' || this.data.address==='请选择'){
      wx.showToast({
        title: '请把要求填写完成',
        icon: 'none',
      });
      return
    }
    this.scheduleBuildCoachDay()
  },
  //排班时段列表
  getSeduTimes(configId){
    var model = wx.getStorageSync('loginModel');
    request({url:'GetSeduTimes'},{UserId:model.UserId,ConfigId:configId})
    .then(result=>{
      this.setData({
        chargesList:result.data.Data
      })
    })
  },

  //ScheduleBuildCoachDay
  scheduleBuildCoachDay(){
    var model = wx.getStorageSync('loginModel');
    var params = {
      UserId:model.UserId,
      CoachId:model.UserId,
      ConfigId:this.ConfigId,
      SchDate:this.data.titleText,
      Subject:this.Subject,
      RegionId:this.RegionId
    }
    var that = this
    request({url:'ScheduleBuildCoachDay'},params)
    .then(result=>{
      wx.showToast({
        title: '排班已生成！',
        icon: 'success',
      })
      
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        });
      }, 1300)
    })
  }
})