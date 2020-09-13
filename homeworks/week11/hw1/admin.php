<?php
session_start();
require_once('./conn.php');
require_once('./utils.php');
$email = NULL;
$nickname = NULL;
$user = NULL;

if(!empty($_SESSION['email'])) {
  $email = $_SESSION['email'];
  $user = getUserfromemail($_SESSION['email']);
}

// Check if the user is not the admin

if($user['role'] !== '0') {
  header("Location: ./home.php");
  die();
}

$stmt = $conn->prepare("SELECT * from oscar_users WHERE role != 0 ORDER BY created_at");
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
  <title>MsgBoard - Management System</title>
</head>
<body>
  <div class="wrapper">
    <h1 class="msg_system_title">MyBoard - Management System</h1>
      <table>
        <thead>
          <tr class="table__header">
          <th>Nickname</th>
          <th>email</th>
          <th>role (1 for Nomal user and 2 for banned user)</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
          <?php while($row = $result->fetch_assoc()) {?>
          <tr class="table__content">
            <td class="nickname_column"><?php echo escape($row['nickname']) ;?></td>
            <td class="email_column"><?php echo escape($row['email']) ;?></td>
            <form method="POST" action="./handle_update_auth.php">
              <td class="role_column"><input class="user__role" type="text" name="role" value="<?php echo escape($row['role']);?>"></td>
              <td class="role_column"><input type="submit" value="Submit" class="update_btn btn"></td>
              <td class="hide"><input type="hidden" name="id" value="<?php echo escape($row['id']);?>" /></td>
            </form>
          </tr>
        <?php }?>
        </tbody>
      </table>
  </div>
</body>
</html>

