<?php
  require_once('./conn.php');

  // Make sure the format of response is json
  header('Content-type:application/json;charset=utf-8');
  // CORS
  header('Access-Control-Allow-Origin: *');

  if(empty($_GET['site_key'])) {
    $json = array(
      'result'=>false,
      'message'=>'Please input the site_key in URL'
    );
    // covert the response to json format
    $response = json_encode($json);
    echo $response;
    die();
  } 

  $site_key = $_GET['site_key'];

  $sql = "SELECT * FROM oscar_msgboard WHERE site_key = ? " .
    (empty($_GET['before'])? '':'and id < ?') .
    " ORDER BY id DESC LIMIT 5";
  $stmt = $conn->prepare($sql);
  if(empty($_GET['before'])) {
    $stmt->bind_param('s', $site_key);
  } else {
    $stmt->bind_param('si', $site_key, $_GET['before']);
  }
  $result = $stmt->execute();
  if(!$result) {
    $json = array(
      'result'=>false,
      'message'=>'fail to connect to the server'
    );
    // covert the response to json format
    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt->get_result();
  $messages = array();
  while($row = $result->fetch_assoc()) {
    array_push($messages, array(
      'id'=>$row['id'],
      'nickname'=>$row['nickname'],
      'content'=>$row['content'],
      'created_at'=>$row['created_at']
    ));
  }
  $json = array(
      'result'=>true,
      'messages'=>$messages
    );
    $response = json_encode($json);
    echo $response;
?>