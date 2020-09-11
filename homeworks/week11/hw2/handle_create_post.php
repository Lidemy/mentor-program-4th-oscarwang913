<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  if(isset($_POST['submit_btn'])) {
    if(empty($_POST['title']) || empty($_POST['content']) || empty($_POST['category_id']) || empty($_FILES['fileToUpload'])) {
      header("Location: ./create_post.php");
      die("please enter the information");
    }
    
    $user = getName($_SESSION['email']);
    $author = $user['name'];
    $title = $_POST['title'];
    $content = $_POST['content'];
    $categoryID = $_POST['category_id'];
    $file = $_FILES['fileToUpload'];
    $fileName = $_FILES['fileToUpload']['name'];
    $fileType = $_FILES['fileToUpload']['type'];
    $fileTmpname = $_FILES['fileToUpload']['tmp_name'];
    $fileError = $_FILES['fileToUpload']['error'];
    $fileSize = $_FILES['fileToUpload']['size'];

    // To split a string
    $fileExt = explode('.', $fileName);
    $fileActualExt = strtolower(end($fileExt));
    $allowFiletype = array('jpg', 'jpeg', 'png');

    // define the uploaded image name
    $postImageName = time() . '_' .$fileName;
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
      $sql = "INSERT into oscar_articles (author, title, content, image, category_id) VALUES (?, ?, ?, ?, ?)";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('sssss', $author, $title, $content, $postImageName, $categoryID);
      $result = $stmt->execute();
      if(!$result) {
        die('Fail to add new category');
      } else {
        header("Location: ./home.php");
      }
    }
  }
?>