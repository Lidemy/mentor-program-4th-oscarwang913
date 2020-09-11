<?php
require_once('./conn.php');

function getUserfromemail($email) {
  global $conn;
  $sql = sprintf("SELECT * from oscar_users WHERE email = '%s'", $email);
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  return $row;
}

function getUserfromid($id) {
  global $conn;
  $sql = sprintf("SELECT * from oscar_comments WHERE id = '%s'", $id);
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  return $row;
}

function escape($str) {
  return htmlspecialchars($str, ENT_QUOTES);
}

function hasPermission($user, $action, $comment) {
  if($user === NULL) {
    return;
  }

  // As an admin
  if ($user['role'] === '0') {
    return true;
  } 
  // As a normal user
  if($user['role'] === '1') {
    if($action === 'create') return true;
    return $comment['email'] === $user['email'];
  }

  // As a banned user
  if($user['role'] === '2') {
    if($action === 'create') return false;
    return $comment['email'] === $user['email'];
  }
}
?>