
const correction = document.getElementById('correction');
var checkedEmail = false;
var checkedCEmail = false;
var checkedPassword = false;
var checkedCPassword = false;
var okEmail = false;
var okPassword = false;
function mesageCorrection (type ,inputname , message){
    if (type == 'error') {
        correction.style.color = 'red';
    } else if (type =='done') {
        correction.style.color = 'green';
    }
        correction.innerHTML = `${inputname}${message}`;
}
function controlIcon(type, id , id2) {
    let iconErr = document.getElementById(id);
    let iconDone = document.getElementById(id2);
    if (type == 'error') {
        iconErr.style.display= 'block';
        iconDone.style.display= 'none';
    } else if (type == 'done') {
        iconErr.style.display= 'none';
        iconDone.style.display= 'block';
    }
}
function isEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
function elementsHTML (iconid1 , iconid2 , nameinput) {
    idErr = iconid1;
    idDone = iconid2;
    inputname = nameinput;
}   
function itASequel(password) {
    let re = /(123|234|345|456|567|678|789|8910|1098|987|876|765|654|543|432|321)/;
    return re.test(password);
}
function verifyEmail (email) {
    let checked1 = false;
    if (email.length ===0 ){
        mesageCorrection ('error ' , inputname , ' nao pode estar vazio');
        controlIcon ('error' , idErr , idDone);
        checked1 = false;
    } else if (isEmail(email) == false) {
        mesageCorrection('error' , inputname, ' esta incompleto precisa ser um email valido');
        controlIcon ('error' , idErr , idDone);
        checked1 = false;
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
        checked1 = false;
    } else if (itASequel(password) == true) {
        mesageCorrection ('error' , inputname, ' Nao pode ter uma sequencia de 3 numeros');
        controlIcon('error' , idErr , idDone);
        checked1 = false;
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
        return statusVariable;
    }
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
document.querySelector('#setUser').addEventListener('click', async (e) => {
    e.preventDefault();
    if (okEmail && okPassword) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const postData = {
            email: email,
            password: password
        };

        try {
            const res = await fetch('http://localhost:4000/toRegister', {
                method: 'POST',
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(postData)
            });

            if (res.status === 205) {
                mesageCorrection ('error' ,' ' , 'usuario ja existe');
                controlIcon('error', 'erroremail' , 'doneemail');
                controlIcon('error', 'errorconfirmemail' , 'doneconfirmemail');
            } else if (res.status === 201) {
                console.log('Usuário cadastrado com sucesso.');
                mesageCorrection ('error' ,' ' , 'usuario ja existe');
                controlIcon('done', 'erroremail' , 'doneemail');
                controlIcon('done', 'errorconfirmemail' , 'doneconfirmemail');
                controlIcon('done', 'errorpassword' , 'donepassword');
                controlIcon('done', 'errorconfirmpassword' , 'doneconfirmpassword');
            } else {
                console.error(`Erro ao cadastrar usuário. Status: ${res.status}`);
                alert('ERRO NO SERVIDOR, CONTATE ADM');
            }
        } catch (err) {
            console.error('Erro:', err);
            alert('ERRO NO SERVIDOR, CONTATE ADM');
        }

    } else {
        alert('Por favor, preencha os campos corretamente.');
    }
});
