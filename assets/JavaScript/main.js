setupEditButtons (); 
setupSaveButtons();
setupDeleteButtons ();
setupOpenMenu ();
setupOpenClock ();
setupMoveCard ();
setupClock ();
if (localStorage.taskLS != null) {
    ArrayTaskLS = JSON.parse(localStorage.getItem('taskLS'));
} 
function getDate () {
    data = new Date()
    let hourCreate = data.toLocaleTimeString();
    let dateCreate = data.toLocaleDateString();
    let dateAndHour = ` criada em: ${dateCreate} ${hourCreate}`
    return dateAndHour;
}
const taskCreatedContainer = document.getElementById("task-created"); 
const newCardButton = document.querySelector("#new-card-btn");
let clockWorkers = {};
function newTask() {
        let taskCreated = document.getElementById('task-created');
        let dateAndHour = getDate();
        let idRandon = Math.random();

        // Criar o elemento div para o card
        let createCard = document.createElement('div');
        createCard.setAttribute('id', 'card' + idRandon);
        createCard.setAttribute('class', 'card');
        createCard.setAttribute('draggable', 'true');
        createCard.setAttribute('ondragstart', 'drag(event)');
        createCard.setAttribute('container', 'task-created');
        createCard.innerHTML = `
        <span class="material-symbols-outlined" id="more-span">
            menu
            <div class="more-open" id="more-open" style="display: none;">
                <button id="open-clock" class="open-clock"><span class="material-symbols-outlined"> timer  </span></button>
                <br>
                <button id="delete-card" class="delete-card"><span class="material-symbols-outlined"> delete  </span></button>
            </div>
        </span>
        <div class="head-card">
                
            </span>
            <p class="title-card" id="title-card"> Clique no icone para editar a tarefa</p>
            <button id="save-card" class="save-card" style="display:none;"><span class="material-symbols-outlined" > save  </span></button>
            <button id="edit-card" class="edit-card" style="display:block;"><span class="material-symbols-outlined"> edit  </span></button>

        </div>

        <div class="body-card" id="body-card">
             <p class="desc">Digique aqui sua tarefa, clicando no icone de editar</p>
            <div class="clock-container" id="clock-container" style="display: none;">
                <h3 class="title-clock" id="title-clock"> <b> Cronometro</b></h3>
                <div class="display-clock" id="display-clock">
                    <span class="min" id="min">00</span>:<span class="sec" id="sec">00</span>
                </div>
                <div class="clock-control" id="clock-control">
                <span class="material-symbols-outlined"  id="play-clock" class="play-clock">
                play_circle
                </span>
                <span class="material-symbols-outlined" id="pause-clock" class="pause-clock" >
                    pause_circle
                </span>
                <span class="material-symbols-outlined" id="stop-clock" class="stop-clock">
                    stop_circle
                </span>
                </div>
            </div>
            <br>
            <span class="date-created-task">${dateAndHour}  </span>
            <div class="container-move-card" id="container-move-card">
                <button class="move-card-left" id="move-card-left"  style="visibility: hidden" style="display: block;"><span class="material-symbols-outlined">
                    arrow_back
                    </span></button>

                <button class="move-card-completed" id="move-card-completed" style="display: none;"  style="visibility: hidden"><span class="material-symbols-outlined">
                    done
                    </span></button>
                 
                <button class="move-card-right" id="move-card-right"  style="visibility: visible;" style="display: block;"><span class="material-symbols-outlined">
                        arrow_forward
                </span></button>
            </div>
        </div>`
        let clockWorker = new Worker('clockWorker.js');
        let clockContainer = createCard.querySelector('#clock-container');
        setupClock();
        clockWorkers[createCard.id] = clockWorker;
        taskCreated.appendChild(createCard);


}
newCardButton.addEventListener('click', () => {
    newTask();    
});

