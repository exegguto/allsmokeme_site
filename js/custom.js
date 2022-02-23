$(function () {
  var all_classes = "";
  var timer = undefined;
  $.each($('li', '.social-class'), function (index, element) {
    all_classes += " btn-" + $(element).data("code");
  });
  $('li', '.social-class').mouseenter(function () {
    var icon_name = $(this).data("code");
    if ($(this).data("icon")) {
      icon_name = $(this).data("icon");
    }
    var icon = "<i class='fa fa-" + icon_name + "'></i>";
    $('.btn-social', '.social-sizes').html(icon + "Sign in with " + $(this).data("name"));
    $('.btn-social-icon', '.social-sizes').html(icon);
    $('.btn', '.social-sizes').removeClass(all_classes);
    $('.btn', '.social-sizes').addClass("btn-" + $(this).data('code'));
  });
  $($('li', '.social-class')[Math.floor($('li', '.social-class').length * Math.random())]).mouseenter();
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var user = getCookie("akciy");
    if (user != "") {
	$("#visible-panel").show();
    } else {
	 $("#close-panel").show();
      setCookie("akciy", "true", 365);
    }
}

$('.carousel').carousel({
    interval: false
}) 
	
$(document).ready(function() {     
 $("input[name='phone']").inputmask("+7(999)9999999" ,{ clearMaskOnLostFocus: true });
});


$(document).ready(function() {     
 $("input[name='passport_1']").inputmask("9999/999999" ,{ clearMaskOnLostFocus: true });
});

$(document).ready(function() {     
 $("input[name='passport_3']").inputmask("99.99.9999" ,{ clearMaskOnLostFocus: true });
});


$(function() { 
	var $document = $(document); 
	var selector = '[data-rangeslider]'; 
	var $inputRange = $(selector);
	function valueOutput(element) { 
	var value = element.value; var output = element.parentNode.getElementsByTagName('output')[0]; output.innerHTML = value; }
	for (var i = $inputRange.length - 1; i >= 0; i--) { valueOutput($inputRange[i]); };
	$document.on('input', selector, function(e) { valueOutput(e.target); }); 
	$inputRange.rangeslider({ polyfill: false });
});   
   
$(function () {
$('.counter').countdown({until: +30,expiryText: '<script>$("#close-panel").hide();$("#visible-panel").show();</script>',layout: '<div class="desc"><div class="mask"></div><span class="image">{h10}</span><span class="image">{h1}</span><span class="text">часов</span></div><div class="desc"><div class="mask"></div><span class="image">{m10}</span><span class="image">{m1}</span><span class="text">минут</span></div><div class="desc"><div class="mask"></div><span class="image">{s10}</span><span class="image">{s1}</span><span class="text">секунд</span></div>'
});
});


$.validator.addMethod("minlenghtphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 10;
    },
    "Пожалуйста введите корректный номер телефона!");
$.validator.addMethod("requiredphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 1;
    },
    " Заполните это поле!");


 $('.form').each(function () {
    $(this).validate({
        rules: {
            name: {                
                required: true
            },
            phone: {
                minlenghtphone: true,
				requiredphone: true 
			
            }
        },
        showErrors: function(errorMap, errorList) {
 
          // Clean up any tooltips for valid elements
          $.each(this.validElements(), function (index, element) {
              var $element = $(element);
 
              $element.data("title", "") // Clear the title - there is no error associated anymore
                  .removeClass("error")
                  .tooltip("destroy");
          }); 
          // Create new tooltips for invalid elements
          $.each(errorList, function (index, error) {
              var $element = $(error.element);
 
              $element.tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                  .data("title", error.message)
                  .addClass("error")
                  .tooltip(); // Create a new tooltip based on the error messsage we just set in the title
          });
      },		
		submitHandler: function(form) { 	 
         $('.modal').modal('hide');        	 
         setTimeout(function(){$('#modalthx').modal('show')}, 900);			    
         form.submit();		  
        }
    });
});	


 $('.form_').each(function () {
    $(this).validate({
        rules: {
            name: {                
                required: true
            },
            phone: {
				required: true 
			
            }
        },
        showErrors: function(errorMap, errorList) {
 
          // Clean up any tooltips for valid elements
          $.each(this.validElements(), function (index, element) {
              var $element = $(element);
 
              $element.data("title", "") // Clear the title - there is no error associated anymore
                  .removeClass("error")
                  .tooltip("destroy");
          }); 
          // Create new tooltips for invalid elements
          $.each(errorList, function (index, error) {
              var $element = $(error.element);
 
              $element.tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                  .data("title", error.message)
                  .addClass("error")
                  .tooltip(); // Create a new tooltip based on the error messsage we just set in the title
          });
      },		
		submitHandler: function(form) {			
          
        }
    });
});	


  	
function calc() {
var amount = $('input[name="range_"]').val();
var interest_rate = $('input[name="percent"]').val();
var months = $('input[name="date"]').val();

var interest = (amount * (interest_rate * .01)) / months;
	var payment = ((amount / months) + interest).toFixed();
	payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

$('.result').html(payment); 
};