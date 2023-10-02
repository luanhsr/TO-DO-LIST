const correction = document.getElementById('correction');
var checkedEmail = false;
var checkedCEmail = false;
var checkedPassword = false;
var checkedCPassword = false;
var okEmail = false;
var okPassowrd = false;
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
        mesageCorrection('error' , inputname, ' esta incompleta precisa ser um email valido');

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
function compareValues(value1, value2) {
    var inputValue1 = document.getElementById(value1).value;
    var inputValue2 = document.getElementById(value2).value;
    return inputValue1 == inputValue2;
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
    if (checkedCEmail == true ){
        if (compareValues('email' , 'confirmemail') === true ) {
            mesageCorrection('done' , 'Os campos Emails' , ' estao corretos');;
            okEmail = true;
            controlIcon('done', 'errorconfirmemail' , 'doneconfirmemail');
            console.log(okEmail);

        } else {
            mesageCorrection('error' , 'Os e-mails' , ' estao diferentes');
            controlIcon('error', 'errorconfirmemail' , 'doneconfirmemail');
            okEmail = false;
            console.log(okEmail);
        }
    }
});
document.getElementById('password').addEventListener('input', function() {
    elementsHTML ('errorpassword' , 'donepassword' , 'senha');
    verifyPassword(this.value);
});
document.getElementById('confirm-password').addEventListener('input', function() {
    elementsHTML ('errorconfirmpassword' , 'doneconfirmpassword' , 'confirmação de senha');
    checkedCPassword = verifyPassword(this.value);
    console.log(checkedCPassword)
    if (checkedCPassword == true ){
        if (compareValues('password' , 'confirm-password') === true ) {
            mesageCorrection('done' , 'As senhas' , ' estao iguais');;
            okPassowrd = true;
            controlIcon('done', 'errorconfirmpassword' , 'doneconfirmpassword');
            console.log(okPassowrd)
        } else {
            mesageCorrection('error' , 'As senhas' , ' estao difrentes');
            controlIcon('error', 'errorconfirmpassword' , 'doneconfirmpassword');
            okPassowrd = false;
            console.log(okPassowrd)
        }
    }
});