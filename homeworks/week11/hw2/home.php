<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $adminEmail = NULL;
  $adminName = Null;
  if(!empty($_SESSION['email'])) {
    $adminEmail = $_SESSION['email'];
    $admin = getName($_SESSION['email']);
    $adminName = $admin['name'];
  }

  $result = getposts($id = NULL);
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
    <div class="banner"></div>
    <section class="cards-cat">
      <?php while($row = $result->fetch_assoc()) {?>
      <article class="column">
        <div class="card">
          <div class="card_img">
            <a href="./single_post.php?post=<?php echo escape($row['article_id']);?>">
              <img class="img" src="uploads/<?php echo escape($row['image']);?>" alt="post_img">
            </a>
          </div>
          <div class="card_section">
            <div class="contributor">
              <div class="contributor_img">
                <div class="image"></div>
              </div>
              <div>
                <div class="contributor_name"><?php echo escape($row['author']);?></div>
                <p><?php echo escape(converTimestamp($row['created_at']));?></p>
              </div>
            </div>
            <a class="post_link" href="./single_post.php?post=<?php echo escape($row['article_id']);?>"><h3 class="post_title"><?php echo escape($row['title']);?></h3></a>   
            <p class="category"><?php echo escape($row['category_title']);?></p>
          </div>
        </div>
      </article>
      <?php }?>
      <div class="placeholder"></div>
    </section>
    <?php include_once('./footer.php')?>
  </div>
  <script src="script.js"></script>
</body>
</html>