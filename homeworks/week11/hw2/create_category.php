<?php
  session_start();
  require_once('./conn.php');
  require_once('./check_permission.php');
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
      <p>Create a new category</p>
    </nav>
    <section class="new_post_section">
      <form class="new_post_form" method="POST" action="./handle_create_category.php">
        <input class="title" type="text" name="category" placeholder="New category here...">
        <input type="submit" value="Publish" class="submit_btn">
      </form>
    </section>
    <?php include_once('./footer.php')?>
  </div>
</body>
</html>