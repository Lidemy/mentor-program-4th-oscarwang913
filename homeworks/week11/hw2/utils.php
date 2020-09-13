<?php
  require_once('./conn.php');
  
  // set the time zone to Taipei
  date_default_timezone_set("Asia/Taipei");

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function getName($email) {
    global $conn;
    $sql = "SELECT * from oscar_author WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $email);
    $result = $stmt->execute();
    if(!$result) {
      die("Fail to read the data from DB");
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function getCategory($id) {
    global $conn;
    $sql = "";
    if(!$id) {
      $sql = "SELECT * FROM oscar_categories WHERE category_is_deleted = 0 ORDER BY created_at DESC";
      $stmt = $conn->prepare($sql);
    } else {
      $sql = "SELECT * from oscar_categories WHERE id = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('i', $id);
    }
    $result = $stmt->execute();
    if(!$result) {
      die("Fail to read the data from DB");
    }
    $result = $stmt->get_result();
    return $result;
  }

  function getposts($id) {
    global $conn;
    $sql = "";
    if(!$id) {
      $sql = "SELECT A.article_id, A.author, A.title, A.content, A.image, A.category_id, A.created_at, A.is_deleted, C.id, C.category_title FROM oscar_articles as A LEFT JOIN oscar_categories as C ON A.category_id = C.id WHERE A.is_deleted = 0 ORDER BY A.created_at DESC";
      $stmt = $conn->prepare($sql);
    } else {
      $sql = "SELECT A.article_id, A.author, A.title, A.content, A.image, A.category_id, A.created_at, C.id, C.category_title FROM oscar_articles as A LEFT JOIN oscar_categories as C ON A.category_id = C.id WHERE A.article_id = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('i', $id);
    }
    $result = $stmt->execute();
    if(!$result) {
      die("Fail to read the data from DB");
    }
    $result = $stmt->get_result();
    return $result;
  }

  function getSinglepost($id) {
    global $conn;
    $sql = "SELECT * FROM oscar_articles WHERE article_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $id);
    $result = $stmt->execute();
    if(!$result) {
      die("Fail to read the data from DB");
    }
    $result = $stmt->get_result();
    return $result;
  }

  function getdatefromtimestamp($timestamp) {
    list($date, $time) = explode(" ", $timestamp);
    return $date;
  }

  function converTimestamp($time) {
    $time_ago = strtotime($time);
    $currentTime = time();
    $timeDiff = $currentTime - $time_ago;
    $seconds = $timeDiff;
    $mins = round($seconds / 60);
    $hrs = round($mins / 60);
    $days = round($hrs / 24);
    $weeks = round($days / 7);
    $months = round($weeks / 4.35);
    $years = round($months / 12);

    if($seconds <= 60) {
      return "Just Now";
    } else if($mins <= 60) {
      if($mins == 1) {
        return "one minute ago";
      } else {
        return "$mins minutes ago";
      }
    } else if ($hrs <=24) {
      if($hrs == 1) {
        return "one hour ago";
      }else {
        return "$hrs hours ago";
      }
    } else if($days <= 7) {
      if($days == 1) {
        return "yesterday";
      } else {
        return "$days days ago";
      }
    } else if($weeks <= 4.3) {
      if($weeks == 1) {
        return "a week ago";
      } else {
        return "$weeks days ago";
      } 
    } else if($months <= 12) {
      if($months == 1) {
        return "a month ago";
      } else {
        return "$months months ago";
      }
    } else {
      if($years == 1) {
        return "a year ago";
      } else {
        return "$years years ago";
      }
    }
  }
?>