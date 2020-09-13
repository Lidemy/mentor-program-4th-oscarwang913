<?php
  session_start();
  require_once('./conn.php');

  $name = $_POST['name'];
  $email = $_POST['email'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $sql = "INSERT into oscar_author (name, email, password) values (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $name, $email, $password);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }
  $_SESSION['email'] = $email;
  header("Location: ./home.php");
?>