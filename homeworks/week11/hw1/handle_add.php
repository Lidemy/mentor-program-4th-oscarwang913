<?php
  // introduce the conn file
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  if(!$_SESSION['email']) {
    header("Location: ./signin.php");
    die('Please sign in to comment');
  }

  $msg = $_POST['msg'];
  if(empty($msg)) {
    header("Location: ./home.php?errormsg=1");
    exit();
  }

  $emial = $_SESSION['email'];
  $user = getUserfromemail($_SESSION['email']);

  if(!hasPermission($user, 'create', NULL)) {
    header("Location: ./home.php");
    exit();
  }

  // define the sql commend
  $sql = "INSERT into oscar_comments (email, content) values (?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $emial, $msg);
  $result = $stmt->execute();
  if(!$result) {
    die("Fail to add the message $conn->error");
  } else {
    header("Location: ./home.php");
  }
?>