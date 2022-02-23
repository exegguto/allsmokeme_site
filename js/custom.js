$('.carousel').carousel({
    interval: false
}) 

$(document).ready(function(){
	$('#modal18').modal('show');
});

window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.phone'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___-____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
		if(i==2 && val!="79"){
			val="7";
			new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
		}
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
		if(i==-1) $(this).removeClass("is-invalid").addClass('is-valid'); else $(this).removeClass("is-valid").addClass('is-invalid');
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5){  this.value = ""; $(this).removeClass("is-invalid"); $(this).removeClass("is-valid");}
		}

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
  });

});
$(".form").submit(function (e) { // Устанавливаем событие отправки для формы с id=form
	if($(this).find('input').hasClass("is-invalid")) {return false;}
	e.preventDefault();
	var form_data = $(this).serialize(); // Собираем все данные из формы
	$.ajax({
		type: "POST", // Метод отправки
		url: "sender.php", // Путь до php файла отправителя
		data: form_data,
		success: function () {
        // Код в этом блоке выполняется при успешной отправке сообщения
		$('.modal').modal('hide');
			setTimeout(function(){$('#modalthx').modal('show')}, 900);
		}
	});
});
/*калькулятор аутсорсинга*/
var a=2;
var b=3;
var sum=0;
var matrix = [ 
2000,
3000,
3600,
4800,
5000,
6000,
7000,
8000,
8100,
9000,
9900,
10800,
10400,
11200,
12000,
12800,
15300,
16200,
17100,
18000,
19950,
20900,
21850,
22800,
23750,
26000,
27000,
28000,
29000,
30000,
32550,
33600,
34650,
35700,
36750,
39600,
40700,
41800,
42900,
44000];
function summ() {
	if(b<=3){sum=b*matrix[a-1]/1.5;}else{
		if(b<12){
			sum=b*matrix[a-1]/1.5*0.9;
			document.getElementById('kal4').innerHTML="<b>Скидка 10%</b>";
		}else{
			if(b<24){
				sum=b*matrix[a-1]/1.5*0.8;
				document.getElementById('kal4').innerHTML="<b>Скидка 20%</b>";
			}else{
				sum=b*matrix[a-1]/1.5*0.7;
				document.getElementById('kal4').innerHTML="<b>Скидка 30%</b>";
			}
		}
	}
	document.getElementById('kal5').innerHTML=sum/a/b*1.5+" руб. </b>";
	document.getElementById('kal3').innerHTML="<b>"+sum+" руб. </b>";
}

$('#ex1').slider({
	formatter: function(value) {
		document.getElementById('kal1').innerHTML="<b>"+value+" </b>";
		a=value;
		summ();
		return;
	}
});
$('#ex2').slider({
	formatter: function(value) {
		document.getElementById('kal2').innerHTML="<b>"+value+" </b>";
		b=value;
		summ();
		return;
	}
});

$('#modal18').on('shown.bs.modal', function () { /*отмена прокрутки в 18+*/
  $('html').css('overflow','hidden');
}).on('hidden.bs.modal', function() {
  $('html').css('overflow','auto');
});

$(".navbar-collapse a").click(function(e) {
  //если она не имеет класс dropdown-toggle
	
	if ($(".navbar-collapse").hasClass("show")) {
    //то закрыть меню
		var headerHeight = $('.navbar').outerHeight();
		$("html, body").stop().animate({scrollTop: $($(this).attr("href")).offset().top-headerHeight+"px"});
		$(".navbar-collapse").collapse('hide');
	}
});

/*flamp*/
!function(d,s){var js,fjs=d.getElementsByTagName(s)[0];js=d.createElement(s);js.async=1;js.src="//widget.flamp.ru/loader.js";fjs.parentNode.insertBefore(js,fjs);}(document,"script");
/*капча*/
let captcha_action = 'send_bottom';
grecaptcha.ready(function() {
	grecaptcha.execute('6Lf_VnwUAAAAAHlvvPfxDTIczcBLgmGORPcW3gcr', {action: captcha_action})
	.then(function(token) {
		if (token) {
			document.querySelectorAll('.token')[0].value = token;
			document.querySelectorAll('.token')[1].value = token;
			document.querySelectorAll('.action')[0].value = captcha_action;
			document.querySelectorAll('.action')[1].value = captcha_action;
		}
	});
});
/*карусель*/
$("#carousel-example-generic").carousel();
/*vk
VK.Widgets.Group("vk_groups", {mode: 4, wide: 1, height: 500}, 158300461);

(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//vk.com/js/api/openapi.js?146"; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'vk_openapi_js'));
(function() {if (!window.VK || !VK.Widgets || !VK.Widgets.Post || !VK.Widgets.Post("vk_post_396679679_2", 396679679, 8, 'B1Jt2531rmVqUlZ9zvyeLvU_dY6b')) setTimeout(arguments.callee, 50);}());
(function() {if (!window.VK || !VK.Widgets || !VK.Widgets.Post || !VK.Widgets.Post("vk_post_396679679_9", 396679679, 9, 'xlQNOJM-jJWEr-7q6gdkmR-RTrK3')) setTimeout(arguments.callee, 50);}());
(function() {if (!window.VK || !VK.Widgets || !VK.Widgets.Post || !VK.Widgets.Post("vk_post_396679679_10", 396679679, 10, 'DmrvSQHBtLcuSb2ozjjGjMK8UHAc')) setTimeout(arguments.callee, 50);}());
*/

/*JIVOSITE CODE
(function(){ var widget_id = 'yjdN9232UM';var d=document;var w=window;function l(){var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;s.src = '//code.jivosite.com/script/widget/'+widget_id; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);}if(d.readyState=='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();


$('[data-toggle="tooltip"]').tooltip();*/