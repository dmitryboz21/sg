function setAspectRatioClass() {
   var innerW = window.innerWidth;
   var innerH = window.innerHeight;
   var ratio = innerH / innerW * 100;

   $('body').removeClass(['body-ratio-type--1', 'body-ratio-type--2', 'body-ratio-type--3', 'body-ratio-type--mob-1',
      'body-ratio-type--mob-2',
      'body-ratio-type--mob-3',
      'body-ratio-type--mob-4',
      'body-ratio-type--mob-5']);


   /* if(ratio>56){
       $('body').addClass('body-ratio-type--0');
       //0
    }else if(ratio<=56 && ratio>54){
       $('body').addClass('body-ratio-type--1');
       //0*/


   if (ratio > 54) {
      $('body').addClass('body-ratio-type--1');
      //0
   } else if (ratio <= 54 && ratio >= 49.5) {
      $('body').addClass('body-ratio-type--2');
      //1 329 / 2 650 = 0,50150943396
   }
   else {
      $('body').addClass('body-ratio-type--3');
      //657 / 1 366 = 0,48096632503
   }

   //console.log(ratio);
   if (ratio > 200) {
      $('body').addClass('body-ratio-type--mob-1');
      //0
   } else if (ratio <= 200 && ratio > 172) {
      $('body').addClass('body-ratio-type--mob-2');
      //1 329 / 2 650 = 0,50150943396
   } else if (ratio <= 172 && ratio > 160) {
      $('body').addClass('body-ratio-type--mob-3');
      //1 329 / 2 650 = 0,50150943396
   } else if (ratio <= 160 && ratio > 148) {
      $('body').addClass('body-ratio-type--mob-4');
      //1 329 / 2 650 = 0,50150943396
   }
   else {
      $('body').addClass('body-ratio-type--mob-5');
      //657 / 1 366 = 0,48096632503
   }


}

$(document).ready(function () {
   // $("input[name='phone']").mask(" +7 (999) 999-99-99");
   //$('body').on('click',function(){
   //  });


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

   /*$('.animated-bg__art').addClass('animated-bg__art--activated');
   $('.animated-bg__text-container').addClass('animated-bg__text-container--activated');

   $('.main-content').addClass('main-content--active');

   $('.sidebar').addClass('sidebar--active');

   $('.main-block').addClass('main-block--active');*/



   setAspectRatioClass();

   $(window).on('resize', function () {
      setAspectRatioClass();
   });


   $('body').on('click', '.js-sb-accordion .sb-accordion-top', function () {
      $(this).parent().toggleClass('sb-accordion--active');
      $(this).siblings('.sb-accordion-main').stop(true).slideToggle(300);
   });

   $('.js-sidebar-scroll').each(function () {
      new SimpleBar($(this)[0], { autoHide: false });
   });
   $('.js-main-block-scroll').each(function () {
      new SimpleBar($(this)[0], { autoHide: false });
   });


   $('.sh-burger').on('click', function () {
      $(this).toggleClass('sh-burger--active');
      $('.sidebar').toggleClass('sidebar--mob-opened');
   });


   $('body').on('click', '.js-geog-map-point', function () {
      console.log('click');
      var href = $(this).attr('data-href');
      var anchor = '';
      loadPage(href, function () {
         setTimeout(() => {
            if (href.includes('?')) {
               anchor = href.match(/#(.+?)[\?]/)[1];
            }
            else {
               anchor = href.match(/#(.*)/)[1];
            }
            var el = $('#' + anchor);

            console.log(anchor);
            console.log(el.length);

            if (el.length > 0) {
               $('.main-block__inner .simplebar-content-wrapper').stop(true).animate({ scrollTop: (el.offset().top - $('.main-block__inner').offset().top - 15) + "px" }, 500);
               //.scrollTop(el.offset().top - $('.main-block__inner').offset().top, 1000);
            }
         }, 300);

      });
      /*
      console.log('href');
      var href=$(this).attr('data-href');
      var anchor = document.createElement('a');
      anchor.classList.add('js-change-page');
      anchor.href = href;
      //anchor.target="_blank";
      $(anchor).trigger('click');*/
      //  $(anchor).remove();

   });


   $('body').on('click', '.js-change-page', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var url = $(this).attr('href');
      console.log(url);
      loadPage(url, function () { });
   });

   function loadPage(url, callbackF) {
      var prefix_for_links = '';

      if (document.location.href.indexOf('github.io') !== -1) {
         prefix_for_links = '/build';
      }


      $.ajax({
         url: prefix_for_links + url,
         method: 'GET',
         dataType: 'html',
         //data: {text: 'Текст'},
         beforeSend: function () {
            $('.main-block').addClass('main-block--ajax-loading');
         },
         success: function (data, status, jqXHR) {

            var mainBlockInner = $(data).find('.js-main-block-scroll');
            setTimeout(() => {
               $('.main-block').html(mainBlockInner);
               $('.js-main-block-scroll').each(function () {
                  new SimpleBar($(this)[0], { autoHide: false });
               });
               $('.main-block').removeClass('main-block--ajax-loading');
               callbackF();
            }, 500);
            console.log(data);
            console.log(status);
            console.log(jqXHR);

         },
         error: function (data, status, err) {
            console.log(data);
            console.log(status);
            console.log(err);
         }

      });
   }
});

