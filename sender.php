<? 
if (isset($_POST['token']) && isset($_POST['action'])) {
    $captcha_token = $_POST['token'];
    $captcha_action = $_POST['action'];
} else {
    die('Капча работает некорректно. Обратитесь к администратору!');
}
 
$url = 'https://www.google.com/recaptcha/api/siteverify';
$params = [
    'secret' => '6Lf_VnwUAAAAADbOkCHaV4DQQ00vAo-XmeGZG9B_',
    'response' => $captcha_token,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];
 
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 
$response = curl_exec($ch);
if(!empty($response)) $decoded_response = json_decode($response);
	
if ($decoded_response && $decoded_response->success && $decoded_response->action == $captcha_action && $decoded_response->score > 0.5) {
// Принимаем данные с формы 

$phone=str_replace(' ', '', $_POST['phone']);
$form_name=$_POST['form_name'];

// ----------------------------конфигурация-------------------------- //  
$adminemail="allsmokeme@yandex.ru";  // e-mail админа 
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$subject = "Новая заявка"; //Subject: 
$from_name = "Аренда кальяна"; //From:
$from_email = "zakaz@allsmokeme.ru"; //From:
$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
$headers .= "From: =?UTF-8?B?".base64_encode($from_name)."?= <".$from_email.">\r\n";
//---------------------------------------------------------------------- //  

$msg = "<br><p><strong>Заявка:</strong></p>";
$msg .="<p>Телефон: $phone  </p>\r\n";
$msg .="<p>Форма: $form_name  </p>\r\n";
$msg .= $utm;

// Отправляем письмо админу 
mail($adminemail, "=?UTF-8?B?".base64_encode($subject)."?=", $msg, $headers);  

// Отправляем смс
$ch = curl_init("http://sms.ru/sms/send");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_POSTFIELDS, array(
	"api_id"		=>	"2939ed5f-0f67-d974-258f-c97cda8ccd85",
	"to"			=>	"79833198853",
	"text"		=>	iconv("windows-1251","utf-8","$phone")
));
$body = curl_exec($ch);
curl_close($ch);

// Сохраняем в базу данных
$f = fopen("message.txt", "a+");
fwrite($f," \n $date $time $phone $form_name");
fclose($f);
}

exit; 
?>