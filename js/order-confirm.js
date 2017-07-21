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
  receInfo();
  viewPri();

  var addrOne = $('#addrOne');
  var addrTwo = $('#addrTwo');
  var addrTree = $('#addrTree');
  citySelect.init(addrOne,addrTwo,addrTree);
});