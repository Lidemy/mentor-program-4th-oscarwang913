<?php
  require_once('conn.php');

  header('Content-type: application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if(empty($_GET['id'])) {
    $json = array(
      'result'=>false,
      'message'=>'Please add an id in URL'
    );
    $resp = json_encode($json);
    echo $resp;
    die();
  }

  $id = intval($_GET['id']);
  $sql = "SELECT id, todo FROM oscar_todolist WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
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
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $json = array(
    'result'=>true,
    'message'=>'Success!',
    'todos'=>array(
      'id'=>$row['id'],
      'todo'=>$row['todo']
    )
    );
  $resp = json_encode($json);
  echo $resp;

?>