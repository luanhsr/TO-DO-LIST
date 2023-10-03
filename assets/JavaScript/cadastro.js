const correction = document.getElementById('correction');
var checkedEmail = false;
var checkedCEmail = false;
var checkedPassword = false;
var checkedCPassword = false;
var okEmail = false;
var okPassword = false;
function mesageCorrection (type ,inputname , messsage){
    if (type == 'error') {
        correction.style.color = 'red';
    } else if (type =='done') {
        correction.style.color = 'green';
    }
        correction.innerHTML = `${inputname}${messsage}`;
}
function controlIcon(type, id , id2) {
    let iconErr = document.getElementById(id);
    let iconDone = document.getElementById(id2);
    if (type == 'error') {
        iconErr.style.visibility = 'visible';
        iconDone.style.visibility = 'hidden';
    } else if (type == 'done') {
        iconErr.style.visibility = 'hidden';
        iconDone.style.visibility = 'visible';
    }
}
function isEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
     /* verifica se tem Qualquer tipo de string;
        Seguida por um caractere @ (que é obrigatório em e-mails);
        Seguido por algum outro texto, o domínio/provedor;
        E então temos a presença de um ponto, que também é obrigatório;
        E por fim mais um texto, validando tanto emails .com quanto .com.br, e outros que tenham terminologias diferentes*/
}
function itASequel(password) {
    let re = /(123|234|345|456|567|678|789|8910|1098|987|876|765|654|543|432|321)/;
    return re.test(password);
    /*
    verifica na senha se tem uma sequencia de tres digitos
    */
}
function verifyEmail (email) {
    let checked1 = false;
    if (email.length ===0 ){
        mesageCorrection ('error ' , inputname , ' nao pode estar vazio');
        controlIcon ('error' , idErr , idDone);
    } else if (isEmail(email) == false) {
        mesageCorrection('error' , inputname, ' esta incompleto precisa ser um email valido');

        controlIcon ('error' , idErr , idDone);
    } else if(isEmail(email) == true) {
        mesageCorrection ('done' , inputname, ' é válido');
        controlIcon ('done' , idErr , idDone);
        checked1 = true;
    }
     return checked1;
}
function verifyPassword (password) {
    let checked1 = false;
    if (password.length ===0) {
        controlIcon('error' , idErr , idDone);
        mesageCorrection ('error' , inputname, ' Nao pode ser vazio');
    } else if (password.length < 4 ) {
        mesageCorrection ('error' , inputname, ' tem que ter ao menos 4 digitos');
        controlIcon('error' , idErr , idDone);
    } else if (itASequel(password) == true) {
        mesageCorrection ('error' , inputname, ' Nao pode ter uma sequencia de 3 numeros');
        controlIcon('error' , idErr , idDone);
    } else {
        mesageCorrection ('done' , inputname, ' é válido!');
        controlIcon('done' , idErr , idDone);
        checked1 = true;
    }
    return checked1;

}
function handleComparison(value1, value2, checkedConfirm, InputsNames,  errorMsg, successMsg, errorIcon, successIcon, statusVariable) {
    if (checkedConfirm) {
        
        input1 = document.getElementById(value1).value;
        input2 = document.getElementById(value2).value;
        if (input1 === input2 ) {
            mesageCorrection('done', InputsNames , successMsg);
            controlIcon('done', errorIcon, successIcon);
            statusVariable = true;
        } else {
            mesageCorrection('error', InputsNames , errorMsg);
            controlIcon('error', errorIcon, successIcon);
            statusVariable = false;
        }
        console.log(statusVariable)
        return statusVariable;
    }
}

function elementsHTML (iconid1 , iconid2 , nameinput) {
    idErr = iconid1;
    idDone = iconid2;
    inputname = nameinput;
}   
document.getElementById('email').addEventListener('input', function() {
    elementsHTML ('erroremail' , 'doneemail' , 'email');
    checkedEmail = verifyEmail(this.value);
});
document.getElementById('confirmemail').addEventListener('input', function() {
    elementsHTML ('errorconfirmemail' , 'doneconfirmemail' , 'confirmacao de email');
    checkedCEmail = verifyEmail(this.value);
    okEmail = handleComparison(
        'email', 'confirmemail', 
        checkedCEmail,
        'Os emails ',
        'estao diferentes', 
        ' estao iguais!',
        'errorconfirmemail', 
        'doneconfirmemail', 
        okEmail)
        console.log(okEmail)
});
document.getElementById('password').addEventListener('input', function() {
    elementsHTML ('errorpassword' , 'donepassword' , 'senha');
    checkedPassword = verifyPassword(this.value);
});
document.getElementById('confirm-password').addEventListener('input', function() {
    elementsHTML ('errorconfirmpassword' , 'doneconfirmpassword' , 'confirmação de senha');
    checkedCPassword = verifyPassword(this.value);
    okPassword = handleComparison(
        'password', 'confirm-password', 
        checkedCPassword,
        'As senhas ',
        'estao diferentes', 
        ' estao iguais!',
        'errorconfirmpassword', 
        'doneconfirmpassword', 
        okPassword);
        return okPassword;
});

document.querySelector('.getUser').addEventListener('click', function(e) {
    e.preventDefault(); // Impede o comportamento padrão do formulário (que é recarregar a página)

    // Verifica se ambas as validações estão ok
    if (okEmail && okPassword) {
        // Pega os dados do formulário
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Cria um objeto com os dados
        const postData = {
            email: email,
            password: password
        };

        // Envia a requisição POST
        fetch('/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        }).then(response => response.text())
        .then(data => {
            alert(data); // Exibe a resposta do servidor
        }).catch(error => console.error('Erro:', error));
    } else {
        alert('Por favor, preencha os campos corretamente.'); // Avisa o usuário se a validação falhou
    }
});
