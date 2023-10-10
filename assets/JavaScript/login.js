document.getElementById('login-form').addEventListener('submit' , function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/logar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(response => response.json()).then(data => {
        if (data.success) {
            console.log('Login bem-sucedido. Redirecionando...');
            window.location.href = data.redirect;
        } else {
            console.error('Erro ao fazer login:', data.message);
        }
    }).catch(error => console.error('Erro', error));
    
    
});


const correction = document.getElementById('correction');

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

document.getElementById('email').addEventListener('input', function() {
    elementsHTML ('erroremail' , 'doneemail' , 'email');
    checkedEmail = verifyEmail(this.value);
});
document.getElementById('password').addEventListener('input', function() {
    elementsHTML ('errorpassword' , 'donepassword' , 'senha');
    checkedPassword = verifyPassword(this.value);
});
