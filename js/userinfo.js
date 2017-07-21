jQuery(function($){
  //改变显示界面
  function changeShow(){
    var editBtn = $('#edit-btn');
    var saveCanelBtns = $('#save-cancel-btns');
    var cancelBtn = $('#cancel-btn')
    var infoShow = $('.info-show');
    var infoEdit = $('.info-edit');
    var msgEle = $('#msg');
    //编辑按钮
    editBtn.on('click', function(event) {
      $(this).addClass('hidden');
      saveCanelBtns.removeClass('hidden');
      infoShow.addClass('hidden');
      infoEdit.removeClass('hidden');

      //设置input 和 select的值
      infoShow.each(function(index, el) {
        var input = $(this).next('.info-edit').children('input')[0];
        if(input){
          $(input).val($(this).text());
        }
        var selectEle = $(this).next('.info-edit').children('select')[0];
        if(selectEle){
          $(selectEle).val($(this).text());
        }
        input = null;
      });
    });
    //取消按钮
    cancelBtn.on('click', function(event) {
      editBtn.removeClass('hidden');
      saveCanelBtns.addClass('hidden');
      infoShow.removeClass('hidden');
      infoEdit.addClass('hidden');
      msgEle.addClass('hidden');
    });
  }

  //信息验证
  var editJug=(function(){

    function userJug(val){//用户名判断
      if(ver.limitLength(val,4,16)){
        return [true,'ok'];//成功时返回的数组 ok没有意义
      }else{
        return [false,'用户名必须为4-16个字符!'];//失败时返回的数组 内容有结果和提示
      }
    }
    function realNameJug(val){//真实姓名判断
      if(ver.checkNull(val)){
        return [false,"真实姓名不能为空!"];
      }else if(!ver.isZhAndChar(val)){
        return [false,"请输入正确的姓名!"];
      }else{
        return [true,'ok'];
      }
    }
    function telJug(val){//手机号码判断
      if(ver.isTel(val)){
        return [true,'ok'];
      }else{
        return [false,'手机号码格式不正确!'];
      }
    }
    function emailJug(val){//email判断
      if(ver.isEmail(val)){
        return [true,'ok'];
      }else{
        return [false,'电子邮箱格式不正确!'];
      }
    }
    function questionJug(val){//密保问题判断
      if(ver.checkNull(val)){
        return [false,'密保问题不能为空!'];
      }else{
        return [true,'ok'];
      }
    }
    function answerJug(val){//密保答案判断
      if(ver.checkNull(val)){
        return [false,'密保答案不能为空!'];
      }else{
        return [true,'ok'];
      }
    }
    //暴露接口
    return {
      userJug:userJug,
      realNameJug:realNameJug,
      telJug:telJug,
      emailJug:emailJug,
      questionJug:questionJug,
      answerJug:answerJug
    }
  })();
  //校验
  function editCheck(){
    var regBtn=$('#regBtn');
    var msgTextEle=$('#errmsg-text');
    var msgEle=$('#msg');
    var userNameEle=$('#userName');
    var realNameEle=$('#realName');
    var telEle=$('#tel');
    var emailEle=$('#email');
    var quesEle=$('#question');
    var answerEle=$('#answer');
    var vals=[];//保存用户输入到input的value值的数组
    var jugRes=null;//判断结果
    var flag=null;//判断表达是否提交的标识

    // 所有的判断函数的数组 
    var judgmentFuns=[
      editJug.userJug,
      editJug.realNameJug,
      editJug.telJug,
      editJug.emailJug,
      editJug.questionJug,
      editJug.answerJug
    ];
    //打印判断之后的提示信息 方法
    function printMsg(msgEle,msgTextEle,msg){
      msgEle.removeClass('hidden');
      msgTextEle.text(msg);
    }
    //绑定到提交按钮的click事件上
    regBtn.on('click', function(event) {
      vals=[//保存用户输入的数组
        userNameEle.val(),
        realNameEle.val(),
        telEle.val(),
        emailEle.val(),
        quesEle.val(),
        answerEle.val()
      ];
      //判断函数与用户输入的值进行一一对应验证
      for(var i=0;i<vals.length;i++){
        jugRes=judgmentFuns[i](vals[i]);
        if(!jugRes[0]){
          printMsg(msgEle,msgTextEle,jugRes[1]);
          flag=false;
          break;//从上到下判断 不符合要求返回false 并且直接跳出
        }else{
          msgEle.addClass('hidden');
          flag=true;
        }
      }
      return flag;
    });
  }
  editCheck();
  changeShow();
});