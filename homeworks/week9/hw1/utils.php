<?php
  require_once('./conn.php');

function getUserfromemail($email) {
  global $conn;
  $sql = sprintf("SELECT * from oscar_users WHERE email = '%s'", $email);
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  return $row;
}
?>