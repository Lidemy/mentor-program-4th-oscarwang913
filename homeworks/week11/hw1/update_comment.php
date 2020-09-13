<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');
  $email = NULL;
  $nickname = NULL;
  $user = NULL;
  $id = $_GET['id'];
  $author = getUserfromid($id);

  // If there is email in the session, it means the status is login
  if(!empty($_SESSION['email'])) {
    $email = $_SESSION['email'];
    $user = getUserfromemail($_SESSION['email']);
    $nickname = $user['nickname'];
  }

  $sql = "SELECT * from oscar_comments WHERE id = ? and email = ?";
  if(hasPermission($user, 'update', $author)) {
    $sql = "SELECT * from oscar_comments WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
  } else {
    $sql = "SELECT * from oscar_comments WHERE id = ? and email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $email);
  
  }
  $result = $stmt->execute();
  if(!$result) {
    die("Fail to add the message $conn->error");
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
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
        <p class='nickname'><?php echo escape($nickname);?><button class="edit_btn">Edit</button></p>
        <form class="new_nickname_form hide" method="POST" action="update_user.php">
          <label for="new_nickname">New nickname: </label>
          <input type="text" id="new_nickname" name="nickname">
          <input type="submit" value="Submit" class="submit_btn">
        </form>
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
      <form class="add__msg" method="POST" action="./handle_update_comment.php">
        <div class="left__section">
          <div class="input__section">
            <img class="icon" src="./chat.svg" alt="">
            <?php if($email === $row['email'] || $email === 'admin@myboard.com') {?>
            <textarea class="input" name="msg" rows="5"><?php echo $row['content'];?></textarea>
            <input type="hidden" name="id" value="<?php echo $row['id']?>" />
            <?php }?>
          </div>
        </div>
        <div class="right__section">
          <input type="submit" value="Send" class="add__btn">
        </div>
      </form>
    </div>
  </div>
</body>
</html>