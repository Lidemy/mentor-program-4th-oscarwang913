<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $id = $_POST['id'];
  $title = $_POST['title'];

  $sql = "UPDATE oscar_categories SET category_title = ? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $title, $id);
  $result = $stmt->execute();
  if(!$result) {
    die("Fail to read the data from DB");
  } else {
    header("Location: ./admin.php");
  }
?>