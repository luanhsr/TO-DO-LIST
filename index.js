setupEditButtons (); 
setupSaveButtons();
setupDeleteButtons ();
setupOpenMenu ();

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
function newTask() {
        let dateAndHour = getDate();
        let idRandon = Math.random();

        // Criar o elemento div para o card
        let createCard = document.createElement('div');
        createCard.setAttribute('id', 'card' + idRandon);
        createCard.setAttribute('class', 'card');
        createCard.setAttribute('draggable', 'true');
        createCard.setAttribute('ondragstart', 'drag(event)');
        createCard.setAttribute('container', 'task-created');
    
        // Criar a estrutura do card
        // INICIO header do card -----------------------------------------------------
        let createCardHead = document.createElement('div');
        createCardHead.setAttribute('class', 'head-card');
        // FIM header do card ----------------------------------------------------------
        
        // INICIO titulo do card --------------------------------------------------------
        let createCardH4 = document.createElement('h4');
        createCardH4.setAttribute('class' , 'title');
        createCardH4.innerHTML = 'Insira o nome da tarefa clicando no ícone de editar';
        
        // FINAL  titulo do car------------------------------------------------------

        // INICIO Botão editar do card -------------------------------------------
        let createCardButtonEdit = document.createElement('button');
        createCardButtonEdit.setAttribute('id', 'edit-card');
        createCardButtonEdit.setAttribute('class', 'edit-card');
        // FINAL botão editar do card ------------------------------------------------

        // INICIO icone google span do card -------------------------------------------
        let createSpanI = document.createElement('span');
        createSpanI.setAttribute('class', 'material-symbols-outlined');
        createSpanI.textContent = 'edit';
        
        // FINAL  icone google span do card -------------------------------------------

        // INICIO Botão Salvar do card -------------------------------------------


            let createCardButtonSave = document.createElement('button');
            createCardButtonSave.setAttribute('id', 'save-card');
            createCardButtonSave.setAttribute('class', 'save-card');
            // FINAL botão Salvar do card ------------------------------------------------

            // INICIO icone Salvar google span do card -------------------------------------------
            let createSpanSave = document.createElement('span');
            createSpanSave.setAttribute('class', 'material-symbols-outlined');
            createSpanSave.textContent = 'save';

         // FINAL  icone  Salvar google span do card -------------------------------------------

        // INICIO corpo do card -----------------------------------------------
        let createCardBody = document.createElement('div');
        createCardBody.setAttribute('class' , 'body-card');
        // Final corpo do card -----------------------------------------------

        // INICIO descrição do card -----------------------------------------------
        let createPCard = document.createElement('p');
        createPCard.setAttribute('class' , 'desc');
        createPCard.innerHTML = 'Clique no botão de editar para inserir a descrição da sua tarefa aqui';
        // FIM descrição do card ---------------------------------------------------

        // INICIO data criação do card ---------------------------------------------------------
    
        let createSpanCardDate = document.createElement('span');
        createSpanCardDate.setAttribute('class' , 'date-created-task');
        createSpanCardDate.innerHTML = dateAndHour;

        // INICIO ABRIR MENU DO CARD...........................................................................        
        let createSpanMore = document.createElement('span');
        createSpanMore.setAttribute('class' , 'material-symbols-outlined');
        createSpanMore.setAttribute('id' , 'more-span');
        createSpanMore.textContent = 'menu';
        // cria o span
        let createDivMore = document.createElement('div');
        createDivMore.setAttribute('class' , 'more-open');
        createDivMore.setAttribute('id' , 'more-open');
        // cria a div
        let CreateCardButtonTimer = document.createElement('button');
        CreateCardButtonTimer.setAttribute('id' , 'open-clock'); 
        CreateCardButtonTimer.setAttribute('class' , 'open-clock'); 
        // cria o botao o icone do botao de abrir cronometro
        let br = document.createElement('br');
        let createSpanTimer = document.createElement('span');
        createSpanTimer.setAttribute('class', 'material-symbols-outlined');
        createSpanTimer.textContent = 'timer';
        // cria o icone do botao de abrir cronometro
        let createCardButtonDelete = document.createElement('button');
        createCardButtonDelete.setAttribute('id', 'delete-card');
        createCardButtonDelete.setAttribute('class', 'delete-card');
        // cria o botao de deletar
        let createSpanDelete = document.createElement('span');
        createSpanDelete.setAttribute('class', 'material-symbols-outlined');
        createSpanDelete.textContent = 'delete';
        // cria o icone do botao deletar

        // FINAL ABRIR MENU DO CARD...........................................................................    
       

        // inserindo todos os elementos criados, montando o corpo do cartão.
        taskCreatedContainer.appendChild(createCard);
        createCard.appendChild(createSpanMore);
        createSpanMore.appendChild(createDivMore);
        createDivMore.appendChild(CreateCardButtonTimer);
        CreateCardButtonTimer.appendChild(createSpanTimer);
        createDivMore.appendChild(br);
        createDivMore.appendChild(createCardButtonDelete);
        createCardButtonDelete.appendChild(createSpanDelete);

        createCard.appendChild(createCardHead);
        createCardHead.appendChild(createCardH4);
        createCardHead.appendChild(createCardButtonEdit);
        createCardButtonEdit.appendChild(createSpanI);
        createCardHead.appendChild(createCardButtonSave);
        createCardButtonSave.appendChild(createSpanSave);

        createCard.appendChild(createCardBody);
        createCardBody.appendChild(createPCard);
        createCardBody.appendChild(createSpanCardDate); // nao e icone e apenas um span
        createCardButtonSave.style.display = 'none';
        createCardButtonEdit.style.display = 'block';
        createDivMore.style.display = 'none';

     /* 
                   <span class="material-symbols-outlined" id="more-span">
                            menu
                            <div class="more-open" id="more-open" style="display: none;">
                                <button id="open-clock" class="open-clock"><span class="material-symbols-outlined"> timer  </span></button>
                                <br>
                                <button id="delete-card" class="delete-card"><span class="material-symbols-outlined"> delete  </span></button>
                            </div>
                        </span>

        */


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
        // nunca usar atributos css para programar.

    }if (targetContainer.id === "task-doing") {
        draggedElement.setAttribute('container', targetContainer.id);
        
    }if (targetContainer.id === "task-completed" ) {
        draggedElement.setAttribute('container', targetContainer.id);
    }
}
// fim drag drop dos cartõe