<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  if(isset($_POST['submit_btn'])) {
    if(empty($_POST['title']) || empty($_POST['content']) || empty($_POST['category_id'])) {
      header("Location: ./update_post.php?id=$id");
      die("please enter the information");
    }

    $id = $_POST['id'];
    $title = $_POST['title'];
    $content = $_POST['content'];
    $categoryID = $_POST['category_id'];
    $file = $_FILES['fileToUpload'];
    $fileName = $_FILES['fileToUpload']['name'];
    $fileType = $_FILES['fileToUpload']['type'];
    $fileTmpname = $_FILES['fileToUpload']['tmp_name'];
    $fileError = $_FILES['fileToUpload']['error'];

    // To split a string
    $fileExt = explode('.', $fileName);
    $fileActualExt = strtolower(end($fileExt));
    $allowFiletype = array('jpg', 'jpeg', 'png');

    // define the uploaded image name
    $postImageName = time() . '_' . $fileName;
    $targetPath = 'uploads/' . $postImageName;

    // Checks if a value exists in an array
    if(!in_array($fileActualExt, $allowFiletype)) {
      echo "You can not upload file of this type";
      exit();
    }

    if($fileError !== 0) {
      echo "There was an error uploading your file";
      exit();
    }

    if(move_uploaded_file($fileTmpname, $targetPath)) {
      $sql = "UPDATE `oscar_articles` SET `title`= ?, `content`= ?, image = ?, `category_id`= ? WHERE article_id = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('ssssi', $title, $content, $postImageName, $categoryID, $id);
      $result = $stmt->execute();
      if(!$result) {
        die('Fail to update this category');
      } else {
        header("Location: ./admin.php");
      }
    } 
  }
?>