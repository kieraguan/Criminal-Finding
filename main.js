
$(document).ready(function(){
	"use strict";

	var window_width 	 = $(window).width(),
	window_height 		 = window.innerHeight,
	header_height 		 = $(".default-header").height(),
	header_height_static = $(".site-header.static").outerHeight(),
	fitscreen 			 = window_height - header_height;


	$(".fullscreen").css("height", window_height)
	$(".fitscreen").css("height", fitscreen);

     
     // -------   Active Mobile Menu-----//

    $(".menu-bar").on('click', function(e){
        e.preventDefault();
        $("nav").toggleClass('hide');
        $("span", this).toggleClass("lnr-menu lnr-cross");
        $(".main-menu").addClass('mobile-menu');
    });
     
    $('select').niceSelect();
    $('.img-pop-up').magnificPopup({
        type: 'image',
        gallery:{
        enabled:true
        }
    });

    $('.active-feature-carousel').owlCarousel({
        items:1,
        loop:true,
        center:true
    });
    $("#img_input").on("change", function(e){

        var file = e.target.files[0]; //获取图片资源
      
        // 只选择图片文件
        if (!file.type.match('image.*')) {
          return false;
        }
      
        var reader = new FileReader();
      
        reader.readAsDataURL(file); // 读取文件
      
        // 渲染文件
        reader.onload = function(arg) {
      
          var img = '<img class="preview" src="' + arg.target.result + '" alt="preview"/>';
          $(".preview_box").empty().append(img);
        }
    });
    // function sendimage(form){
    //     var s3 = new AWS.S3({
    //         apiVersion: '2006-03-01',
    //         params: { Bucket: "likely-criminals" }
    //     });
    
    //     var files = document.getElementById('img_input').files;
    //     if (!files.length) {
    //         return alert('Please choose a file to upload first.');
    //     }
    //     var file = files[0];
    //     var fileName = insertedTimeStamp + ".jpg";
    // }
    $("#img_input_database").on("change", function(e){

        var file = e.target.files[0]; //获取图片资源
      
        // 只选择图片文件
        if (!file.type.match('image.*')) {
          return false;
        }
      
        var reader = new FileReader();
      
        reader.readAsDataURL(file); // 读取文件
      
        // 渲染文件
        reader.onload = function(arg) {
      
          var img = '<img class="preview" src="' + arg.target.result + '" alt="preview"/>';
          $(".preview_box").empty().append(img);
        }
    });
      



    // Add smooth scrolling to Menu links
    $('.play-btn').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    $(document).ready(function() {
        $('#mc_embed_signup').find('form').ajaxChimp();
    });    


    
        var form = $('#myForm'); // contact form
        var submit = $('.submit-btn'); // submit button
        var aler = $('.alert-msg'); // alert div for show alert message

        // form submit event
        form.on('submit', function(e) {
            e.preventDefault(); // prevent default form submit

            $.ajax({
                url: 'mail.php', // form action url
                type: 'POST', // form submit method get/post
                dataType: 'html', // request type html/json/xml
                data: form.serialize(), // serialize form data
                beforeSend: function() {
                    aler.fadeOut();
                    submit.html('Sending....'); // change submit button text
                },
                success: function(data) {
                    aler.html(data).fadeIn(); // fade in response data
                    form.trigger('reset'); // reset form
                    submit.attr("style", "display: none !important");; // reset submit button text
                },
                error: function(e) {
                    console.log(e)
                }
            });
        });  

 });
