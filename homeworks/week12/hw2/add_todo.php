<?php
  require_once('conn.php');

  header('Content-type: application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if(empty($_POST['todo'])) {
    $json = array(
      'result'=>false,
      'message'=>'Please enter a todo item'
    );
    $resp = json_encode($json);
    echo $resp;
    die();
  }

  $todo = $_POST['todo'];

  $sql = "INSERT INTO oscar_todolist (todo) VALUES (?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $todo);
  $result = $stmt->execute();
  if(!$result) {
    $json = array(
      'result'=>false,
      'message'=>'Please insert todo item to DB'
    );
    $resp = json_encode($json);
    echo $resp;
    die();
  }

  $newInsertid = $conn->insert_id;
  $json = array(
    'result'=>true,
    'message'=>'Success!',
    'id'=>$newInsertid
  );
  $resp = json_encode($json);
  echo $resp;
  die();
?>