ArrayTaskLS = []; // array para receber notas 
function setupEditButtons () {
    document.querySelector('.menu-cards').addEventListener('click', function (e) { // atribunduindo a funcao no click
        let editButton = e.target.closest('#edit-card');
        if (editButton && editButton.style.display == 'block') {
            let parentCard = editButton.closest('.card');
            if (parentCard) {
                let displayVal = editButton.style.display;
                if (displayVal === 'block') {
                    let editableElements = parentCard.querySelectorAll('p, h4, button');
                    editableElements.forEach(element => {
                        if (element.tagName === 'P' || element.tagName === 'H4') {
                            element.setAttribute('contenteditable', 'true');
                        }
                        if (element.tagName.toLowerCase() ==='button') {
                            if (element.id == ('save-card')) {
                                saveButton = element;
                            }
                        }
                    });
                    editButton.style.display = 'none';
                    saveButton.style.display = 'block';
                }
            }
        }

    });   
}
function setupSaveButtons () {

    document.querySelector('.menu-cards').addEventListener('click', function (e) { // atribunduindo a funcao no click
        let saveButton = e.target.closest('#save-card');
        if (saveButton && saveButton.style.display == 'block') {
            let ObjTask = new Object();
            let parentCard = saveButton.closest('.card');
            if (parentCard) {
                let displayVal = saveButton.style.display;
                if (displayVal === 'block') {
                    let editableElements = parentCard.querySelectorAll('.title , .desc , .date-created-task, button');
                    editableElements.forEach(element => {
                        if (element.className == 'title'){
                            ObjTask["title"] = element.innerHTML;
                            element.setAttribute('contenteditable', 'false');
                        }
                        if (element.className == 'desc'){
                            ObjTask["desc"] = element.innerHTML;
                            element.setAttribute('contenteditable', 'false');
                        }
                        if (element.className == 'date-created-task'){
                            ObjTask["dateCreatedTask"] = element.innerHTML;
                            element.setAttribute('contenteditable', 'false');
                        }
                        if (element.tagName.toLowerCase() ==='button') {
                            if (element.id == ('edit-card')) {
                                editButton = element;
                            }
                        }
                    });
                    editButton.style.display = 'block';
                    saveButton.style.display = 'none';
                    ObjTask['container'] = parentCard.getAttribute('container');
                }
            }
            ObjTask['id'] = parentCard.id; // salva o id da task especifica selecionada.
            function isSaved(task) { // funcao que retorna uma comparacao entre o id da task com o id do card selecionado
                // isso e para que a funcao nativa find funcione do jeito que eu quero.
                return task.id === parentCard.id; 
            }
            let existingTask = ArrayTaskLS.find(isSaved); // uma variavel que ira receber se existe uma task no array ja salva com o id selecionado
            if (existingTask) {
                // se existir, ira substituir
                existingTask.title = ObjTask.title;
                existingTask.desc = ObjTask.desc;
                existingTask.dateCreatedTask = ObjTask.dateCreatedTask;
                existingTask.container = ObjTask.container;           
            } else {
                // se nao existir ira salvar
                ArrayTaskLS.push(ObjTask);
            }
            ObjTask['position'] = parentCard.getAttribute('container');
            localStorage.setItem('taskLS', JSON.stringify(ArrayTaskLS)); 
        }
    });
    
}
function setupOpenMenu () {
        document.querySelector('.menu-cards').addEventListener('click', function (e) { // atribunduindo a funcao no click
            let moreOpen = e.target.closest('#more-span');
            if (moreOpen) {
                let parentCard = moreOpen.closest('.card');
                let moreOpenDiv = parentCard.querySelector('.more-open');
                let visible = moreOpenDiv.getAttribute('style' , 'display');
                if (visible == 'display: none;') {
                    moreOpenDiv.style.display = 'block';
                } else {
                    moreOpenDiv.style.display = 'none';
                }

            }
    });
}
function setupDeleteButtons () {
    document.querySelector('.menu-cards').addEventListener('click', function (e) { 
        let deletButton = e.target.closest('#delete-card');
        if (deletButton) {
            let parentCard = deletButton.closest('.card');
            var r=confirm("Deseja excluir a nota?");
            if (r==true)
              { 
                parentCard.remove();
                
                function isSaved(task) { // funcao que retorna uma comparacao entre o id da task com o id do card selecionado
                    // isso e para que a funcao nativa find funcione do jeito que eu quero.
                    return task.id === parentCard.id; 
                }
                let existingTask = ArrayTaskLS.find(isSaved); // uma variavel que ira receber se existe uma task no array ja salva com o id selecionado
                if (existingTask) {
                    // se existir, ira substituir
                    delete existingTask.title;
                    delete existingTask.desc;
                    delete existingTask.dateCreatedTask;
                    delete existingTask.id;
                    delete existingTask.position;
                    delete existingTask.container;
                    
                } else {
                    parentCard.remove();
                }
              }    
        }

    });// atribunduindo a funcao no click
}
function setupClock() {
    document.querySelector('.menu-cards').addEventListener('click', function (e) {
        let clockContainer = e.target.closest('#clock-container');

        if (clockContainer) {
            let parentCard = clockContainer.closest('.card');
            let cardId = parentCard.id;

            if (!clockWorkers[cardId]) {
                clockWorkers[cardId] = new Worker('clockWorker.js');
            }

            let playClock = e.target.closest('#play-clock');
            let pauseClock = e.target.closest('#pause-clock');
            let stopClock = e.target.closest('#stop-clock');

            if (playClock) {
                clockWorkers[cardId].postMessage({ action: 'iniciar' });
            }

            if (pauseClock) {
                clockWorkers[cardId].postMessage({ action: 'parar' });
            }

            if (stopClock) {
                clockWorkers[cardId].postMessage({ action: 'reset' });
            }
            function getControlsHTML(clockContainer) {
                const min = clockContainer.querySelector('.min');
                const sec = clockContainer.querySelector('.sec');
                return { min, sec };
            }

            clockWorkers[cardId].onmessage = function (event) {
                let { min, sec } = event.data;
                let { min: minInnerHtml, sec: secInnerHtml } = getControlsHTML(clockContainer);
                if (minInnerHtml && secInnerHtml) {
                    minInnerHtml.textContent = min < 10 ? `0${min}` : min;
                    secInnerHtml.textContent = sec < 10 ? `0${sec}` : sec;
                }
            };
        }
    });
}

