<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  if(isset($_POST['delete_btn'])) {
    if(empty($_POST['csrftoken']) || empty($_POST['id'])) {
      header("Location: ./admin.php");
      die();
    }
    $id = $_POST['id'];
    if(!empty($_POST['csrftoken'])) {
      if(hash_equals($_SESSION['csrftoken'], $_POST['csrftoken'])) {
        $sql = "UPDATE oscar_articles SET is_deleted = 1 WHERE article_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        $result = $stmt->execute();
        if(!$result) {
          die("Fail to delete the post");
        }
        header("Location: ./admin.php");
        unset($_SESSION['csrftoken']);
      } else {
        header("Location: ./home.php");
      }
    }
  }
?>