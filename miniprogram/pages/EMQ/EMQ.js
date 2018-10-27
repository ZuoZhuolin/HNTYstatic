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
      console.log("连接已打开：");
      console.log(res);
      ws.onopen()
    })

    wx.onSocketMessage(function (res) {
      ws.onmessage(res)
    })

    var Stomp = require('../../utils/stomp.js').Stomp;

    // setInterval是用来发心跳包的，而小程序没有window对象
    Stomp.setInterval = function (interval, f) {
      return setInterval(f, interval);
    }
    Stomp.clearInterval = function (id) {
      return clearInterval(id);
    }
    // 全局
    stompClient = Stomp.over(ws);

    stompClient.connect(
      {
        // 目标聊天对象
        audienceId: "1"
      },
      function (frame) {
        var headers = frame.headers;
        if (headers['user-name']) {
          stompClient.subscribe(
            '/measure/instruId',
            function (data, headers) {
              console.log("服务器的消息：" + data.body);
              var body = JSON.parse(data.body);
              // 消息体
              console.log(body);
            }
          )
        } 
      }
    )

  },

  /**
   * 发送WebSocket消息
   */
  sendMessage: function () {
    var content = {
      // 消息内容
      msg: "没有为什么",
      // 聊天数据类型：0 文本 1 图片 2语音 3 其它文件
      // todo: 统一用户字符串，不能传数值类型
      type: "0"
    };
    stompClient.send("/chat", {}, JSON.stringify(content));
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
