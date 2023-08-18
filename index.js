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
        
    });

    const btnEditC = document.getElementById("edit-card");
    const btnSave = document.getElementById("save-card");
    btnEditC.addEventListener('click', function() {
        let displayVal = btnEditC.style.display; // variável recebe o display do elemento, para verificar se está padrão ou none
        if (displayVal ==  'block') { // se estiver block (padrão) quer dizer que está visível então poderá realizar as instruções
            const parentCard = this.closest('.card'); // pega o elemento parente pai clicado.
            if (parentCard) {
                const parentId = parentCard.id; // pega o id desse elemento pai 
                let cardEdit =  document.getElementById(parentId); // pega o elemento pai selecionado no documento.
                let editableElements = cardEdit.querySelectorAll('P, h4' ); // pega todos os elementos P e H4 e salva em um array
                editableElements.forEach(element => { // faz uma busca em todos os elementos desse Array
                    if (element.tagName == 'P' || element.tagName =='H4') { // se os elementos forem Parágrafo ou Titulo H4
                        element.setAttribute('contenteditable', 'true');   // recebe o atributo citado os tornando editáveis.
                    }
                }); 
            }
            btnEditC.style.display = 'none'; // transforma o botão de editar com o estilo 'none'
            btnSave.style.display = 'block'; // transforma o botão salvar com o estilo block
            // um some o outro aparece.
        } 
    });
    btnSave.addEventListener('click', function() { // ao clicar
        let displayVal = btnSave.style.display; // pega o atributo display do botão save
        if (displayVal == 'block') { // verifica se está block 
            btnEditC.style.display = 'block'; // torna o botão EDIT visível.
            btnSave.style.display = 'none'; // torna o botão save invisível.
        }
    });

};

// drag e drop dos cartões: 
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
// fim drag drop dos cartõe