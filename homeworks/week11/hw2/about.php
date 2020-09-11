<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');
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
      <section class="about_section">
        <div class="about">
          <h1 class="about__title">ABOUT US</h1>
          <p class="about__slogan">Why not keep every itinerary of your trip? Do it and Enjoy Easy Blog!</p>
        </div>
      </section>
    <?php include_once('./footer.php')?>
  </div>
  <script src="script.js"></script>
</body>
</html>