<?php
  session_start();
  require_once('./conn.php');
  
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./style.css" />
  <title>Easy Blog</title>
</head>
<body>
  <div class="wrapper">
    <?php require_once('./header.php')?>
    <div class="banner"></div>
    <section class="form_section">
      <h1 class="register_title">Welcome to EasyBlog</h1>
      <h2>Registration is currently closed</h2>
    </section>
    <div class="blank"></div>
    <?php include_once('./footer.php')?>
  </div>
  <script src="script.js"></script>
</body>
</html>