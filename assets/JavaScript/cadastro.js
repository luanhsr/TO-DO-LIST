const bdUserTemp = [];
const user = new Object();
document.getElementById('getUser').addEventListener('click' , ()=> {
 event.preventDefault();

    var email = document.getElementById('email').value;
    var verifyE = document.getElementById('confirm-email').value;
    var password = document.getElementById('password').value;
    var verifyP = document.getElementById('confirm-password').value;
    const correction = document.getElementById('correction')
    const erroremail = document.getElementById('erroremail');
    const errorconfirmemail = document.getElementById('errorconfirmemail');
    const errorpassword = document.getElementById('errorpassword');
    const errorconfirmpassword = document.getElementById('errorconfirmpassword');


   
    if (email.length === 0) {
        correction.innerHTML = 'O email deve ser preenchido!';
        correction.style.color = 'red';
        erroremail.style.visibility = 'visible'
    } else if (!validateEmail(email)) {
        correction.innerHTML = 'Precisa ser um email valido!';
        correction.style.color = 'red';
        erroremail.style.visibility = 'visible'
    } else if (verifyE.length === 0) {
        correction.innerHTML = 'A verificacao de e-mail deve ser preenchido!';
        correction.style.color = 'red';
        errorconfirmemail.style.visibility = 'visible'
    } else if (email !== verifyE) {
        correction.innerHTML = 'O email nao coincide! por favor preencha novamente.';
        correction.style.color = 'red';
        erroremail.style.visibility = 'visible'
        errorconfirmemail.style.visibility = 'visible'
    } else if ( password.length === 0) {
        correction.innerHTML = 'A senha deve ser preenchida!';
        correction.style.color = 'red';
        errorpassword.style.visibility = 'visible'
    } else if ( verifyP.length === 0) {
        correction.innerHTML = 'A verificacao de senha deve ser preenchida!';
        correction.style.color = 'red';
        errorconfirmpassword.style.visibility = 'visible'
    } else if (password.length < 4 ) {
        correction.innerHTML = 'Sua senha tem que ter mais de 4 digitos, proteja suas tarefinhas ☺️';
        correction.style.color = 'red';
        errorpassword.style.visibility = 'visible'
    } 
    else if (password !== verifyP) {
        correction.innerHTML = 'A senha nao coincide! por favor preencha novamente.';
        correction.style.color = 'red';
        errorpassword.style.visibility = 'visible'
        errorconfirmpassword.style.visibility = 'visible'
    }
     else {
        
        correction.innerHTML = 'Usario Cadastrado';
        correction.style.color = 'black';
        document.getElementById('email').value = '';
        document.getElementById('confirm-email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirm-password').value = '';

        
        const newUserObj = {
            uEmail: email,
            UPassword: password,
            id: Math.random()
        };
        bdUserTemp.push(newUserObj);
        console.log('cadastrado com sucesso');
        console.log(bdUserTemp);
    }

});
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
    /* verifica se tem Qualquer tipo de string;
    Seguida por um caractere @ (que é obrigatório em e-mails);
    Seguido por algum outro texto, o domínio/provedor;
    E então temos a presença de um ponto, que também é obrigatório;
    E por fim mais um texto, validando tanto emails .com quanto .com.br, e outros que tenham terminologias diferentes*/
}
// quando o usuario comeca a digitar no input o icone volta a ficar oculto
document.getElementById('email').addEventListener('input', function() {
    erroremail.style.visibility = 'hidden';
});

document.getElementById('confirm-email').addEventListener('input', function() {
    errorconfirmemail.style.visibility = 'hidden';
});

document.getElementById('password').addEventListener('input', function() {
    errorpassword.style.visibility = 'hidden';
});

document.getElementById('confirm-password').addEventListener('input', function() {
    errorconfirmpassword.style.visibility = 'hidden';
});
