const input = document.querySelector('.login_input')
const button = document.querySelector('.login_button')
const form = document.querySelector('.login-form')

const handleSubmit = (event) => {
    if (input.value.trim() == '') {
        alert('Por favor, insira um nome.')
        return;
    } else {
        event.preventDefault();
        localStorage.setItem('player', input.value);
        window.location = '/pages/jogo.html';
    }


}

form.addEventListener('submit', handleSubmit);
