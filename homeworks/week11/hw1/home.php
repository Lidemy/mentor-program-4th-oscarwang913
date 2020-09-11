<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $email = NULL;
  $nickname = NULL;
  $user = NULL;

 $page = 1;
 if(!empty($_GET['page'])) {
   $page = intval($_GET['page']);
 }
 $items_per_page = 5;
 $offset = ($page - 1) * $items_per_page;


  // If there is email in the session, it means the status is login
  if(!empty($_SESSION['email'])) {
    $email = $_SESSION['email'];
    $user = getUserfromemail($_SESSION['email']);
    $nickname = $user['nickname'];
  }

  $stmt = $conn->prepare("SELECT C.id as id, C.content as content, C.created_at as created_at, U.nickname as nickname, U.email as email from oscar_comments as C LEFT JOIN oscar_users as U on (C.email = U.email) WHERE C.is_deleted IS NULL ORDER BY C.created_at DESC LIMIT ? offset ?");
  $stmt->bind_param('ii', $items_per_page, $offset);
  $result = $stmt->execute();
  if(!$result) {
    die("Fail to add the message $conn->error");
  }
  $result = $stmt->get_result();
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
    <div class='navbar'>
      <?php if($email) {?>
        <div class="name_section">
          <button class="name_edit_btn"><?php echo escape($nickname);?></button>
          <form class="new_nickname_form hide" method="POST" action="update_user.php">
            <input type="text" id="new_nickname" name="nickname" class="new_nickname_input">
            <input type="submit" value="Submit" class="submit_btn">
          </form>
        </div>
        <div class="manage_section">
          <?php if($email && $user['role'] === '0') {?>
            <a class="mngmt_system" href="./admin.php">Management System</a>
          <?php }?>
          <a class="signout_btn" href='./signout.php'>SIGN OUT</a>
        </div>
      <?php } ?>
    </div>
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
      <?php if ($email && !hasPermission($user, 'create', NULL)) {?>
        <h3>You are banned!</h3>
      <?php } else if ($email) {?>
        <form class="add__msg" method="POST" action="./handle_add.php">
        <div class="left__section">
          <div class="input__section">
            <img class="icon" src="./chat.svg" alt="">
            <textarea class="input" name="msg" rows="5" placeholder="Leave some messages here..."></textarea>
          </div>
        </div>
        <div class="right__section">
          <input type="submit" value="Send" class="add__btn">
        </div>
      </form>
      <?php }?>
      <div class="board">
        <?php while($row = $result->fetch_assoc()){?>
        <div class="card">
          <div class="card__up">
            <svg viewBox="0 0 80 80" width="40" height="40">
              <circle class="avatar" cx="40" cy="40" r="38" fill="#4B79A1"/>
            </svg>
            <div class="profile">
              <p class="display__name"><?php echo escape($row['nickname']);?></p>
              <p class="create__time"><?php echo escape($row['created_at']);?></p>
            </div>
          </div>
          <div class="card__down">
            <p class="content"><?php echo escape($row['content']);?></p>
            <div class="button__section">
            <?php if(hasPermission($user, 'update', $row)) {?>
              <a href="update_comment.php?id=<?php echo $row['id'];?>" class="edit__btn btn">Edit</a>
              <a href="delete_comment.php?id=<?php echo $row['id'];?>" class="delete__btn btn">Delete</a>
            <?php }?>
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
    <?php
      $stmt = $conn->prepare("SELECT count(id) as count from oscar_comments WHERE is_deleted IS NULL");
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      $totalPage = ceil($count / $items_per_page);
    ?>
    <div class="page_index">
      <p><?php echo "Page $page of $totalPage"?></p>
    </div>
    <div class="paginator">
      <?php if($page !== 1) {?>
        <a class="page " href="home.php?page=1">HOME</a>
        <a class="page" href="home.php?page=<?php echo $page - 1;?>">Prev</a>
      <?php }?>
      <?php if($page != $totalPage) {?>
        <a class="page" href="home.php?page=<?php echo $page + 1;?>">Next</a>
        <a class="page" href="home.php?page=<?php echo $totalPage;?>">Last</a>
      <?php }?>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>