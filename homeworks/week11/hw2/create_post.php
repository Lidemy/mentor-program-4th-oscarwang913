<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');
  require_once('./check_permission.php');

  $result = getCategory($id = NULL);

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
    <nav class="navbar">
      <div class="logo_and_brand">
        <div class="logo">E</div>
        <p class="brand">Blog</p>
      </div>
      <p>Write a new post</p>
    </nav>
    <section class="new_post_section">
      <form class="new_post_form" method="POST" action="./handle_create_post.php" enctype="multipart/form-data">
        <textarea class="title" type="text" name="title" placeholder="New post title here..."></textarea>
        <div>
          <select id="selection" name="category_id">
          <?php
            while($row = $result->fetch_assoc()) {
              $id = $row['id'];
              $title = $row['category_title'];
              echo "<option value=$id>$title</option>";
            }
          ?>
          </select>
        </div>
        <input type="file" name="fileToUpload" accept="image/*">
        <hr>
        <textarea class="content" name="content" placeholder="Write your post content here..."></textarea>
        <input type="submit" value="Publish" class="submit_btn" name="submit_btn">
      </form>
    </section>
    <?php include_once('./footer.php')?>
  </div>
</body>
</html>