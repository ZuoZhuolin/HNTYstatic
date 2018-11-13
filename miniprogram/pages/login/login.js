// pages/login/login.js
var app = getApp();  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:null,
    password:null,
    rmb:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
   

    wx.getStorage({
      key: 'username',
      success: function(res) {
        console.log(res)       
        that.setData({
          idValue : res.data,
          username: res.data
        })        
      },
    })
    wx.getStorage({
      key: 'password',
      success: function(res) {
        console.log(res)
        that.setData({
          pwdValue: res.data,
          password: res.data
        })
      },
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
  
  idInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  pwdInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  login:function(){
    var that = this
    
    if (app.globalData.rmbornot == true) {
      wx.request({
        url: 'http://47.92.33.38:8080/hnty/cloud/app/android/login?username=' + this.data.username + '&password=' + this.data.password + '&mac=C4%3A07%3A2F%3A52%3A3F%3A7A',
        method: 'GET',
        success: function (res) {
          if (res.data.success) {
            console.log(res.data.deviceList)
            wx.setStorage({
              key: 'username',
              data: that.data.username,
            })
            wx.setStorage({
              key: 'password',
              data: that.data.password,
            })
            wx.setStorage({
              key: 'remember',
              data: 'true',
            })
            console.log(
              "cheng gong"
            )
            app.globalData.deviceList = res.data.deviceList
            wx.redirectTo({
              url: '../instruID/instruID',
            })
          } else {
            wx.showToast({
              title: '账户或密码错误',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    } else {
      wx.request({
        url: 'http://47.92.33.38:8080/hnty/cloud/app/android/login?username=' + this.data.username + '&password=' + this.data.password + '&mac=C4%3A07%3A2F%3A52%3A3F%3A7A',
        method: 'GET',
        success: function (res) {
          if (res.data.success) {
            console.log(res.data.deviceList)
            wx.clearStorage()
            wx.setStorage({
              key: 'remember',
              data: 'fasle',
            })
            console.log("shibai")
            app.globalData.deviceList = res.data.deviceList
            wx.redirectTo({
              url: '../instruID/instruID',
            })
          } else {
            wx.showToast({
              title: '账户或密码错误',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
  }
},

  rmbpwd: function(){
    app.globalData.rmbornot = true
    this.setData({
      rmb: app.globalData.rmbornot
    })
    console.log(app.globalData.rmbornot)
  },

  cancleRmb:function(){
    app.globalData.rmbornot = false
    this.setData({
      rmb: app.globalData.rmbornot
    })
    console.log(app.globalData.rmbornot)
  }
})