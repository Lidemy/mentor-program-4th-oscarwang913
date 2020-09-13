<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  if(isset($_POST['delete_btn'])) {
    if(empty($_POST['csrftokenCategory']) || empty($_POST['id'])) {
      header("Location: ./admin.php");
      die();
    }
    $id = $_POST['id'];
    if(!empty($_POST['csrftokenCategory'])) {
      if(hash_equals($_SESSION['csrftokenCategory'], $_POST['csrftokenCategory'])) {
        $sql = "UPDATE oscar_categories SET is_deleted = 1 WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        $result = $stmt->execute();
        if(!$result) {
          die("Fail to delete the post");
        }
        header("Location: ./admin.php");
        unset($_SESSION['csrftokenCategory']);
      } else {
        header("Location: ./home.php");
      }
    }
  }
?>