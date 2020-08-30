<?php
  session_start();
  require_once('./conn.php');
  $errorMsgs = array('nickname'=>'', 'email'=>'', 'password'=>'');

  if(isset($_POST['submit'])) {
    if(empty($_POST['nickname'])) {
      $errorMsgs['nickname'] = "Please enter your nickname";
    }
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
    $_SESSION['errorMsgs'] = $errorMsgs;
    
    // Array's values are empty, which means all blank are filled
    if(array_filter($errorMsgs)) {
      header("Location: ./signup.php");
      exit();
    } else {
      $sql = sprintf("INSERT into oscar_users (nickname, email, password) values ('%s', '%s', '%s')",$_POST['nickname'], $_POST['email'], $_POST['password']);
      $result = $conn->query($sql);
      if(!$result) {
        die($conn->error);
      }
      session_destroy();
      header("Location: ./home.php");
    }
  };
?>


