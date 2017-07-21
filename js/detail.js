jQuery(function($){
  function showImg(){
    var src=null;
    $('#imgSub').on('click', 'img', function(event) {
      src = $(this).prop('src');
      $('#imgMain').prop('src', src);
    });
  }
  function plusMinus(){
    var numChangeBtn = $('.num-change-btn');
    var plusEle = $('.change-btn-plus');
    var minusEle = $('.change-btn-minus');
    var storageEle = $('.goods-storage');
    var numEle = $('#buyNum');
    numChangeBtn.on('click', 'span', function(event) {
      var plugFlag=$(this).hasClass('change-btn-plus');
      var storage = parseInt(storageEle.text());
      var num=parseInt(numEle.val());

      if(plugFlag){//数量加一操作
        if(num >= storage){
          tool.tips("物品的数量超过限额!",1200); 
        }else{
          numEle.val(num+1);
        }
      }else{//数量减一操作
        if(num <= 1){
          tool.tips("物品的数量不能小于1!",1200);  
        }else{
          numEle.val(num-1);
        }
      }

      plugFlag = null;
      storage = null;
      num = null;
    });
  }
  plusMinus();
  showImg();
});