<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $errorMsg = array('email'=>'', 'password'=>'');
  $invalidMsg = array('invalid'=>'');

  if(isset($_POST['submit'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

     if(empty($_POST['email']) && empty($_POST['password'])) {
    $errorMsg['email'] = 'Please enter your email';
    }

    if(empty($_POST['email'])) {
      $errorMsg['email'] = 'Please enter your email';
    }
    
    if(empty($_POST['password'])) {
      $errorMsg['password'] = 'Please enter your password';
    }

    if(array_filter($errorMsg)) {
      header("Location: ./login.php");
      $_SESSION['errorMsg']= $errorMsg;
      die();
    } else {
      $sql = "SELECT * from oscar_author WHERE email = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('s', $email);
      $result = $stmt->execute();
      if(!$result) {
        die();
      }

      $result = $stmt->get_result();
      $row = $result->fetch_assoc();

      if(!$result->num_rows || !password_verify($password, $row['password'])) {
        $invalidMsg['invalid'] = 'Invalid email or password';
        $_SESSION['invalidMsg']= $invalidMsg;
        header("Location: ./login.php");
        die();
      } else {
        $_SESSION['email'] = $email;
        header("Location: ./home.php");
      }
    }
  }
?>