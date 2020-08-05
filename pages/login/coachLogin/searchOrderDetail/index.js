// pages/login/coachLogin/searchOrderDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArray:['培训部分','培训学员','学员电话','训练场','订单金额','实付金额','订单状态','支付状态','支付时间','下单时间','培训时间','订单号'],
    infoArray:[],
    scoreTitleArray:['教学质量:','教学态度:','教学规范:','行为准则:'],
    StuPjState:0,//判断是否已评价
    
  },
  orderArray:['关闭','取消','正常'],
  payStatesArray:['退款','未支付','已支付'],
  model:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var model = JSON.parse(options.model)
    this.model = model
    var StuPjState = model.StuPjState
    var that = this
    var str = model.BeginTime.substring(0,model.BeginTime.length-1-2)+' ~ '+model.EndTime.substring(5,model.EndTime.length-1-2)
    var infoArray = []
    infoArray = [model.Subject,model.StuName,model.StuMobile,model.RegionName,model.AmountYF,model.AmountSF,this.orderArray[model.OrderState+1],this.payStatesArray[model.PayState+1],model.PayDate,model.OrderDate,str,model.OrderNo]
    that.setData({
      infoArray,
      StuPjState
    })
  },

})