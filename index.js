setupEditButtuns (); 
setupSaveButtuns();
if (localStorage.taskLS != null) {
    ArrayTaskLS = JSON.parse(localStorage.getItem('taskLS'));
} 
const taskCreatedContainer = document.getElementById("task-created"); 
const newCardButton = document.querySelector("#new-card-btn");
function newTask() {
        let idRandon = Math.random();

        // Criar o elemento div para o card
        let createCard = document.createElement('div');
        createCard.setAttribute('id', 'card' + idRandon);
        createCard.setAttribute('class', 'card');
        createCard.setAttribute('draggable', 'true');
        createCard.setAttribute('ondragstart', 'drag(event)');
    
        // Criar a estrutura do card
        // INICIO header do card -----------------------------------------------------
        let createCardHead = document.createElement('div');
        createCardHead.setAttribute('class', 'head-card');
        // FIM header do card ----------------------------------------------------------
        
        // INICIO titulo do card --------------------------------------------------------
        let createCardH4 = document.createElement('h4');
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
        createSpanCardDate.innerHTML = 'data aleatoria 16/08/2023'

        // inserindo todos os elementos criados, montando o corpo do cartão.
        taskCreatedContainer.appendChild(createCard);   
        createCard.appendChild(createCardHead);
        createCardHead.appendChild(createCardH4);
        createCardHead.appendChild(createCardButtonEdit);
        createCardButtonEdit.appendChild(createSpanI);
        createCard.appendChild(createCardBody);
        createCardBody.appendChild(createPCard);
        createCardBody.appendChild(createSpanCardDate);
        setupEditButtuns(); 
        setupSaveButtuns();
}
newCardButton.addEventListener('click', () => {
    newTask();    
});

ArrayTaskLS = []; // array para receber notas 
function setupEditButtuns () {
    document.querySelector('#task-created').addEventListener('click', function (e) { // atribunduindo a funcao no click
        let editButton = e.target.closest('#edit-card');
        if (editButton && editButton.style.display == 'block') {
            console.log(editButton);
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

function setupSaveButtuns () {

    document.querySelector('#task-created').addEventListener('click', function (e) { // atribunduindo a funcao no click
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
                existingTask["date-created-task"] = ObjTask["date-created-task"];
                console.log('encontrado e editado')
                
            } else {
                // se nao existir ira salvar
                console.log('Não encontrado no array');
                ArrayTaskLS.push(ObjTask);
                console.log('Agora foi salvo');
            }
            ObjTask['position'] = parentCard.getAttribute('container');
            localStorage.setItem('taskLS', JSON.stringify(ArrayTaskLS)); 
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