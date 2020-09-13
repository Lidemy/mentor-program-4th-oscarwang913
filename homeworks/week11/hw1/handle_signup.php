<?php
  session_start();
  require_once('./conn.php');
  $errorMsgs = array('nickname'=>'', 'email'=>'', 'password'=>'');

  if(isset($_POST['submit'])) {
    $nickname = $_POST['nickname'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    if(empty($_POST['nickname'])) {
      $errorMsgs['nickname'] = "Please enter your nickname";
    }
    
    // checking the email is valid or empty
    if(empty($_POST['email'])) {
      $errorMsgs['email'] = "Please enter your email";
    } 
    
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $errorMsgs['email'] = "Please enter a valid email";
    } 
      
    // check the email has been used or not
    $duplicateSql = "SELECT email FROM oscar_users where email = ?";
    $duplicatestmt = $conn->prepare($duplicateSql);
    $duplicatestmt->bind_param('s', $email);
    $duplicatestmt->execute();
    $duplicatestmt->store_result();
    $numRows = $duplicatestmt->num_rows();
    if($numRows) {
      $errorMsgs['email'] = "The email has been used";
    }
    
    // checking the password is valid or empty
    if(empty($_POST['password'])) {
      $errorMsgs['password'] = "Please enter your password";
    } else if(!preg_match('/\w{8,}/', $password)) {
      $errorMsgs['password'] = "Please enter a valid password";
    }
    $_SESSION['errorMsgs'] = $errorMsgs;
    
    // Array's values are empty, which means all blank are filled
    if(array_filter($errorMsgs)) {
      header("Location: ./signup.php");
      exit();
    } else {
      $sql = "INSERT into oscar_users (nickname, email, password) values (?, ?, ?)";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('sss', $nickname, $email, $password);
      $result = $stmt->execute();
      if(!$result) {
        die($conn->error);
      }
      $_SESSION['email'] = $email;
      header("Location: ./home.php");
    }
  };
?>


