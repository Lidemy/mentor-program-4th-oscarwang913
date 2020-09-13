<nav class="navbar">
  <div class="logo_and_brand">
    <div class="logo"><a href="./home.php">E</a></div>
    <p class="brand">Blog</p>
  </div>
  <div class="nav_list">
    <a class="about_page" href="./about.php">About</a>
    <a class="post_list_page" href="./full_posts.php">Posts</a>
    <?php if(!empty($_SESSION['email'])) {?>
      <a class="admin_page" href="./admin.php">Admin System</a>
      <a class="logout_page" href="./logout.php">Logout</a>
    <?php } else {?>
      <a class="login_page" href="#">Login</a>
    <?php }?>
  </div>
</nav>