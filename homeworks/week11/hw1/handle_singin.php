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
    $errorMsgs['password'] = "Please set at least 8 characters";
  }

  if(array_filter($errorMsgs)) {
    header("Location: ./signin.php");
    $_SESSION['errorMsgs']= $errorMsgs;
    die();
  } else {
    $sql = "SELECT * FROM oscar_users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $email);
    $result = $stmt->execute();
    if(!$result) {
      die($conn->error);
    }
    // Get the result after executing SQL
    $result = $stmt->get_result();

    // If there is no matched account
    if(!$result->num_rows) {
      $failToSign['error'] = "Invalid email or password";
      $_SESSION['failTosign'] = $failToSign;
      header("Location: ./signin.php");
      exit();
    }

    $row = $result->fetch_assoc();
    if(password_verify($password, $row['password'])) {
      $_SESSION['email'] = $email;
    header("Location: ./home.php");
    }
  }
}
?>