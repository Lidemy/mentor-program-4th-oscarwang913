const questions = document.querySelector('.questions');

questions.addEventListener('click', (e) => {
  const targetItem = e.target;
  const current = document.querySelector('.current');
  if (e.target.classList.contains('question__subject')) {
    if (targetItem === current) {
      current.nextElementSibling.classList.toggle('hidden');
    } else {
      current.classList.remove('current');
      current.nextElementSibling.classList.add('hidden');
      targetItem.classList.add('current');
      targetItem.nextElementSibling.classList.toggle('hidden');
    }
  }
});
