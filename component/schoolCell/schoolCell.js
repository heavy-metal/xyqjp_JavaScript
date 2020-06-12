// component/schoolCell/schoolCell.js
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: 3
  },

  /**
   * 组件的方法列表
   */
  methods: {
    applyBtnClick(){
      console.log(this.properties.model.InsId)
      console.log(this.properties.model.ShortName)
      wx.navigateTo({
        url: '/pages/applyUpload/index?model='+JSON.stringify(this.properties.model),
      });
    }
  }
})
