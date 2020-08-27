<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />
  <title>Message Board - Sign In</title>
</head>
<body>
  <div class="container_sign">
    <h1 class="title">Sign in to MyBoard</h1>
    <?php if(!empty($_SESSION['failTosign'])) {?>
    <p class="warning_msg"><?php echo $_SESSION['failTosign']['error'];?></p>
    <?php }?>
    <form class="sign" method="POST" action="./handle_singin.php">
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
      <div class="signup_in_control">
        <input type="submit" value="SIGN IN" name="submit">
        <a href="./signup.php" class="signup_btn">SIGN UP</a>
      </div>
    </form>
  </div>
</body>
</html>
