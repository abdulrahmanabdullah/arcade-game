// this method call it when user win or lose.
function getModal(title, message, isWin) {
    let modal = document.querySelector('.modal');
    let modalHeader = document.getElementById('modal-title');
    let modalContent = document.getElementById('modal-content');

    // make modal appear  
    modal.classList.add('open');
    modal.style.display = 'block';
    modal.style.top = '25%';

    // set modal title and content depend when call this function -> win or lose 
    modalHeader.textContent = title;
    modalContent.textContent = message;

    let instance = M.Modal.init(modal);
    closeModal(isWin, instance);
}

// Close Modal event listenre ... 
function closeModal(isWin, instance) {
    let closeModalUI = document.querySelector('.btn');
    closeModalUI.textContent = "Replay";
    if (!isWin) {
        closeModalUI.classList.add('red');
        closeModalUI.style.textColor = 'white';
    } else {
        closeModalUI.classList.add('green');
        closeModalUI.style.textColor = 'white';
    }
    closeModalUI.addEventListener('click', e => {
        instance.destroy();
        location.reload(true);
    });
}

// Show user score win reach the water area 
function showToast(score) {
    M.toast({ html: `You get ${score} score 👍` });
}

// call modal when user win .
function checkPlayerScore(score){
    if(score === 500){
        getModal("Greate you win", "You made it ",true);
    }
}
