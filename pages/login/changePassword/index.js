// pages/login/changePassword/index.js
import {request} from "../../../request/index.js"
import { hexMD5 } from "../../../utils/md5.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  params:{
    UserId:'',
    OldPassword:'',
    NewPassword:''
  },
  againNewPassword:'',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  oldPasswordClick(e){
    this.params.OldPassword = e.detail
  },

  newPasswordClick(e){
    this.params.NewPassword = e.detail
  },

  againPasswordClick(e){
    this.againNewPassword = e.detail
  },

  changeBtnClick(){
    console.log(this.params)
    console.log(this.againNewPassword)
    if (this.params.OldPassword===''||this.params.NewPassword===''||this.againNewPassword===''){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
      });
      return
    }
    if (this.params.NewPassword!=this.againNewPassword) {
      wx.showToast({
        title: '两次输入的新密码不相同',
        icon: 'none',
      });
      return
    }

    this.getdata()
  },


  getdata(){
    var loginModel = wx.getStorageSync('loginModel');
    this.params.UserId = loginModel.UserId
    this.params.NewPassword = hexMD5(this.params.NewPassword);
    this.params.OldPassword = hexMD5(this.params.OldPassword);
    var that = this
    var url = ''
    var loginName = loginModel.LoginType
    if(loginName==='学员'){
      url = 'StudentChangePwd'
      that.params.InsId = loginModel.InsId
    }else if (loginName==='教练'){
      url = 'CoachChangePwd'
    }else{
      url = 'SchoolChangePwd' 
    }
    request({url:url},this.params)
    .then(result=>{
      wx.removeStorageSync('loginInfo');
      wx.removeStorageSync('loginModel');
      wx.showModal({
        title: '温馨提示',
        content: '修改密码成功！请重新登录',
        confirmText: '确定',
        confirmColor: '#000000',
        showCancel: false,
        success: (result) => {
          if(result.confirm){
            wx.reLaunch({
              url: '/pages/login/PersonalCenter/index',
            });
            // wx.switchTab({
            //   url: '/pages/login/PersonalCenter/index',
            // });
            
          }
        },
      });
    })
  }
})