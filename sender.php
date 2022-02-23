
<? 
// ----------------------------конфигурация-------------------------- //  
$adminemail="ovovan.fsb@yandex.ru";  // e-mail админа 
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$subject = "Новая заявка"; //Subject: 
$from_name = "Аренда кальяна"; //From:
$from_email = "zakaz@allsmokeme.ru"; //From:
$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
$headers .= "From: =?UTF-8?B?".base64_encode($from_name)."?= <".$from_email.">\r\n";
//---------------------------------------------------------------------- //  

// Принимаем данные с формы  
$phone=$_POST['phone'];
$form_name=$_POST['form_name'];
$name=$_POST['name'];

$msg = "<br><p><strong>Заявка:</strong></p>";
$msg .="<p>Телефон: $phone  </p>\r\n";
$msg .="<p>Форма: $form_name  </p>\r\n";
$msg .= $utm;

if ($name==null){
 // Отправляем письмо админу 
mail($adminemail, "=?UTF-8?B?".base64_encode($subject)."?=", $msg, $headers);  

// Отправляем смс
$ch = curl_init("http://sms.ru/sms/send");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_POSTFIELDS, array(

	"api_id"		=>	"2939ed5f-0f67-d974-258f-c97cda8ccd85",
	"to"			=>	"79232437075",
	"text"		=>	iconv("windows-1251","utf-8","$phone")

));
$body = curl_exec($ch);
curl_close($ch);
}
ELSE {$name="Bot";}

// Сохраняем в базу данных  
$f = fopen("message.txt", "a+");  
fwrite($f," \n $name $date $time $phone $form_name");  
fclose($f);   

exit; 
?>