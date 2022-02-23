var local = {
			"basket_is_empty" : "Корзина пуста", 
			"name" : "Название",
			"price" : "Цена",
			"all" : "Всего",
			"order" : "Оформить заказ",
			"basket" : "корзина",
			"num" : "кол-во",
			"send" : "Спасибо за покупку!\nМы свяжемся с Вами в ближайшее время",
			"goods" : "Товаров",
			"amount" : "на сумму"
			};
 
function WICard(obj, plugins){
	this.widjetX = 0;
	this.widjetY = 0;	
	this.widjetObj;
	this.widjetPos;
	this.cardID = "";
	this.DATA = {};
	this.IDS = [];
	this.objNAME = obj;
	this.CONFIG = {};
	this.IMG = "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABpFBMVEUAAABEREBEREBEREBEREASEhEJCQgGBgYBAQEAAAAGBgUHBwYAAAAAAAADAwNEREBEREAJCQkICAcGBgYFBQUJCQgnJyVEREAICAgBAQEAAAAICAcAAAAAAAAAAAAJCQgAAAAGBgYBAQEQEA8NDQwHBwcBAQEMDAsSEhEJCQkBAQEBAQEBAQFAQDxEREBEREADAwIAAAABAQESEhEkJCIAAAAICAgAAAAQEA9EREAAAAATExIAAAAKCgkNDQwAAAAAAAABAQETExIHBwcDAwMDAwMTExIAAAAAAAABAQEAAAAAAAAAAAAAAAAAAAAAAAADAwIAAAAGBgUBAQEWFhUAAAAAAAAHBwYBAQEVFRMDAwMHBwcUFBMWFhUBAQETExIAAAAAAAADAwMMDAsAAAAAAAASEhEAAAAUFBMAAAAJCQkrKygDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAJCQgAAAAiIiABAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQFEREAFBQUBAQEAAAAGBgYICAgHBwcBAQEJW8x2AAAAhXRSTlMAAQcIAjJ0kZqZnp+LaygNDxKw/v6wIwPY1A+upf4nenGWvXCg/Pubc8eSmLkcHxpW+vlhBr6hl3EDUl9pop5Q+fhe+1FPXVT8mlxfXWD9+1dbnPRRRved9ldI+Fhd+mBaVlSYWJN1V2dqwwVTA8ORvJXAknRzKii2rCjc3BUTqagrepgUbRZwswAAAAlwSFlzAAAASAAAAEgARslrPgAAAb1JREFUOMuNk2dTwkAQhpdiCZagotiwd5RYQeyKJdii2FDsvffeG0TJnza3lzg4kBnv0zt5NpvdZ3IA/zs6vUGv00wAxrj4hESGnERTkomk5JRU1swaFZ6WnhEMieSEgl9qsmRmWVWe/R2W8KkUjkw5uUr/vNhcEvPpLHEZGly0FYA8pb4wqMFFscioBzAU06lKSsvKKa+orKqmqYY1yB3smGvrHFx9A0mNTQ6uuQU7Oc1yB50Lc6uDc0ObXNHYTlIHfqmTJaZcmLvkpwDdPb19hAODkzjRlAuzpx93GhhEPsTjpF6gBTg1PyxnN4d8hHKJoQUhuhU/qvKxcWVTWmAPKlsLE5RP8qoJLND5vhQ/U9PIYWZWNcWgyTnFpH+ecoCFgNKTQZM+atK/qHI3txSg73gjTC6vIF9dw0nXhSiTG8g3eaEeJ92KMrlN+I4gSp5dkvaiTO4fAKwJ6PQQ4Og4wuQJ3fp070zZXzhJOafpAgsuQ2Gtf+4KC64tWtx2gybZW61/8g7QpPn+ITZ/fAI0yVqfX2wx+r8+gxVNkl3f3j+cnU4v3j4vSa73NwDrJ5qkt+f3Jv5N6u3Vvt0/UGcpYbC85ecAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMDUtMThUMDY6MDM6MzEtMDU6MDALk1CfAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTA1LTE4VDA2OjAzOjMxLTA1OjAwes7oIwAAAABJRU5ErkJggg==";
	
	this.init = function(widjetID, config){
		this.CONFIG = config || {};
		try {
			this.DATA = JSON.parse(localStorage.getItem(widjetID)); 
			if ($.isEmptyObject(this.DATA)){this.DATA = {};}
		}
		catch (e) {this.DATA = {};}
		try  {
			this.IDS = JSON.parse(localStorage.getItem(widjetID + "_ids"));
			if ($.isEmptyObject(this.IDS)){this.IDS = [];}
		}
		catch (e){this.IDS = [];}
		this.cardID = widjetID;	
		this.widjetObj = $("#" + widjetID);
		if ($.isEmptyObject(this.DATA)){
			this.widjetObj.html(local.basket_is_empty);
			}else{
				this.reCalc();this.renderBasketTable();
				}
	}
		
/***********************************************************************************************
 * example: onclick="cart.addToCart(this, '2', 'Name of comic 2', '25500')						
 **********************************************************************************************/
	this.addToCart = function(curObj, id, params){
		var kol = 1;
		if ( $("input").is("#" + wiNumInputPrefID + id) ){
			kol = parseInt( $("#" + wiNumInputPrefID + id).val() );	
		}
		id = ( $.isNumeric(id) ) ? "ID" + id.toString() : id;
		var id_ = ( $.isEmptyObject(params.subid) ) ? id : id + "_" + params.subid;
		var goodieLine = {"id" : id_, "name" : params.name, "price": params.price, "del": params.del, "num" : kol};
		var del_="ID" + params.del.toString();
		
		if ($.isEmptyObject(this.DATA)){
			this.DATA[id_] = goodieLine;
			this.IDS.push(id_);
		}else
			for(var idkey in this.DATA){
				if(this.DATA[idkey].id == del_){this.delItem(this.DATA[idkey].id);}
				if($.inArray(id_, this.IDS) === -1){
					this.DATA[id_] = goodieLine;
					this.IDS.push(id_)
				}else	
				if (idkey == id_){this.DATA[idkey].num += kol;}
			}
		
		localStorage.setItem(this.cardID, JSON.stringify(this.DATA));
		localStorage.setItem(this.cardID + "_ids", JSON.stringify(this.IDS));
		this.reCalc();
		
		this.renderBasketTable();
	}
	this.reCalc = function(){
		var num = 0;
		var sum = 0; 	
		for(var idkey in this.DATA) {
			num += parseInt(this.DATA[idkey].num);
			sum += parseFloat(parseInt(this.DATA[idkey].num) * parseFloat(this.DATA[idkey].price));
		}
		// *** currency plugin *** //
		
		if (typeof WICartConvert == 'function' ){sum = WICartConvert(sum);}
		// *** //
		this.widjetObj.html(local.goods + " " + num + " " + local.amount + " " + sum + " Руб.");
		localStorage.setItem(this.cardID, JSON.stringify(this.DATA));
	}
	this.renderBasketTable = function(){
		if ($('#btable').length == 0){		
			$("#kalyian").append(" \
				<div id='bcontainer' class='bcontainer'> \
				<div id='overflw'><table class='btable' id='btable'></table></div> \
				<h6>Итоговая цена: <span id='bsum'>...</span></h6> \
				<div id='bfooter'><button class='bbutton' onclick=\"cart.showWinow('order', 1)\">" + local.order + "</button></div> \
				</div> \
			");	
		}else{$("#btable").html("");}
		for(var idkey in this.DATA){
			with (this.DATA[idkey]){
				var productLine = '<tr class="bitem" id="wigoodline-' + id + '"> \
									<td><h6>' + name +'</h6></td> \
									<td><h6 id="basket_num_' + id + '" kol="'+num+'">' + num +'шт.</h6></td> \
									<span class="basket_num" id="basket_num_' + id + '">'+ num +'шт.</span> \
									<td id="linesum_' + id + '">'+ parseFloat(price * num) +'р.</td> \
									<td><a href="#" onclick="' + this.objNAME + '.delItem(\'' + id + '\'); return false;"><img src="data:image/jpeg;base64,'+ this.IMG + '" /></a></td> \
									</tr>';	
			}
			$("#btable").append(productLine);
		}
		//* кнопки +/-
/*		var self = this;
		for(var ids in this.IDS){
			$('#minus_' + this.IDS[ids]).bind("click", function() {
				var cartItemID =  $(this).attr("id").substr(6);
				var cartNum = parseInt($("#basket_num_" + cartItemID).text());
				var cartNum = (cartNum > 1) ? cartNum - 1 : 1;
				self.DATA[cartItemID].num = cartNum;
				
				$("#basket_num_" + cartItemID).html(cartNum);
				var price = parseFloat( $("#lineprice_" + cartItemID).html() );
				$("#linesum_" + cartItemID).html( parseFloat(price * cartNum) + 'р.' );
				
				self.sumAll();
				self.reCalc();
			});
			
			$('#plus_' + this.IDS[ids]).bind("click", function() {
				var cartItemID =  $(this).attr("id").substr(5);
				var cartNum = parseInt($("#basket_num_" + cartItemID).text());
				var cartNum = (cartNum < 1000000) ? cartNum + 1 : 1000000;
				self.DATA[cartItemID].num = cartNum;
				$("#basket_num_" + cartItemID).html(cartNum);
				var price = parseFloat( $("#lineprice_" + cartItemID).html() );
				$("#linesum_" + cartItemID).html( parseFloat(price * cartNum)  + ' руб.' );
				
				self.sumAll();
				self.reCalc();
			});
		}
*/		this.sumAll();	
	}
	this.minus = function(curObj, cartItemID){
		var cartNum = parseInt($("#basket_num_" + cartItemID).attr('kol'));
		var cartNum = (cartNum > 1) ? cartNum - 1 : 1;
		this.DATA[cartItemID].num = cartNum;
		this.renderBasketTable();
	}
	this.plus = function(curObj, cartItemID){
		var cartNum = parseInt($("#basket_num_" + cartItemID).attr('kol'));
		var cartNum = (cartNum < 1000000) ? cartNum + 1 : 1000000;
		this.DATA[cartItemID].num = cartNum;
		this.renderBasketTable();
	}
	this.sumAll = function(){
		var sum = 0;
		for(var idkey in this.DATA) { sum += parseFloat(this.DATA[idkey].price * this.DATA[idkey].num); }
		$("#bsum").html(sum + " руб.");	
	}
	this.DelAll = function(){
		for(var idkey in this.DATA){
			this.delItem(this.DATA[idkey].id);
		}
	}
	this.showWinow = function(win, blind)
		{

		}
	this.delItem = function(id){
		$("#btable").html("");
		delete this.DATA[id];
		this.IDS.splice( $.inArray(id, this.IDS), 1 );
		this.reCalc();
		this.renderBasketTable();
		localStorage.setItem(this.cardID, JSON.stringify(this.DATA));
		localStorage.setItem(this.cardID + "_ids", JSON.stringify(this.IDS));
		if (this.IDS.length == 0)
		this.widjetObj.html(local.basket_is_empty);	
	}
}

