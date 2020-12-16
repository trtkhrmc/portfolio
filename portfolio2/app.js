$(function(){
  
  
  $(window).on('load scroll', function(){
    var value = $(this).scrollTop();
      if($(window).width()>768)
        if (value > $('.mv').outerHeight()){
          $('.header').addClass('fixed')
        }else{
          $('.header').removeClass('fixed')
        }
  });

  $(".slider").slick({
  autoplay: true,
  autoSpeed: 2000,
  speed: 1000,
  fade: true,
  cssEase: 'linear'
  });

  //ハンバーガメニュー
  $('.burger-btn').on('click',function(){
    $('.header-nav').fadeToggle(300);
    $('.burger-btn').toggleClass('cross');
    $('body').toggleClass('noscroll');
  });


});



