jQuery(function($){
  $('.order-cancel-btn').on('click', function(event) {
     var con = confirm("确认取消订单？");
     //通过ajax进行取消
     if(con){
      $.ajax({
        url: '/api/cancelOrder',
        type: 'POST',
        timeout:5000,//超时时间5s
        dataType: 'json',
      })
      .done(function() {
        $('#order-detail-btns').addClass('hidden');
        $('#pay-status').text('已取消');
      })
      .fail(function(o) {
        alert('取消失败!错误码:'+o.status);
        console.log('错误码:'+o.status);
      });
     }
  });
});