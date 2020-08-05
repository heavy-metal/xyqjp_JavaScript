// pages/login/PersonalCenter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    navBarHeight:0,
    model:{},
    titleArray:[],
    iconArray:[],
    
  },
//测试学员：  440184199306294255  294255
//教练：  445221199002051232    051232
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // var arr = [2,19,30,49,33]
    // if (arr.includes(2)){
    //   console.log('OKOK')
    // }
    // console.log(arr.includes(3))
    // console.log(arr1)
    
    var that = this    
    wx.getSystemInfo({
      success: e => {   // { statusBarHeight: 20, ... }，单位为 px
         // 获取右上角胶囊的位置信息
         let info = wx.getMenuButtonBoundingClientRect()  // { bottom: 58, height: 32, left: 278, right: 365, top: 26, width: 87 }，单位为 px
         let navBarHeight = info.bottom + info.top - e.statusBarHeight
         that.setData({navBarHeight})
      }
    })
    var loading = options.loading
    if (loading){
      that.setData({loading:true})
      setTimeout(function () {
        that.setData({loading:false})
      }, 1500)
    }
  },

  
  onShow: function () {
    
    var model = wx.getStorageSync('loginModel');
    console.log(model)
    if(model.UserId){
      this.setData({
        model
      })
    }
    var titleArray = []
    var iconArray = []
    if (model.LoginType==='学员'){
      titleArray = ['个人信息','学时查询','学习进度','网上约车','约车订单','客服中心','修改密码','投诉建议','关于我们']
      iconArray = ['https://i.loli.net/2020/06/09/kQNbzoVn9ePtf6c.png',
                   'https://i.loli.net/2020/06/09/SLBltqU5WFsXxva.png',
                   'https://i.loli.net/2020/06/09/XgjrwQFvmy52MO7.png',
                   'https://i.loli.net/2020/05/25/lpu8fz9jR3WirVC.png',
                   'https://i.loli.net/2020/06/09/4iB3uDj1UbHf6yO.png',
                   'https://i.loli.net/2020/06/09/eNAYwVrm9cq7JHp.png',
                   'https://i.loli.net/2020/06/09/iLGMEAZWS9QPnXe.png',
                   'https://i.loli.net/2020/06/09/ruO7Tvp9cjN1kFn.png',
                   'https://i.loli.net/2020/06/09/PHaqjGwpB5WzXIt.png']
    }else if(model.LoginType==='教练'){
      titleArray = ['个人信息','学员查询','每日教学统计','已关注学员','查询预约订单','我的排班','修改密码','投诉建议','关于我们']
      iconArray = ['https://i.loli.net/2020/06/09/kQNbzoVn9ePtf6c.png',
                   'https://i.loli.net/2020/06/10/idclYwjEGb7eLTx.png',
                   'https://i.loli.net/2020/06/09/XgjrwQFvmy52MO7.png',
                   'https://i.loli.net/2020/06/10/Df4adeSrhy9g8Fm.png',
                   'https://i.loli.net/2020/05/25/lpu8fz9jR3WirVC.png',
                   'https://i.loli.net/2020/06/10/4vtZULWdF7BxGmg.png',
                   'https://i.loli.net/2020/06/09/iLGMEAZWS9QPnXe.png',
                   'https://i.loli.net/2020/06/09/ruO7Tvp9cjN1kFn.png',
                   'https://i.loli.net/2020/06/09/PHaqjGwpB5WzXIt.png']
    }else{
      titleArray = ['驾校信息','学员查询','教练查询','车辆查询','已关注学员','客服中心','修改密码','投诉建议','关于我们']
      iconArray = ['https://i.loli.net/2020/06/09/kQNbzoVn9ePtf6c.png',
                   'https://i.loli.net/2020/06/10/idclYwjEGb7eLTx.png',
                   'https://i.loli.net/2020/06/10/Df4adeSrhy9g8Fm.png',
                   'https://i.loli.net/2020/05/25/lpu8fz9jR3WirVC.png',
                   'https://i.loli.net/2020/06/10/4vtZULWdF7BxGmg.png',
                   'https://i.loli.net/2020/06/09/eNAYwVrm9cq7JHp.png',
                   'https://i.loli.net/2020/06/09/iLGMEAZWS9QPnXe.png',
                   'https://i.loli.net/2020/06/09/ruO7Tvp9cjN1kFn.png',
                   'https://i.loli.net/2020/06/09/PHaqjGwpB5WzXIt.png']
    }
    this.setData({
      titleArray,
      iconArray
    })
  },
  clickLogin(){
    wx.navigateTo({
      url: '/pages/mine/index',
    });
  },
  //退出登录
  signOut(){
    wx.setStorageSync('loginModel', {});
    this.setData({
      model:{}
    })
  },

  //点击返回
  backClick(){
   
   wx.showModal({
     title: '温馨提示',
     content: '您确定要退出登录吗',
     showCancel: true,
     cancelText: '取消',
     cancelColor: '#000000',
     confirmText: '确定',
     confirmColor: '#000000',
     success: (result) => {
       if(result.confirm){
         this.signOut()
       }
     },
   });
   },

   navigatorItemTap(e){
    var model = wx.getStorageSync('loginModel');
    const {index} = e.currentTarget.dataset
    console.log(index)
    if(index===0){
      wx.navigateTo({url: '/pages/login/usersmessage/index'});
    }else if(index===1){
      switch (model.LoginType) {
        case "学员":
          wx.navigateTo({url: '/pages/login/studentLogin/checkStudyTime/index'});
          break;
        case "教练":
          wx.navigateTo({url: '/pages/login/coachLogin/checkStudent/index'});
        break;
        default:
          wx.navigateTo({url: '/pages/login/coachLogin/checkStudent/index'});
          break;
      }
    }else if(index===2){
      switch (model.LoginType) {
        case '学员':
          wx.navigateTo({url: '/pages/login/studentLogin/studyProgress/index'});
          
          break;
        case '教练':
          wx.navigateTo({url: '/pages/login/coachLogin/TeachinStatistics/index'});
          break;
        default:
          wx.navigateTo({url: '/pages/login/schoolLogin/checkCoach/index'});
          
          break;
      }
      
    }else if(index===3){
      switch (model.LoginType) {
        case '学员':
          wx.navigateTo({url: '/pages/login/studentLogin/bookcar/index'});
          
          break;
        case '教练':
          wx.navigateTo({url: '/pages/login/coachLogin/didAttentionList/index'});
          break;
        default:
          wx.navigateTo({url: '/pages/login/schoolLogin/searchCar/index'});
          break;
      }
      
    }else if(index===4){
      switch (model.LoginType) {
        case '学员':
          wx.navigateTo({url: '/pages/login/studentLogin/carOrder/index'});
          
          break;
        case '教练':
          wx.navigateTo({url: '/pages/login/coachLogin/searchOrder/index'});
          break;
        default:
          wx.navigateTo({url: '/pages/login/coachLogin/didAttentionList/index'});
          break;
      }
      
      
    }else if(index===5){
      switch (model.LoginType) {
        case '学员':
          wx.showToast({
            title: '敬请期待',
            icon: 'none',
          });
          break;
        case '教练':
          wx.navigateTo({url: '/pages/login/coachLogin/calendarList/index'});
          break;
        default:
          break;
      }      
      
    }else if(index===6){
      wx.navigateTo({url: '/pages/login/changePassword/index'});
      
    }else{
      wx.navigateTo({url: '/pages/login/suggest/index'});
    }
    
   },
})