// pages/login/studentLogin/selectbookcar/index.js

import {request} from "../../../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleArray:[],
    infoArray:[],
    // isSelected:false,
    selectIcon:'https://i.loli.net/2020/06/16/SOWzkxAwsXu7LQa.png',
    notSelectIcon:'https://i.loli.net/2020/06/16/sJxtfLehQKVBCl2.png'
  },
  CoachId:'',
  selectedArray:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.CoachId = options.CoachId
    that.getdata()
  },
  getdata(){//时间title
    var model = wx.getStorageSync('loginModel');
    request({url:'GetCoachScheduleXDayGroup'},{UserId:model.UserId,StuId:model.UserId,CoachId:this.CoachId})
    .then(result=>{
      this.setData({
        titleArray: result.data.Data
      })
      this.getInfoData(result.data.Data[0].SchDate)
    })
  },
  //改变tabs菜单
  tapsChangeClick(e){
    const index=e.detail.index
    this.selectedArray = []
    this.setData({infoArray:[]})
    this.getInfoData(this.data.titleArray[index].SchDate)
  },
  getInfoData(schDate){
    var model = wx.getStorageSync('loginModel');
    request({url:'GetCoachScheduleKyByDay'},{UserId:model.UserId,SchDate:schDate,CoachId:this.CoachId})
    .then(result=>{
      var arr = result.data.Data
      arr.forEach(e => {
        e.selected = false
      });
      // model.selected = false//增加一个选中属性，方便捆绑
      this.setData({
        infoArray: arr
      })
    })
  },

  //点击cell
  selectedTimeClick(e){
    const {index} = e.currentTarget.dataset
    var infoArray = this.data.infoArray
    var model = infoArray[index]

    // var selectedArray = this.selectedArray
    //不能随意取消选中    
    if(this.selectedArray.includes(index)){
      var arr = this.mysort(this.selectedArray)
      if (index!=arr[0]&&index!=arr[arr.length-1]){
        wx.showToast({
          title: '时间段需要连续性，无法取消',
          icon: 'none',
        });
        return
      }
      this.selectedArray = arr.filter(o=> o!=index)//过滤掉数组中的index
        
      this.changeSelectedStates(index)
      console.log(this.selectedArray)
      return
    }

    if (this.selectedArray.length===0){
      this.selectedArray.push(index)
    }else{
      var arr = this.mysort(this.selectedArray)
      if (index===arr[0]-1){
        let leftModel = infoArray[index]
        let rightModel = infoArray[arr[0]]
        if (leftModel.SchTimeEnd === rightModel.SchTimeBegin) {
          this.selectedArray.push(index)
        }else{
          wx.showToast({
            title: '时间段不能隔开',
            icon: 'none',
          });
          return
        }
      }else if (index===arr[arr.length-1]+1){
        let leftModel = infoArray[arr[arr.length-1]]
        let rightModel = infoArray[index]
        if (leftModel.SchTimeEnd === rightModel.SchTimeBegin){
          this.selectedArray.push(index)
        }else{
          wx.showToast({
            title: '时间段不能隔开',
            icon: 'none',
          });
          return
        }
      }else{
        wx.showToast({
          title: '时间段不能隔开',
          icon: 'none',
        });
        return
      }
      
    }
    this.changeSelectedStates(index)
   
    console.log(this.selectedArray)
  },
  //数组的大小排序
  mysort(a){
    var n=a.length;
    var newa=[];
    var temp;
    for(var i=0;i<n;i++)
    {
        for(var j=i;j<n;j++)
        {
            if(a[i]>a[j])
            {
                temp=a[i];
                a[i]=a[j];
                a[j]=temp;
             }
         }
         newa.push(a[i]);
     }
     return newa;
  },

  //修改选中状态
  changeSelectedStates(index){
    var infoArray = this.data.infoArray
    var model = infoArray[index]
    var selected = 'infoArray['+index+'].selected'
    this.setData({
      [selected]:!model.selected
    })
  },

  //提交
  submitClick(){
    if (this.selectedArray.length===0){return}
    var selectedArray = this.mysort(this.selectedArray)
    var arr = []
    var infoArray = this.data.infoArray
    // for (const value in selectedArray) {
    //   if (selectedArray.hasOwnProperty(value)) {
        
    //     arr.push(infoArray[value])
    //   }
    // }
    selectedArray.forEach(element => {
      arr.push(infoArray[element])
    });
   
    console.log(arr)
    wx.navigateTo({
      url: '/pages/login/studentLogin/totalBookCar/index?arr='+JSON.stringify(arr),
    });
    
  }
})