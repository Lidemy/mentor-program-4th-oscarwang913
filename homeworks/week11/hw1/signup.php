<?php
session_start();
// First destory the previous session, is it an appropriate method?
session_destroy();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />
  <title>Message Board - Sign Up</title>
</head>
<body>
  <div class="container_sign">
    <h1 class="title">Create Account</h1>
    <form class="sign" method="POST" action="./handle_signup.php">
      <div>
        <i class="far fa-user"></i>
        <input type="text" placeholder="Nickname" name="nickname">
      </div>
      <?php if(!empty($_SESSION['errorMsgs'])) {?>
      <p class="warning_msg"><?php echo $_SESSION['errorMsgs']['nickname'];?></p>
      <?php }?>
      <div>
        <i class="far fa-envelope"></i>
        <input type="text" placeholder="Email" name="email">
      </div>
      <?php if(!empty($_SESSION['errorMsgs'])) {?>
      <p class="warning_msg"><?php echo $_SESSION['errorMsgs']['email'];?></p>
      <?php }?>
      <div>
        <i class="fas fa-lock"></i>
        <input type="password" placeholder="Password" name="password">
      </div>
      <?php if(!empty($_SESSION['errorMsgs'])) {?>
      <p class="warning_msg"><?php echo $_SESSION['errorMsgs']['password'];?></p>
      <?php }?>
      <input type="submit" value="SIGN UP" name="submit">
    </form>
  </div>
</body>
</html>
