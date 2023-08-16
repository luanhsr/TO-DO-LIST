window.onload = () => {
    const newCardButton = document.getElementById("new-card-btn");
    newCardButton.addEventListener('click', () => {
        console.log('Novo card clicado');
    });

    const btnEditC = document.getElementById("edit-card");
    btnEditC.addEventListener('click', function() {
    const parentCard = this.closest('.card');
    if (parentCard) {
        const parentId = parentCard.id;
        let cardEdit =  document.getElementById(parentId);
        let editableElements = cardEdit.querySelectorAll('p, h4' );
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