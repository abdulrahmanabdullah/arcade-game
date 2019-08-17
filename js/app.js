// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.minWidth = this.x - 70;
    this.maxWidth = this.x + 70;
    this.minHeight = this.y - 60;
    this.maxHeight = this.y + 60;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    this.x = this.x + this.speed * dt * 4;
    if (this.x > 510) {
        this.x = -70;
        this.speed = enemySpeed();
    }
    // when bug collision char 
    if (isCollision(player.x, player.y, this.x, this.y)) {
        sounds.crash();
        // back to the start point
        player.resetGame();
        allLives.pop();
        if (allLives.length === 0) {
            getModal('Game Over', 'you lost all lives Play again to win', false);
            stopGame();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player Class
function Player() {
    this.startX = 505 / 2.5;
    this.x = this.startX;
    this.startY = 606 / 4 * 2.9;
    this.y = this.startY;
    this.speed = 1;
    this.imagePlayer = randomChar();
    this.playerScore = 0;
    this.resetGame = () => {
        this.x = this.startX;
        this.y = this.startY;
    }

    this.handleInput = (keys) => {


        // x axis 
        if (keys === 'left') {
            this.x -= 25;
            if (this.x <= 0) {
                this.x = 0;
            }

        }
        // x axis
        else if (keys === 'right') {
            this.x += 50;
            if (this.x >= 400) {
                this.x = 400;
            }

        }
        // y axis
        else if (keys === 'up') {
            this.y -= 50;
            if (this.y <= -1) {
                this.y = -10;
                sounds.win();
                this.playerScore += 100;
                showToast(this.playerScore);
                this.resetGame();
                checkPlayerScore(this.playerScore);
                // make game more diffculte when user get 300 score. 
                allEnemies = drawEnemye(this.playerScore);
            }
            // this.playerScore >= 50 ? getModal('You Win','you made it ') : this.player += 50 ; 

        }
        // y axis
        else if (keys === 'down') {
            this.y += 50;
            if (Math.floor(this.y) >= 439) {
                this.y = 439;
            }
        }
        // change char :: 
        else if (keys === 'space') {
            sounds.flipe();
            this.imagePlayer = randomChar();
        }
    }

    this.update = () => {

    }

    this.render = () => {
        ctx.drawImage(Resources.get(this.imagePlayer), this.x, this.y);
    }
}


document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// lives 
function Lives(x, y) {
    this.x = x;
    this.y = y;
    this.heart = 'images/Heart.png';
    this.render = () => {
        ctx.drawImage(Resources.get(this.heart), this.x, this.y, 40, 80);
    }
}

//Score class 
function Score() {
    this.render = () => {
        ctx.font = "20px Arail";
        ctx.fillStyle = 'white';
        ctx.fillText(`Score ${player.playerScore}/500`, 350, 580);
    }
}

// Sound track class 
function SoundTrack() {

    this.win = () => {
        let audio = new Audio('../sounds/win.wav');
        audio.play();
    }

    this.crash = () => {
        let audio = new Audio('../sounds/crash.wav');
        audio.play();
    }
    this.flipe = () => {
        let audio = new Audio('../sounds/flipe.mp3');
        audio.play();
    }
}

// instance objects .. 
let player = new Player();
let score = new Score();
let sounds = new SoundTrack();


// Call helper methods..
let allLives = addLives();
let allEnemies = drawEnemye(player.playerScore);


//Stop enemy 
function stopGame() {
    allEnemies = [];
}


