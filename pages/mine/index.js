// pages/mine/index.js

import {request} from "../../request/index.js"
import { hexMD5 } from "../../utils/md5.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolname:'请选择',
    InsId:'',
    show:false,
    navBarHeight:0,
    loginName:'学员',
    allSchoolArray:[],

    loginArray: [
      {
        name: '学员',
        color: 'gray',
      },
      {
        name: '教练',
        color: 'gray',
      },
      {
        name: '驾校',
        color: 'gray',
      },
    ],
    isShow:false,
    isRemberPassword:false,
    usernameValue:'',
    passwordValue:''
  },
  params:{
    LoginType:3,
    UserName:'',
    Password:'',
  },
  ishexMD5:false,//判断是否已经加过密
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: e => {   // { statusBarHeight: 20, ... }，单位为 px
         // 获取右上角胶囊的位置信息
         let info = wx.getMenuButtonBoundingClientRect()  // { bottom: 58, height: 32, left: 278, right: 365, top: 26, width: 87 }，单位为 px
         let navBarHeight = info.bottom + info.top - e.statusBarHeight
         this.setData({navBarHeight})
      }
    })  
  },

  onShow: function () {
    let info = wx.getStorageSync('loginInfo');
    console.log(info)
    console.log('hhaha')
    if(info.password){
      this.params.UserName = info.username
      this.params.Password = info.password
      this.ishexMD5 = true
      this.setData({
        usernameValue:info.username,
        passwordValue:info.password,
        isRemberPassword:info.isRemberPassword,
        loginName:info.loginName,
        InsId:info.insid,
        schoolname:info.schoolname
      })
      if(info.loginName==='驾校'&&this.data.allSchoolArray.length===0){
        this.getAllSchoolData()
      }
    }
  },

  loginBtnClick(){
    if(this.params.UserName===''||this.params.Password===''){
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none',
      });
      return
    }
    this.getdata()
  },

  clickLoginType(){
    this.setData({isShow:true})
  },
  onClose() {
    this.setData({ isShow: false });
  },
  onSelect(event) {
    console.log(event.detail)
    this.setData({
      loginName:event.detail.name
    })
    if (event.detail.name==='驾校'&&this.data.allSchoolArray.length===0){
      this.getAllSchoolData()
    }
  },

  //输入用户名
  namefieldClick(e){
    this.params.UserName = e.detail
  },

  //输入密码
  passwordFieldClick(e){
    this.params.Password = e.detail
    this.ishexMD5 = false
  },
  //记住密码
  handleAllcheckItem(e){
    var isRemberPassword = this.data.isRemberPassword
    isRemberPassword = !isRemberPassword
     this.setData({
      isRemberPassword
     })
    
  },
  //测试学员：  440184199306294255  294255
  getdata(){
    var password = this.ishexMD5?this.params.Password:hexMD5(this.params.Password);
    this.params.Password = password
    var that = this
    var url = ''
    var loginName = this.data.loginName
    if(loginName==='学员'){
      url = 'StudentLogin'
    }else if (loginName==='教练'){
      url = 'CoachLogin'
    }else{
      url = 'SchoolLogin' 
      this.params.InsId = this.data.InsId
    }
    request({url:url},this.params)
    .then(result=>{
      console.log(this.data.isRemberPassword)
      if(this.data.isRemberPassword){
        var info = {'password':password,
                    'username':that.params.UserName,
                    'isRemberPassword':true,
                    'loginName':loginName,
                    'insid':this.data.InsId,
                    'schoolname':this.data.schoolname}
        wx.setStorageSync('loginInfo',info);
        
      }
      var model = result.data.Data
      model.LoginType = that.data.loginName
      wx.setStorageSync("loginModel", model);
      
      wx.reLaunch({
        url: '/pages/login/PersonalCenter/index?loading=true',
      });
    })
  },
  //点击返回
  backClick(){
   wx.navigateBack({
     delta: 1
   });

  },
  //获取所有的驾校
  getAllSchoolData(){
    var params = {PageSize:9999,CurrentPage:1}
     request({url:'GetInsList'},params)
    .then(result=>{
      this.setData({
        allSchoolArray: result.data.Data
      })
    })
  },
  chooseSchool(){
    this.setData({
      show:true
    })
  },
  onschoolClose() {
    this.setData({ show: false });
  },
  //选择驾校名字后放到按钮上
  changeSchoolNameClick(e){
    this.onschoolClose()
    const {index} = e.currentTarget.dataset
    var InsId = this.data.allSchoolArray[index].InsId
    var schoolname = this.data.allSchoolArray[index].ShortName
    this.setData({
      InsId,
      schoolname
    })
  }
})