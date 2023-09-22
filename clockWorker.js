let miliNum = 0;
let segNum = 0;
let minNum = 0;
let INTERVALO;

self.onmessage = function (event)  {
    if (event.data.action === 'iniciar') {
        iniciar();
    } else if (event.data.action === 'parar') {
        parar();
    } else if (event.data.action === 'reset') {
        resetar();
    }
}

function milissegundos() {
    miliNum++;
    if (miliNum == 100) {
        miliNum = 0;
        segundos();
    }
}

function segundos() {
    segNum++;
    if (segNum == 60) {
        segNum = 0;
        minutos();
    }
    self.postMessage({ min: minNum, sec: segNum });
}

function minutos() {
    minNum++;
}

function iniciar() {
    clearInterval(INTERVALO);
    INTERVALO = setInterval(() => {
        milissegundos();
    }, 10);
}

function parar() {
    clearInterval(INTERVALO);
}

function resetar() {
    clearInterval(INTERVALO);
    miliNum = 0;
    segNum = 0;
    minNum = 0;
    self.postMessage({ min: 0, sec: 0 });
}
