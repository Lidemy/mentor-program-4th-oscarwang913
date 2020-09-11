<?php
  // introduce the conn file
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  if(empty($_GET['id'])) {
    header("Location: ./home.php?errormsg=1");
    exit();
  }

  $msg = $_POST['msg'];
  $email = $_SESSION['email'];
  $id = $_GET['id'];
  $user = getUserfromemail($_SESSION['email']);
  $author = getUserfromid($_POST['id']);
  
  
  // updata the nickname
  $sql = "UPDATE oscar_comments SET is_deleted = 1 WHERE id = ? and email = ?";

  if(hasPermission($user, 'delete', $author)) {
    $sql = "UPDATE oscar_comments SET is_deleted = 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
  } else {
    $sql = "UPDATE oscar_comments SET is_deleted = 1 WHERE id = ? and email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $email);
  }

  $result = $stmt->execute();
  if(!$result) {
    die("Fail to add the message $conn->error");
  } else {
    header("Location: ./home.php");
  }
?>