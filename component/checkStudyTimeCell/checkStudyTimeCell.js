// component/checkStudyTimeCell/checkStudyTimeCell.js


Component({
  /**
   * 组件的属性列表
   */
  properties: {
  
   model:{
     type:{},
     value:{}
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

    classApplyBtnClick(){
      var model = this.properties.model
      console.log(model)
      var imageArray = [model.PhotoFile1,model.PhotoFile2,model.PhotoFile3]
      wx.previewImage({
        current: model.PhotoFile1,
        urls: imageArray,
      })
    },

    checkImage(){
      var model = this.properties.model
      if (model.GovReason.length!=0){
        wx.showModal({
          title: '温馨提示',
          content: model.GovReason,
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#000000',
        });
      }
    }
      
  }
})
