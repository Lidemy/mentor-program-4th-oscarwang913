const navList = document.querySelector('.nav_list');
const navAndbanner = document.querySelector('.banner');
const loginOptions = document.createElement('div');
loginOptions.classList.add('loginOptions');
navList.addEventListener('click', (e) => {
  if (e.target.classList.contains('login_page')) {
    loginOptions.innerHTML = `
        <a class="registration" href="./registration.php">Register</a>
        <a class="login" href="./login.php">Login</a>
      `;
    navAndbanner.append(loginOptions);
  }
});
