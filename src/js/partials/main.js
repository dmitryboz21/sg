function setAspectRatioClass(){
   var innerW=window.innerWidth;
   var innerH=window.innerHeight;
   var ratio=innerH/innerW*100;

   $('body').removeClass(['body-ratio-type--1','body-ratio-type--2','body-ratio-type--3']);


  /* if(ratio>56){
      $('body').addClass('body-ratio-type--0');
      //0
   }else if(ratio<=56 && ratio>54){
      $('body').addClass('body-ratio-type--1');
      //0*/


   if(ratio>54){
      $('body').addClass('body-ratio-type--1');
      //0
   }else if(ratio<=54 && ratio>=49.5){
      $('body').addClass('body-ratio-type--2');
      //1 329 / 2 650 = 0,50150943396
   }
   else{
      $('body').addClass('body-ratio-type--3');
      //657 / 1 366 = 0,48096632503
   }



}

$(document).ready(function () {
   // $("input[name='phone']").mask(" +7 (999) 999-99-99");
  //$('body').on('click',function(){
      setTimeout(() => {
      $('.animated-bg__art').addClass('animated-bg__art--activated');
      $('.animated-bg__text-container').addClass('animated-bg__text-container--activated');

      setTimeout(() => {
         $('.main-content').addClass('main-content--active');
         setTimeout(() => {
            $('.sidebar').addClass('sidebar--active');
            setTimeout(() => {
               $('.main-block').addClass('main-block--active');
            }, 700);
         }, 400);
      }, 1400);
   }, 600);

 //  });



   setAspectRatioClass();

   $(window).on('resize',function(){
      setAspectRatioClass();
   });


   $('body').on('click', '.js-sb-accordion .sb-accordion-top',function(){
      $(this).parent().toggleClass('sb-accordion--active');
      $(this).siblings('.sb-accordion-main').stop(true).slideToggle(300);
   });

   $('.js-sidebar-scroll').each(function(){
      new SimpleBar($(this)[0],{ autoHide: false });
   });
   $('.js-main-block-scroll').each(function(){
      new SimpleBar($(this)[0],{ autoHide: false });
   });
});

