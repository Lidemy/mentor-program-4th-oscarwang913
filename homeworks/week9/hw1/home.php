<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');
  $email = NULL;
  $nickname = NULL;

  // If there is email in the session, it means the status is login
  if(!empty($_SESSION['email'])) {
    $email = $_SESSION['email'];
    $account = getUserfromemail($_SESSION['email']);
    $nickname = $account['nickname'];
  }
  

  
  $sql = sprintf("SELECT * from oscar_comments ORDER BY created_at DESC");
  $result = $conn->query($sql);
  if(!$result) {
    die("Fail to add the message $conn->error");
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css" />
  <title>Message Board</title>
</head>
<body>
  <div class="root">
    <?php if($email) {?>
      <div class='navbar'>
        <p class='nickname'><?php echo $nickname;?></p>
        <a class='signout_btn 'href='./signout.php'>SIGN OUT</a>
      </div>
    <?php }?>
    <div class="container">
      <?php
        if(!empty($_GET['errormsg'])) {
          $errorMsg = $_GET['errormsg'];
          $msg = '';
          if($errorMsg === '1') {
            $msg = "<p class='errorMsg'>Oops, something is missing!</p>";
          }
          echo $msg;
        }
      ?>
      <form class="add__msg" method="POST" action="./handle_add.php">
        <div class="left__section">
          <?php if(!$email) {?>
          <div class="name__section">
            <label for="nickName">Nickname: </label>
            <input type="text" id="nickName" name="nickname">
          </div>
          <?php }?>
          <div class="input__section">
            <img class="icon" src="./chat.svg" alt="">
            <textarea class="input" name="msg" rows="5" placeholder="Leave some messages here..."></textarea>
          </div>
        </div>
        <div class="right__section">
          <input type="submit" value="Send" class="add__btn">
        </div>
      </form>
      <div class="board">
        <?php while($row = $result->fetch_assoc()){;?>
        <div class="card">
          <div class="card__up">
            <svg viewBox="0 0 80 80" width="40" height="40">
              <circle class="avatar" cx="40" cy="40" r="38" fill="#4B79A1"/>
            </svg>
            <div class="profile">
              <p class="display__name"><?php echo $row['nickname'];?></p>
              <p class="create__time"><?php echo $row['created_at'];?></p>
            </div>
          </div>
          <div class="card__down">
            <p class="content"><?php echo $row['content'];?></p>
            <div class="button__section">
              <input type="submit" value="Edit" class="edit__btn btn">
              <input type="submit" value="Delete" class="delete__btn btn">
            </div>
          </div>
        </div>
        <?php }?>
      </div>
      <?php if(!$email) {?>
      <div class="account__section">
        <p class="statement">Join and chat</p>
        <div class="account__btn">
          <a href="./signup.php">SIGN UP</a>
          <a href="./signin.php">SIGN IN</a>
        </div>  
      </div>
      <?php }?>
    </div>
  </div>
</body>
</html>