<?php
  session_start();
  session_destroy();
  require_once('./conn.php');
  require_once('./utils.php');
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
    <?php include_once('./header.php');?>
    <div class="banner"></div>
    <section class="form_section">
      <h1 class="login_title">Welcome to EasyBlog</h1>
      <?php if(!empty($_SESSION['errorMsg'])){?>
        <p class="error_msg"><?php echo escape($_SESSION['errorMsg']['email']);?></p>
      <?php } ?>
      <?php if(!empty($_SESSION['invalidMsg'])){?>
        <p class="error_msg"><?php echo escape($_SESSION['invalidMsg']['invalid']);?></p>
      <?php } ?>
      <form class="login_form" method="POST" action="./handle_login.php">
        <div class="personl_info">
          <label for="email">Email: </label>
          <input type="email" id="email" name="email" placeholder="Please input your email here...">
        </div>
        <div class="personl_info">
          <label for="password">Password: </label>
          <input type="password" id="password" name="password" placeholder="Please input your password here...">
        </div>
        <input type="submit" class="submit_btn" name="submit">
      </form>
    </section>
    <div class="blank"></div>
    <?php include_once('./footer.php')?>
  </div>
  <script src="script.js"></script>
</body>
</html>