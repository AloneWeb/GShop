jQuery(function($){
  function receInfo(){
    $('.rece-info').on('click', '.rece-info-show', function(event) {
      $('.rece-info-show').attr('data-check', 'false');
      if(!$(this).hasClass('rece-info-empty')){
        $(this).attr('data-check', 'true');
      }
    });
  }
  function viewPri(){
    var sum=0;
    $('.list-pri').each(function(index, el) {
      sum += parseInt($(this).text());
    });
    $('#totalPri').text(sum);
  }
  // 提交检查
  function submitOrderCheck(){
    $('.submit-order').click(function(event) {
      var addrArr = $('.rece-info-show');
      var flag = false;
      addrArr.each(function(index, el) {
        if($(this).attr('data-check') === 'true'){
          flag =flag||true;
        }
      });
      if(flag===false){
        tool.tips('请选择收货地址！',1200);
      }
      return flag;
    });
  }

  receInfo();
  viewPri();
  submitOrderCheck();

  //初始化地址三级联动
  var addrOne = $('#addrOne');
  var addrTwo = $('#addrTwo');
  var addrTree = $('#addrTree');
  citySelect.init(addrOne,addrTwo,addrTree);
});