var priceList = {
	"1" : {"id" : "1", "subid" : {}, "name" : "Khalil Mamoon", "price" : "600", "del" : "0"},
	"2" : {"id" : "2", "subid" : {}, "name" : "Amy Deluxe", "price" : "700", "del" : "0"},
	"3" : {"id" : "3", "subid" : {}, "name" : "Craft Ginger Gypsy", "price" : "900", "del" : "0"},
	"4" : {"id" : "4", "subid" : {}, "name" : "Khalil Mamoon</br>Набор Всё включено", "price" : "1000", "del" : "1"},
	"5" : {"id" : "5", "subid" : {}, "name" : "Amy Deluxe</br>Набор Всё включено", "price" : "1200", "del" : "2"},
	"6" : {"id" : "6", "subid" : {}, "name" : "Craft Ginger Gypsy</br>Набор Всё включено", "price" : "1400", "del" : "3"},
	"7" : {"id" : "7", "subid" : {}, "name" : "Микс", "price" : "120", "del" : "0"},
	"8" : {"id" : "8", "subid" : {}, "name" : "Уголь 3шт", "price" : "30", "del" : "0"},
	"9" : {"id" : "9", "subid" : {}, "name" : "Плитка", "price" : "200", "del" : "0"},
	"10" : {"id" : "10", "subid" : {}, "name" : "Khalil Mamoon</br>Доп день", "price" : "500", "del" : "0"},
	"11" : {"id" : "11", "subid" : {}, "name" : "Amy Deluxe</br>Доп день", "price" : "600", "del" : "0"},
	"12" : {"id" : "12", "subid" : {}, "name" : "Craft Ginger Gypsy</br>Доп день", "price" : "700", "del" : "0"},
	"13" : {"id" : "13", "subid" : {}, "name" : "Калауд", "price" : "100", "del" : "14"},
	"14" : {"id" : "14", "subid" : {}, "name" : "Готовая фольга", "price" : "100", "del" : "13"},
	"15" : {"id" : "15", "subid" : {}, "name" : "Доставка", "price" : "300", "del" : "0"},
	"16" : {"id" : "16", "subid" : {}, "name" : "Забор", "price" : "200", "del" : "0"},
	"17" : {"id" : "17", "subid" : {}, "name" : "Доставка после 22:00", "price" : "200", "del" : "0"}
};

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

