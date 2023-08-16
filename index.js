window.onload = () => {
    const newCardButton = document.getElementById("new-card-btn");
    const taskCreatedContainer = document.getElementById("task-created"); 
    newCardButton.addEventListener('click', () => {
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
        createCardHead.appendChild(createCardH4);
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
        createCardBody.getAttribute('class' , 'body-card');
        // Final corpo do card -----------------------------------------------

        // INICIO descrição do card -----------------------------------------------
        let createPCard = document.createElement('p');
        createPCard.getAttribute('class' , 'desc');
        createPCard.innerHTML = 'Clique no botão de editar para inserir a descrição da sua tarefa aqui';
        createCardBody.appendChild(createPCard);
        // FIM descrição do card ---------------------------------------------------

        // Adicionar a estrutura do card ao card
                /*
         <div id="card"class="card" draggable="true" ondragstart="drag(event)">
                        <div class="head-card">
                            <h4> Primeira tarefa</h4> 
                            <button id="edit-card" class="edit-card"><span class="material-symbols-outlined"> edit  </span></button>
                        </div>
                        <div class="body-card">
                             <p class="desc">Clique no icone de edicao para editar sua tarefa</p>
                        <span class="date-created-task">tarefa criada em: 09/08/2023 </span>
                        </div>
                       
                    </div>
        */         
        createCard.appendChild(createCardHead);
        createCard.appendChild(createCardBody);
        createCardHead.appendChild(createCardButtonEdit)
        createCardButtonEdit.appendChild(createSpanI);
    
        
        
    
        // Adicionar o novo card ao container adequado no DOM
        // Suponhamos que o container tenha o ID "card-container"
        taskCreatedContainer.appendChild(createCard);
        
   
        
    });

    const btnEditC = document.getElementById("edit-card");
    btnEditC.addEventListener('click', function() {
    const parentCard = this.closest('.card');
    console.log(parentCard)
    if (parentCard) {
        const parentId = parentCard.id;
        let cardEdit =  document.getElementById(parentId);
        let editableElements = cardEdit.querySelectorAll('P, h4' );
        editableElements.forEach(element => {
            if (element.tagName == 'P' || element.tagName =='H4') {
                element.setAttribute('contenteditable', 'true'); 
            }
        });
    }   
});

};
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement);
}