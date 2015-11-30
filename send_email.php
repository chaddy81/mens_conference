<?php
require 'vendor/autoload.php';

$sendgrid_username = $_ENV['SENDGRID_USERNAME'];
$sendgrid_password = $_ENV['SENDGRID_PASSWORD'];
$to                = $_ENV['SEND_MAIL_TO'];

if (!empty($_POST)) {
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $message = $_POST['message'];

  $msg = "$email <br /> $phone <br /> $message";

  $sendgrid = new SendGrid($sendgrid_username, $sendgrid_password, array("turn_off_ssl_verification" => true));
  $email    = new SendGrid\Email();
  $email->addTo($to)->
         setFrom($to)->
         setSubject('Contact From Mens Conference Site')->
         setText($msg)->
         setHtml($msg)->
         addHeader('X-Sent-Using', 'SendGrid-API')->
         addHeader('X-Transport', 'web');

  $sendgrid->send($email);
}else{
  echo 'Need to fill out the form';
}
?>