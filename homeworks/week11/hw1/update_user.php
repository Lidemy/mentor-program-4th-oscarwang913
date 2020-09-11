<?php
  // introduce the conn file
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $newNickname = $_POST['nickname'];
  if(empty($newNickname)) {
    header("Location: ./home.php?errormsg=1");
    exit();
  }

  $email = $_SESSION['email'];
  
  // updata the nickname
  $sql = "UPDATE oscar_users SET nickname = ? WHERE email = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $newNickname, $email);
  $result = $stmt->execute();
  if(!$result) {
    die("Fail to add the message $conn->error");
  } else {
    header("Location: ./home.php");
  }
?>