const Routes = {
  "/": {
    template: 'templates/index.html',
    title: '',
    description: ''
  },
  "/auth": {
    template: 'templates/auth.html',
    title: '',
    description: ''
  }
}

window.addEventListener('load', function(event) {

  const icon = document.querySelector('.icon-hook');
  
  icon.classList.add('active');
}, false);

const loginForm = document.forms.loginForm;

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputValue = loginForm.elements.email;

  window.history.pushState({}, '', '/auth');
  // window.location.replace('/templates/auth.html');
  urlLocationHandler(inputValue.value);
})


const urlLocationHandler = async (inputValue) => {
//   const location = window.location.pathname;
  
//   if (location.length === 0) {
//     location = '/';
//   }

//   const route = Routes[location] || Routes[404];
  const label = loginForm.querySelector('.login-form-label');
  if (inputValue.length === 0)
    return;
  if (inputValue !== 'yula.bu@icloud.com') {
    label.textContent = 'Ты не моя жена';
    return;
  }
  const loginPage = document.querySelector('.login-page');
  const html = await fetch(Routes['/auth'].template).then((response) => response.text());
  console.log(html);
  // const elementCopy = html.cloneNode(true);
  // loginPage.append(html); 
  document.getElementById('email').innerHTML = html;

}