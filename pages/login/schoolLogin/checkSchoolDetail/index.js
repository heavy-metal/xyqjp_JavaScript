// pages/login/schoolLogin/checkSchoolDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArray:[],
    contentArray:[],
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type
    var model = JSON.parse(options.model)
    var that=this
    var titleArray = []
    var contentArray = []
    console.log(model)
    if (type==='checkCoach'){
      titleArray = ["姓名","所属驾校","统一编号","证件号","手机","准考车型","教练星级","车牌号","上次登录时间"] 
      contentArray = [model.Name,model.SchoolName,model.CoachNum,model.IdCard,model.Mobile,model.TeachPermitted,model.StarLevel,model.LicNum,model.LastTime]
    }else if (type==='checkCar'){
      titleArray=['统一编号','车架号','经营范围','所属驾校','车牌号','车牌颜色','生产厂家','品牌','购买日期','备案状态'],
    contentArray=[model.CarNum,model.FraNum,model.PerDriType,model.SchoolName,model.LicNum,model.PlateColor,model.Manufacture,model.Brand,model.BuyDate,model.SyncState]
    }
    
    that.setData({
      contentArray,
      titleArray,
    })
  },

  
})