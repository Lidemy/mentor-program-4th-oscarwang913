<?php
  // introduce the conn file
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  if(!$_SESSION['email']) {
    header("Location: ./signin.php");
    die('Please sign in to comment');
  }

  print_r($_SESSION['email']);

  $msg = $_POST['msg'];
  if(empty($msg)) {
    header("Location: ./home.php?errormsg=1");
    exit();
  }

  $account = getUserfromemail($_SESSION['email']);
  $nickname = $account['nickname'];


  // define the sql commend
  $sql = sprintf("INSERT into oscar_comments (nickname, content) values ('%s', '%s')", $nickname, $msg);
  $result = $conn->query($sql);
  if(!$result) {
    die("Fail to add the message $conn->error");
  } else {
    header("Location: ./home.php");
  }
?>