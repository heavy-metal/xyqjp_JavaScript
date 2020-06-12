//index.js
//获取应用实例
import {request} from "../../request/index.js"

Page({
  data: {
    loading:true,
    swiperList:[],
    coachInfoArray:[],
    zczxInfoArray:[],
    schoolInfoArray:[],
    textArray:['我要报名','客服热线','政策咨询','驾考流程','驾考条件','学车须知','驾考攻略','通知通告'],
    // imageUrl:['https://i.loli.net/2020/05/25/lpu8fz9jR3WirVC.png',
    //         'https://i.loli.net/2020/05/25/1ZqKUa3oFHTXL9f.png',
    //         'https://i.loli.net/2020/05/25/BwObu7t1lCR2Joq.png',
    //         'https://i.loli.net/2020/05/25/NsoUfw65DbcATjr.png',
    //         'https://i.loli.net/2020/06/05/NB3R9sgPIh1ombi.png',
    //         'https://i.loli.net/2020/05/25/MeT3LmbXCrG8Vfc.png',
    //         'https://i.loli.net/2020/05/26/UezcPqjaNDWx2C6.png',
    //         'https://i.loli.net/2020/05/26/U8mDBZrhz9YF2nf.png',],
            
            
            
    imageUrl:[
             'https://i.loli.net/2020/06/05/uTXEf3Be2Gsg5iW.png',
             'https://i.loli.net/2020/06/05/oksE8pCyPmVh4Hd.png',
             'https://i.loli.net/2020/06/05/KiXsjpt2gFnmA8r.png',
             'https://i.loli.net/2020/05/25/NsoUfw65DbcATjr.png',
             'https://i.loli.net/2020/06/05/cwLCJs7oIAubtWl.png',
             'https://i.loli.net/2020/06/05/mb96lRTApz4fi7y.png',
             'https://i.loli.net/2020/06/05/Wo2tyxY4aD3EeUm.png',
             'https://i.loli.net/2020/06/05/SCL6hEogTWVi73H.png'],
    titleArray:['推荐驾校','推荐教练','政策资讯'],        
            
  },
  JklcUrl:'',
  JktjUrl:'',
  
  onLoad: function () {
    

    this.getSwiperList();
  },
  

  getSwiperList(){
    request({url:'GetAppHome'})
    .then(result=>{
      this.JklcUrl=result.data.Data.JklcUrl,
        this.JktjUrl=result.data.Data.JktjUrl
      this.setData({
        swiperList : result.data.Data.ImgInfoRows,
        schoolInfoArray: result.data.Data.InsRows,
        coachInfoArray: result.data.Data.CoachRows,
        zczxInfoArray: result.data.Data.ZczxInfoRows,
        loading:false
      })
    })
  },
  // 点击按钮
  navigatorItemTap(e){
    const {index} = e.currentTarget.dataset
    console.log(index)
    if(index===0){
      wx.navigateTo({url: '/pages/allListTable/index?active=0'});
    }else if(index===1){
      
    }else if(index===2){
      wx.navigateTo({url: '/pages/newsList/index?InfoType=2'});
    }else if(index===3){
      wx.navigateTo({url: '/pages/web/index?url='+this.JklcUrl});
    }else if(index===4){
      wx.navigateTo({url: '/pages/web/index?url='+this.JktjUrl});
    }else if(index===5){
      wx.navigateTo({url: '/pages/newsList/index?InfoType=1'});
    }else if(index===6){
      wx.navigateTo({url: '/pages/newsList/index?InfoType=3'});
    }else{
      wx.navigateTo({url: '/pages/newsList/index?InfoType=4'});
    }
    
    
  },
  moreSchoolClick(){//推荐驾校 更多
    wx.navigateTo({url: '/pages/allListTable/index?active=0'});
  },
  moreCoachClick(){//推荐教练 更多
    wx.navigateTo({url: '/pages/allListTable/index?active=1'});
  },
  moreZczxClick(){//政策咨询 更多
    wx.navigateTo({url: '/pages/newsList/index?InfoType=2'});
  },
  
  // 点击驾校查看详情
  schoolDetailClick(e){
    const {index} = e.currentTarget.dataset
    let modelStr = JSON.stringify(this.data.schoolInfoArray[index])
    wx.navigateTo({
      url: '/pages/schoolDetail/index?detailType=0&model='+modelStr,
    });
  },
  //点击coach详情
  coachDetailClick(e){
    const {index} = e.currentTarget.dataset
    let modelStr = JSON.stringify(this.data.coachInfoArray[index])
    wx.navigateTo({
      url: '/pages/schoolDetail/index?detailType=1&model='+modelStr,
    });
  }
})
