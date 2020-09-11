<?php
require_once('./conn.php');
require_once('./utils.php');

$role = $_POST['role'];
$id = $_POST['id'];

if(empty($role) || empty($id)) {
  header("Location: ./admin.php");
  exit();
}

if($_POST['role'] > 2 || $_POST['role'] < 1) {
  header("Location: ./admin.php");
  exit();
}

$sql = "UPDATE oscar_users set role = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $role, $id);
$result = $stmt->execute();

if(!$result) {
  die("Fail to add the message $conn->error");
} else {
  header("Location: ./admin.php");
}
?>