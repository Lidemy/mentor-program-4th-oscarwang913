<?php
session_start();
require_once('./conn.php');

$errorMsgs = array('email'=>'', 'password'=>'');
$failToSign = array('error'=> '');

if(isset($_POST['submit'])) {
  
  $email = $_POST['email'];
  $password = $_POST['password'];

  // checking the email is valid or empty
  if(empty($_POST['email'])) {
    $errorMsgs['email'] = "Please enter your email";
  } else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errorMsgs['email'] = "Please enter a valid email";
  }

  // checking the password is valid or empty
  if(empty($_POST['password'])) {
    $errorMsgs['password'] = "Please enter your password";
  } else if(!preg_match('/\w{8,}/', $password)) {
    $errorMsgs['password'] = "Please enter a valid password";
  }

  if(array_filter($errorMsgs)) {
    header("Location: ./signin.php");
    $_SESSION['errorMsgs']= $errorMsgs;
    die();
  } else {
    $sql = sprintf("SELECT * FROM oscar_users WHERE email = '%s' and password = '%s'", $email, $password);
    $result = $conn->query($sql);
    if(!$result) {
      die($conn->error);
    }

  if(!$result->num_rows) {
    $failToSign['error'] = "Invalid email or password"; //if there is no matched account, then show this msg
    $_SESSION['failTosign'] = $failToSign;
    header("Location: ./signin.php");
  } else {
    $_SESSION['email'] = $email;
    header("Location: ./home.php");
    }
  }
}
?>