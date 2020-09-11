<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');
  require_once('./check_permission.php');
  

  $adminEmail = NULL;
  if(!empty($_SESSION['email'])) {
    $adminEmail = $_SESSION['email'];
    $admin = getName($_SESSION['email']);
    $adminName = $admin['name'];
  }

  $result = getposts($id = NULL, $item_per_page = NULL, $offset = NULL);
  $categoryResult = getCategory($id = NULL);

  //  Calculate how many posts the admin posted
   $count = $result->num_rows;
   $postCount = $result->num_rows ? $count : 0;

   // Generate csrf token for post
  $csrftoken = bin2hex(random_bytes(32));
  $_SESSION['csrftoken'] = $csrftoken;

  // csrf token for category
  $csrftokenCategory = bin2hex(random_bytes(32));
  $_SESSION['csrftokenCategory'] = $csrftokenCategory;
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
    <section class="manage_section">
      <div class="side_nav">
        <div class="profile">
          <div class="profile__img">
            <div class="image"></div>
          </div>
          <?php if($adminEmail) {?>
            <h3 class="username"><?php echo escape($adminName);?></h3>
          <?php }?>
        </div>
        <div class="post_count">
          <p><span><?php echo escape($postCount);?></span><br>Post</p>
        </div>
        <div class="button">
          <button class="create_btn">+</button>
        </div>
      </div>
      <div class="manage_table">
        <table>
          <caption class="table_title">Post Management</caption>
          <thead>
            <tr class="table_header">
              <th>ID</th>
              <th>Ttile</th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <?php while($row = $result->fetch_assoc()) {?>
            <tr class="table_content">
              <td><?php echo escape($row['article_id'])?></td>
              <td><?php echo escape($row['title'])?></td>
              <td><?php echo escape($row['category_title'])?></td>
              <td><a class="edit_btn" href="./update_post.php?id=<?php echo escape($row['article_id'])?>">Edit</a></td>
              <td><form action="./handle_delete_post.php" method="POST">
                <input type="hidden" name="csrftoken" value="<?php echo escape($_SESSION['csrftoken']);?>" />
                <input type="hidden" name="id" value="<?php echo escape($row['article_id'])?>" />
                <input type="submit" value="Delete" name="delete_btn" class="delete_btn">
              </form></td>
            </tr>
            <?php }?>
          </tbody>
        </table>
        <table>
          <caption class="table_title">Category Management</caption>
          <thead>
            <tr class="table_header">
              <th>ID</th>
              <th>Ttile</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <?php while($categoryRow = $categoryResult->fetch_assoc()) {?>
            <tr class="table_content">
              <td><?php echo escape($categoryRow['id'])?></td>
              <td><?php echo escape($categoryRow['category_title'])?></td>
              <td><a class="edit_btn" href="./update_category.php?id=<?php echo escape($categoryRow['id'])?>">Edit</a></td>
              <td>
              <form action="./handle_delete_category.php?id=<?php echo escape($categoryRow['id'])?>" method="POST">
                <input type="hidden" name="csrftokenCategory" value="<?php echo escape($_SESSION['csrftokenCategory']);?>" />
                <input type="hidden" name="id" value="<?php echo escape($categoryRow['id'])?>" />
                <input type="submit" value="Delete" name="delete_btn" class="delete_btn">
              </form>
              </td>
            </tr>
            <?php }?>
          </tbody>
        </table>
      </div>
    </section>
    <?php include_once('./footer.php')?>
  </div>
  <script>
    const createBtn = document.querySelector('.create_btn')
    const selectionBtn = document.createElement('div')
    selectionBtn.classList.add('selectionBtn')
    createBtn.addEventListener('click', ()=> {
      selectionBtn.innerHTML = `
        <a class="new_post_btn" href="./create_post.php">Post</a>
        <a class="new_category_btn" href="./create_category.php">Category</a>
      `
      document.querySelector('.button').prepend(selectionBtn)
    })

  </script>
</body>
</html>