function setupMoveCard () {
    let taskDoing = document.getElementById('task-doing');
    let taskCreated = document.getElementById('task-created');
    let taskCompleted = document.getElementById('task-completed');
    
    document.querySelector('.menu-cards').addEventListener('click', function (e) { // atribunduindo a funcao no click
        let mvCardR = e.target.closest('#move-card-right'); 
        let mvCardL = e.target.closest('#move-card-left'); 
        let mvCardCl = e.target.closest('#move-card-completed'); 
        if (mvCardR) {
            let parentCard = mvCardR.closest('.card');
            let currentLocation = parentCard.parentElement.id;
            if (currentLocation==="task-created") {   
                taskDoing.appendChild(parentCard);
                let editableElements = parentCard.querySelectorAll('button');
                editableElements.forEach(element=> {
                    if (element.id === 'move-card-right') {
                        element.style.display = 'none';
                        element.style.visibility = 'hidden';
                    }
                    if (element.id==='move-card-completed') {
                        element.style.display = 'block';
                        element.style.visibility = 'visible';
                    }
                    if (element.id==='move-card-left') {
                        element.style.display = 'block';
                        element.style.visibility = 'visible';
                    }
                });
            }
        }
        if (mvCardCl) {
            let parentCard = mvCardCl.closest('.card');
            let currentLocation = parentCard.parentElement.id;
            if (currentLocation==="task-doing") {   
                taskCompleted.appendChild(parentCard);
                let editableElements = parentCard.querySelectorAll('button');
                editableElements.forEach(element=> {
                    if (element.id === 'move-card-right') {
                        element.style.display = 'none';
                        element.style.visibility = 'hidden';
                    }
                    if (element.id==='move-card-completed') {
                        element.style.display = 'none';
                        element.style.visibility = 'hidden';
                    }
                    if (element.id==='move-card-left') {
                        element.style.display = 'block';
                        element.style.visibility = 'invisible';
                    }
                });
            }
        }
        if (mvCardL) {
            let parentCard = mvCardL.closest('.card');
            let currentLocation = parentCard.parentElement.id;
            if (currentLocation==="task-completed") {
                taskDoing.appendChild(parentCard);
                let editableElements = parentCard.querySelectorAll('button');
                editableElements.forEach(element=> {
                    if (element.id === 'move-card-right') {
                        element.style.display = 'none';
                        element.style.visibility = 'hidden';
                    }
                    if (element.id==='move-card-completed') {
                        element.style.display = 'block';
                        element.style.visibility = 'visible';
                    }
                    if (element.id==='move-card-left') {
                        element.style.display = 'block';
                        element.style.visibility = 'visible';
                    }
                });
            }
            if (currentLocation==="task-doing") {
                taskCreated.appendChild(parentCard);
                let editableElements = parentCard.querySelectorAll('button');
                editableElements.forEach(element=> {
                    if (element.id === 'move-card-right') {
                        element.style.display = 'block';
                        element.style.visibility = 'visible';
                    }
                    if (element.id==='move-card-completed') {
                        element.style.display = 'none';
                        element.style.visibility = 'hidden';
                    }
                    if (element.id==='move-card-left') {
                        element.style.display = 'block';
                        element.style.visibility = 'hidden';
                    }
                });
            }
            
        }

    });    
}
function setupOpenClock () {
    document.querySelector('.menu-cards').addEventListener('click', function (e) { 
        let openClockBtn = e.target.closest('#open-clock');
        if (openClockBtn) {
            let parentCard = openClockBtn.closest('.card');
            let containerClock = parentCard.querySelector('.clock-container');
            let visible = containerClock.getAttribute('style' , 'display');
            if (visible == 'display: none;') {
                containerClock.style.display = 'block';
            } else {
                containerClock.style.display = 'none';
            }
        }
    });
}
function allowDrop(event) {
    event.preventDefault();
}
function drag(event) {
    event.dataTransfer.setData('text', event.target.id); // função ativada ao clicar e segurar o elemento, ele pode ser arrastado
}
function drop(event) { // função ativa ao soltar o elemento.
    event.preventDefault(); // previne que o navegador não execute comportamento padrão de arrastar soltar, por exemplo abrir imagem em outra guia
    const data = event.dataTransfer.getData('text'); // transfere todos os dados, no caso para tipo texto;
    const draggedElement = document.getElementById(data); // pega o elemento com o id exclusivo
    event.target.appendChild(draggedElement); // aqui adiciona o cartão ao container que ele vai ser arrastado
    const targetContainer = event.target; // verifica em qual local o elemento é solto;
    // os ifs realiza cada comportamento conforme o cartão é solto em containers diferentes: 
    if (targetContainer.id === "task-created") { 
        draggedElement.setAttribute('container', targetContainer.id);
        let editableElements = draggedElement.querySelectorAll('button');
            editableElements.forEach(element=> {
                if (element.id === 'move-card-right') {
                        element.style.display = 'block'
                        element.style.visibility = 'visible'
                }
                if (element.id==='move-card-completed') {
                        element.style.display = 'none'
                        element.style.visibility = 'hidden'
                }
                if (element.id==='move-card-left') {
                        element.style.display = 'block';
                        element.style.visibility = 'hidden';
                }
        });

        // nunca usar atributos css para programar.
    }if (targetContainer.id === "task-doing") {
        draggedElement.setAttribute('container', targetContainer.id);
        let editableElements = draggedElement.querySelectorAll('button');
        editableElements.forEach(element=> {
            if (element.id === 'move-card-right') {
                    element.style.display = 'none'
                    element.style.visibility = 'hidden'
            }
            if (element.id==='move-card-completed') {
                    element.style.display = 'block'
                    element.style.visibility = 'visible'
            }
            if (element.id==='move-card-left') {
                    element.style.display = 'block';
                    element.style.visibility = 'visible';
            }
        });
        
        
    }if (targetContainer.id === "task-completed" ) {
        draggedElement.setAttribute('container', targetContainer.id);
        let editableElements = draggedElement.querySelectorAll('button');
        editableElements.forEach(element=> {
            if (element.id === 'move-card-right') {
                    element.style.display = 'none'
                    element.style.visibility = 'hidden'
            }
            if (element.id==='move-card-completed') {
                    element.style.display = 'block'
                    element.style.visibility = 'visible'
            }
            if (element.id==='move-card-left') {
                    element.style.display = 'block';
                    element.style.visibility = 'visible';
            }
        });
    }
}
// fim drag drop dos cartõe