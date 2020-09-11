const navbar = document.querySelector('.navbar');
navbar.addEventListener('click', (e) => {
  if (e.target.classList.contains('name_edit_btn')) {
    document.querySelector('.new_nickname_form').classList.remove('hide');
  }

  if (e.target.classList.contains('submit_btn')) {
    document.querySelector('.new_nickname_form').classList.add('hide');
  }
});
