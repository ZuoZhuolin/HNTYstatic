// pages/instruID/instruID.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    for (var i = 0; i < app.globalData.deviceList.length; i++) {
      app.globalData.instruList.push(app.globalData.deviceList[i].id)
    }
    console.log(app.globalData.instruList)
    this.setData({
      arr: app.globalData.instruList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  chooseInstru: function(e){
    var index = e.currentTarget.id;
    console.log(e.currentTarget.id)
    app.globalData.showId = this.data.arr[index]
    console.log(app.globalData.showId)
    wx.navigateTo({
      url: '../EMQ/EMQ',
    })
  },
  scanId: function(){
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        console.log("--result:" + res.result + "--scanType:" + res.scanType + "--charSet:" + res.charSet + "--path:" + res.path);
        app.globalData.showId = res.result;
        console.log(app.globalData.showId);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        wx.redirectTo({
          url: '../EMQ/EMQ',
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'none',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  }
})