window.onload = () => {
    const newCardButton = document.getElementById("new-card-btn");
    newCardButton.addEventListener('click', () => {
        let createCard = document.createElement('div');
        let idRandon = Math.random();
        createCard.setAttribute('id' , 'card' + idRandon);
        createCard.setAttribute('class' , card); // para receber todos os atributos CSS ja criados no cartao padrao.
        createCard.setAttribute('draggable' , 'true');
        createCard.setAttribute('ondragstart' , 'drag(event)');
        let createCardHead = document.createElement('div');
        createCardHead.setAttribute('class' , 'head-card');
        let createCardH4 = document.createElement('h4');
        createCardH4.innerHTML = 'Insira o nome da tarefa clicando no icone de editar'
        let createCardButtonEdit = document.createElement('button');
        createCardButtonEdit.setAttribute('id' , );
        
        

        /*

                <button id="edit-card" class="edit-card"><span class="material-symbols-outlined"> edit  </span></button>
            </div>
            <div class="body-card">
                 <p class="desc">Clique no icone de edicao para editar sua tarefa</p>
            <span class="date-created-task">tarefa criada em: 09/08/2023 </span>
            </div>
           
        </div> */
    });

    const btnEditC = document.getElementById("edit-card");
    btnEditC.addEventListener('click', function() {
    const parentCard = this.closest('.card');
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