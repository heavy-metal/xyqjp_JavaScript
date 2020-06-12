import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    people:1,
    titleArray:['驾校'],
    contentArray:[]
  },
  params:{
    InsId:'',
    StuName:'',
    Sex:1,
    Mobile:'',
    ApplyCount:1,
    Remark:'',
    FromType:1
  },

  
  onLoad: function (options) {
    var model = JSON.parse(options.model)
    var that=this
    var titleArray = that.data.titleArray
    var contentArray = that.data.contentArray
    if(model.ShortName){
      contentArray.push(model.ShortName)
    }else{
      contentArray.push(model.SchoolName)
    }
    that.params.InsId = model.InsId
    if(model.CoachId){
      that.params.CoachId=model.CoachId;
      titleArray.push('教练')
      contentArray.push(model.Name)
      
    }
    if(model.RegSiteId){
      that.params.RegSiteId=model.RegSiteId;
      titleArray.push('报名点')
      contentArray.push(model.RegSiteName)
      
    }
    if(model.ClassId){
      that.params.ClassId=model.ClassId
      titleArray.push('班级')
      contentArray.push(model.ClassName)
      
    }
    that.setData({
      contentArray,
      titleArray
    })
  },

  
  clickMan(){
    this.setData({
      num:1
    })
    this.params.Sex=1
  },
  
  clickGirl(){
    this.setData({
      num:2
    })
    this.params.Sex=2
  },
  // + - 商品数量
  handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    if (operation===-1 && this.data.people===1){
      return
    }
    const num = this.data.people + operation
    this.setData({
      people: num
    })
    this.params.ApplyCount = num
  },

  //输入姓名
  namefieldClick(e){
    this.params.StuName = e.detail
    
  },
  //输入手机号
  phoneFieldClick(e){
    this.params.Mobile = e.detail
  },
  //备注
  beizhuFieldClick(e){
    this.params.Remark = e.detail
  },
  //报名
  applyClick(){
    if(this.params.StuName===''){
      wx.showToast({
        title: '名字不能为空',
        icon:'none'
      });
      return
    }
    if(this.params.Mobile===''){
      wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      });
      return
    }
    if(this.params.Mobile.length!=11){
      wx.showToast({
        icon:'none',
        title: '请输入正确的手机号',
      });
      return
    }
    this.postData()
  },

  postData(){
    request({url:'StudentApply'},this.params)
    .then(result=>{
      wx.showToast({
        title: '上传成功',
        icon: 'success',
        duration:2000,
      });
      
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        });
      }, 1000)
    });
  
  }
})