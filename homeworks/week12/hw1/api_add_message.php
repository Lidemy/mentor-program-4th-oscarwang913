<?php
  require_once('./conn.php');

  // Make sure the representation of response is json
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if(empty($_POST['nickname'])|| empty($_POST['site_key']) || empty($_POST['content'])) {
    $json = array(
      'result'=>false,
      'message'=>'Please input a message'
    );
    // covert the response to json format
    $response = json_encode($json);
    echo $response;
    die();
  } 

  $nickname = $_POST['nickname'];
  $site_key = $_POST['site_key'];
  $content = $_POST['content'];

  $sql = "INSERT into oscar_msgboard (site_key, nickname, content) values (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $site_key, $nickname, $content);
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
  $json = array(
      'result'=>true,
      'message'=>'Success!'
    );
  
  $response = json_encode($json);
  echo $response;
?>