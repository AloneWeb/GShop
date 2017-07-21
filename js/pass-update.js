jQuery(function($){
  function updateCheck(){
    var oldPass;
    var newPass;
    var rePass;
    var msgTextEle = $('#errmsg-text');
    var msgEle = $('#msg');

    function printMsg(msgEle,msgTextEle,msg){
      msgEle.removeClass('hidden');
      msgTextEle.text(msg);
    }
      
    $('#updatePassBtn').click(function(event) {
      oldPass = $.trim($('#oldPass').val());
      newPass = $.trim($('#newPass').val());
      rePass = $.trim($('#rePass').val());
      if(oldPass.length===0){
        printMsg(msgEle,msgTextEle,"密码不能为空!");
      }else if(newPass.length<4 || newPass.length>16){
        printMsg(msgEle,msgTextEle,"密码必须为4-16个字符!");
      }else if(newPass!==rePass){
        printMsg(msgEle,msgTextEle,"密码不相等!");
      }else{
        $(this).html("正在修改 <i class='fa fa-spinner fa-pulse fa-fw'></i>").attr('disabled','disabled').addClass('g-btn-ban');
        $.ajax({
          url: '/api/update-pass',
          type: 'POST',
          dataType: 'json',
          success:function(data){
            if(data===true){
              msgEle.addClass('hidden');
              $('#updatePassBtn').html("修改成功<i class='fa fa-fw fa-check'></i>");
              console.log('密码重置成功!');
            }else{
              $('#updatePassBtn').text('修改密码').removeProp('disabled').removeClass('g-btn-ban');
              printMsg(msgEle,msgTextEle,"密码错误!");
            }
          }
        })
        .fail(function() {
          $('#updatePassBtn').text('修改密码').removeProp('disabled').removeClass('g-btn-ban');
          printMsg(msgEle,msgTextEle,"请求错误!密码修改失败!");
        });
      }
    });
  }
  updateCheck();
});