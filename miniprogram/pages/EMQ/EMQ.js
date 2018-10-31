// pages/EMQ/EMQ.js
var stompClient = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * WebSocket相关 + STOMP
   */
  initSocket: function () {

    var socketOpen = false

    function sendSocketMessage(msg) {
      console.log('send msg:')
      console.log(msg);
      if (socketOpen) {
        wx.sendSocketMessage({
          data: msg
        })
      } else {
        socketMsgQueue.push(msg)
      }
    }


    var ws = {
      send: sendSocketMessage
    }

    wx.connectSocket({
      url: 'ws://47.92.33.38:8080/hnty/WebSocketServer'
    })

    wx.onSocketOpen(function (res) {
      socketOpen = true
      ws.onopen()
    })

    wx.onSocketMessage(function (res) {
      ws.onmessage(res)
    })

    var Stomp = require('../../utils/stomp.js').Stomp;
    Stomp.setInterval = function () { }
    Stomp.clearInterval = function () { }
    var stompClient = Stomp.over(ws);

    stompClient.connect({}, function (sessionId) {
      stompClient.subscribe('/measure/QB91G3S01000396', function (res) {
        var state = JSON.parse(res.body);
        console.log('From MQ:', state);
        console.log(state.deviceId)
        var measures = state.measures
        for(var i = 0; i < measures.length; i++){
          console.log(measures[i])
        }  
      });
    })

  },

  /**
   * 断开WebSocket连接
   */
  closeLink: function () {
    wx.closeSocket({
      success: function (res) {
        console.log("websocket连接已关闭");
      }
    })
  }
})

