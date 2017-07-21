jQuery(function($){

  var regJug=(function(){//注册界面验证的封装

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
    function passJug(val){//密码判断
      if(ver.limitLength(val,4,16)){
        return [true,'ok'];
      }else{
        return [false,'密码必须为4-16个字符!'];
      }
    }
    function repassJug(a,b){//确认密码判断
      if(ver.comparNum(a,b)){
        return [true,'ok'];
      }else{
        return [false,'密码不相等!'];
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
      passJug:passJug,
      repassJug:repassJug,
      telJug:telJug,
      emailJug:emailJug,
      questionJug:questionJug,
      answerJug:answerJug
    }
  })();

  function regCheck(){
    var regBtn=$('#regBtn');
    var msgTextEle=$('#errmsg-text');
    var msgEle=$('#msg');
    var userNameEle=$('#userName');
    var realNameEle=$('#realName');
    var userPassEle=$('#userPass');
    var rePassEle=$('#rePass');
    var telEle=$('#tel');
    var emailEle=$('#email');
    var quesEle=$('#question');
    var answerEle=$('#answer');
    var vals=[];//保存用户输入到input的value值的数组
    var jugRes=null;//判断结果
    var flag=null;//判断表达是否提交的标识

    // 所有的判断函数的数组 
    var judgmentFuns=[
      regJug.userJug,
      regJug.realNameJug,
      regJug.passJug,
      regJug.repassJug,
      regJug.telJug,
      regJug.emailJug,
      regJug.questionJug,
      regJug.answerJug
    ];
    //打印判断之后的提示信息 方法
    function printMsg(msgEle,msgTextEle,msg){
      msgEle.removeClass('msg-hidden').addClass('msg');
      msgTextEle.text(msg);
    }
    //绑定到提交按钮的click事件上
    regBtn.on('click', function(event) {
      vals=[//保存用户输入的数组
        userNameEle.val(),
        realNameEle.val(),
        userPassEle.val(),
        rePassEle.val(),
        telEle.val(),
        emailEle.val(),
        quesEle.val(),
        answerEle.val()
      ];
      //判断函数与用户输入的值进行一一对应验证
      for(var i=0;i<vals.length;i++){
        if(i===3){//密码确认 和其他判断不一样 需要而外处理
          jugRes=judgmentFuns[i](vals[i],vals[i-1]);
        }else{
          jugRes=judgmentFuns[i](vals[i]);
        }
        if(!jugRes[0]){
          printMsg(msgEle,msgTextEle,jugRes[1]);
          flag=false;
          break;//从上到下判断 不符合要求返回false 并且直接跳出
        }else{
          flag=true;
        }
      }
      return flag;
    });
  };

  regCheck();
});