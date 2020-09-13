<?php
  // introduce the conn file
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $msg = $_POST['msg'];
  if(empty($msg)) {
    header("Location: ./update_comment.php?errormsg=1&id=$_POST[id]");
    exit();
  }

  $email = $_SESSION['email'];
  $id = $_POST['id'];
  $user = getUserfromemail($_SESSION['email']);
  $author = getUserfromid($_POST['id']);


  $sql = "UPDATE oscar_comments SET content = ? WHERE id = ? and email = ?";
  if(hasPermission($user, 'update', $author)) {
    $sql = "UPDATE oscar_comments SET content = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $msg, $id);
  } else {
    $sql = "UPDATE oscar_comments SET content = ? WHERE id = ? and email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $msg, $id, $email);
  }
  
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  } else {
    header("Location: ./home.php");
  }
?>