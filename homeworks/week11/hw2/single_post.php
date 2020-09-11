<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $adminEmail = NULL;
  $adminName = Null;
  $postID = $_GET['post'];
  if(!empty($_SESSION['email'])) {
    $adminEmail = $_SESSION['email'];
    $admin = getName($_SESSION['email']);
    $adminName = $admin['name'];
  }

  
  $result = getSinglepost($postID);
  $row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./style.css" />
  <title>Easy Blog</title>
</head>
<body>
  <div class="wrapper">
    <?php require_once('./header.php')?>
    <div class="banner" style="background:url('uploads/<?php echo escape($row['image']);?>') center center/cover no-repeat">
      <p class="banner__title"><?php echo escape($row['title']);?></p>
    </div>
    <article class="single_post">
      <section class="author_section">
        <p class="author"><?php echo escape($row['author']);?></p>
        <p class="post_date"><?php echo escape(getdatefromtimestamp($row['created_at']));?></p>
      </section>
      <section class="content_section">
        <p class="content"><?php echo escape($row['content']);?></p>
      </section>
    </article>
    <?php include_once('./footer.php')?>
  </div>
  <script src="script.js"></script>
</body>
</html>