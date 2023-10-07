document.getElementById('login-form').addEventListener('submit' , function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login' , {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json'
        },
        body: JSON.stringify({email, password})
    }).then(response => response.text()).then(data => {
        alert(data) // para exibir a resposta do servidor.
    }).catch(error => console.error('Erro' , error));
});