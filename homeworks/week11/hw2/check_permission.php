<?php
  // if the use is not the admin, direct the page to home page
  if(empty($_SESSION['email']) || $_SESSION['email'] !== "admin@easyblog.com") {
    header("Location: ./home.php");
    exit();
  }
?>