var cart;
var config;
var wiNumInputPrefID;

$(document).ready(function(){  
    cart = new WICard("cart");
    config = {'clearAfterSend':true, 'showAfterAdd':false};
    
    cart.init("basketwidjet1", config);

	cart.DelAll();
	cart.addToCart(this, '6', priceList['6']);

	$("input[name='phone']").inputmask("+7(999)9999999" ,{ clearMaskOnLostFocus: true });
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



$('.bord input').on('input keyup', function(e) {
	var id = '0', num_ = "";
	if($(this).attr('id') == "num_miks"){add('7', $('#num_miks').val());}
	if($(this).attr('id') == "num_ygol"){add('8', $('#num_ygol').val());}
	if($(this).attr('id') == "num_days"){
		for (var i = 1; i <= 3; i++) {
			var b = i + 3;
			if($('#basket_num_ID' + i).attr('kol') || $('#basket_num_ID' + b).attr('kol')){add(i + 9, parseInt($('#num_days').val())-1);}
	}}
});

function add(id,num_){
	if(!$('#basket_num_ID'+id).attr('kol')){cart.addToCart(this, id, priceList[id]);}else
		if($('#basket_num_ID'+id).attr('kol') > num_ && num_==0){cart.delItem('ID'+id);}
	while($('#basket_num_ID'+id).attr('kol') != num_){
		if($('#basket_num_ID'+id).attr('kol') < num_){cart.plus(this, 'ID'+id);}else
			if($('#basket_num_ID'+id).attr('kol') > num_){cart.minus(this, 'ID'+id);}
	}
}

$("input[name=optionsRadios]").on( "click", function() {
	if($("#optionsRadios1").prop("checked")){cart.delItem('ID13');cart.delItem('ID14');}else
		if($("#optionsRadios2").prop("checked")){cart.addToCart(this, '13', priceList['13']);}else
			if($("#optionsRadios3").prop("checked")){cart.addToCart(this, '14', priceList['14']);}
});

$("#plitka").on( "click", function() {if($("#plitka").prop("checked")){cart.addToCart(this, '9', priceList['9']);}else{cart.delItem('ID9');}});
$("#dostavka").on( "click", function() {if($("#dostavka").prop("checked")){cart.addToCart(this, '15', priceList['15']);}else{cart.delItem('ID15');}});
$("#zabor").on( "click", function() {if($("#zabor").prop("checked")){cart.addToCart(this, '16', priceList['16']);}else{cart.delItem('ID16');}});
$("#dostavka2").on( "click", function() {if($("#dostavka2").prop("checked")){cart.addToCart(this, '17', priceList['17']);}else{cart.delItem('ID17');}});

$('.carousel .btn').click(function(){
	if ( $(this).hasClass("btnKM") ) {
		$('.kalyian').html('<h6><img src="images/slider/amy.jpg" alt="Египетские кальяны Khalil Mamoon (Халил Мамун)"/>Khalil Mamoon</h6>');
		$('.kalyiancena').html('<h4>Цена: 1000 сутки</h4><button type="button" class="btn btn-success btnAllinKM" autocomplete="off">Добавить</button>');
		$('.btnAllinKM').on('click',function(){cart.addToCart(this, '4', priceList['4']);});
	}
	if ( $(this).hasClass("btnAMY") ) {
		$('.kalyian').html('<h6><img src="images/slider/amy.jpg" alt="Немецкий кальян Amy Deluxe"/>Amy Deluxe</h6>');
		$('.kalyiancena').html('<h4>Цена: 1200 сутки</h4><button type="button" class="btn btn-success btnAllinAmy" autocomplete="off">Добавить</button>');
		$('.btnAllinAmy').on('click',function(){cart.addToCart(this, '5', priceList['5']);});
	}
	if ( $(this).hasClass("btncraft") ) {
/*		$('.btnAMY').html('Выбрать');
		$('.btnKM').html('Выбрать');
		$('.btncraft').html('Выбран');
		$('.btnAMY').removeClass('active');
		$('.btnKM').removeClass('active');
		$('.btnAMY').attr('aria-pressed', 'false');
		$('.btnKM').attr('aria-pressed', 'false');
*/		$('.kalyian').html('<h6><img src="images/slider/craft.jpg" alt="Новосибирские кальяны Craft Ginger Gypsy"/>Craft Ginger Gypsy</h6>');
		$('.kalyiancena').html('<h4>Цена: 1400 сутки</h4><button type="button" class="btn btn-success btnAllinCraft" autocomplete="off">Добавить</button>');
		$('.btnAllinCraft').on('click',function(){cart.addToCart(this, '6', priceList['6']);});
	}
});