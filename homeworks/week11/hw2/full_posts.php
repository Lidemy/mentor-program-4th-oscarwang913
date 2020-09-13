<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $adminEmail = NULL;
  $adminName = NULL;
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
    <section class="posts_section">
      <table>
        <thead>
          <tr class="table_header">
            <th>ID</th>
            <th>Ttile</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <?php while($row = $result->fetch_assoc()) {?>
          <tr class="table_content">
            <td><?php echo escape($row['article_id'])?></td>
            <td><a class="post_link" href="./single_post.php?post=<?php echo escape($row['article_id']);?>""><?php echo escape($row['title'])?></a></td>
            <td><?php echo escape($row['category_title'])?></td>
          </tr>
          <?php }?>
        </tbody>
      </table>
    </section>
    <?php include_once('./footer.php')?>
  </div>
</body>
</html>