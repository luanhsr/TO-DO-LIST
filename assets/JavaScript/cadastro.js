function controlIcon(id, visibility) {
    const element = document.getElementById(id);
    element.style.visibility = visibility;
}
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
     /* verifica se tem Qualquer tipo de string;
        Seguida por um caractere @ (que é obrigatório em e-mails);
        Seguido por algum outro texto, o domínio/provedor;
        E então temos a presença de um ponto, que também é obrigatório;
        E por fim mais um texto, validando tanto emails .com quanto .com.br, e outros que tenham terminologias diferentes*/
}
function verifyEmail (email) {
    let correction = document.getElementById('correction');
    if (email.length ===0 ){
        correction.innerHTML === `'O campo ${nameInput} deve ser preenchido'`;
        controlIcon(error , 'visible');
        controlIcon(done  , 'hidden');
    } else if (validateEmail(email) == false) {
        correction.innerHTML = `O campo ${nameInput} esta incompleto`
        correction.style.color = 'red';
        controlIcon(error , 'visible');
        controlIcon(done  , 'hidden');
    } else if(validateEmail(email) == true) {
        correction.innerHTML = `${nameInput} completo!`;
        correction.style.color = 'green';
        controlIcon(done , 'visible');
        controlIcon(error  , 'hidden');
        const checked1 = true;
    }
}
document.getElementById('email').addEventListener('input', function() {
    error = 'erroremail';
    done = 'doneemail';
    nameInput = 'Email';
    email = this.value;
    verifyEmail(this.value);
  

});

document.getElementById('confirmemail').addEventListener('input', function() {
    error = 'errorconfirmemail';
    done = 'doneconfirmemail';
    nameInput = 'Email confirmação';
    verifyEmail(this.value);
    email = this.value;

});
