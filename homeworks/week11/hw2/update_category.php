<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');
  require_once('./check_permission.php');

  $id = $_GET['id'];

  $result = getCategory($id);
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
    <nav class="navbar">
      <div class="logo_and_brand">
        <div class="logo">E</div>
        <p class="brand">Blog</p>
      </div>
      <p>Update category</p>
    </nav>
    <section class="new_post_section">
      <form class="new_post_form" method="POST" action="./handle_update_category.php">
        <input class="title" type="text" name="title" value="<?php echo escape($row['category_title']);?>">
        <input type="hidden" name="id" value="<?php echo escape($row['id']);?>">
        <input type="submit" value="Publish" class="submit_btn">
      </form>
    </section>
    <?php include_once('./footer.php')?>
  </div>
</body>
</html>