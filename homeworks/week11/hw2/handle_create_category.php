<?php
  session_start();
  require_once('./conn.php');

  if(empty($_POST['category'])) {
    die("Please enter");
  }

  $category = $_POST['category'];
  $sql = "INSERT INTO oscar_categories (category_title) VALUES (?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $category);
  $result = $stmt->execute();
  if(!$result) {
    die('Fail to add new category');
  } else {
    header("Location: ./admin.php");
  }
?>