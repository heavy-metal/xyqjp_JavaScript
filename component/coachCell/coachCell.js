// component/coachCell/coachCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image:{
      type:String,
      value:''
    },
    title:{
      type:String,
      value:''
    },
    subtitle:{
      type:String,
      value:''
    },
    isHiddenApplyBtn:{
      type:Boolean,
      value: false
    },
    model:{
      type:{},
      value:{}
    },
    starValue:{
      type:Number,
      value:5
    },
    buttonName:{
      type:String,
      value:'报名'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    applyBtnClick(){
      wx.navigateTo({
        url: '/pages/applyUpload/index?model='+JSON.stringify(this.properties.model),
      });
    }
  }
})
