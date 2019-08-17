// Random bug speed.
function enemySpeed() {
    let min = 50;
    let max = 100;
    return Math.floor(Math.random() * (+max - +min) + +min);
}
// throw bugs in stone area 
function drawEnemye(score) {
    const allEnemies = [];
    let enemyPosition = 230; // set 230 because we need the stone area then divided between 4 to 6 to get  39 ,So the heigher value = 230 and smalles value = 35.
    let enemyCount ;
    // if score great than 300, make game more diffculte 😆 😆 
    score >= 300 ? enemyCount = 6 : enemyCount = 4 ;
    for (let i = 1; i <= enemyCount ; i++) {
        let speed = enemySpeed();
        let enemy = new Enemy(-60 * i, Math.floor(enemyPosition), speed);
        enemyPosition -= 40;
        allEnemies.push(enemy);
    }
    return allEnemies;
}
// check if bug and char is collison.
function isCollision(x1, y1, x2, y2) {
    if (x1 < x2 + 70 &&
        x1 + 30 > x2 &&
        y1 < y2 + 35 &&
        30 + y1 > y2) {
        return true;
    }
    return false;
}

// draw heart in bottom left of canvas.
function addLives() {
    let allLives = [] ;
    for (let i = 0; i <= 3; i++) {
        let lives = new Lives(50 * i, 520);
        allLives.push(lives);
    }
    return allLives ;
}
// Random charactiers.
function randomChar(){
    let min = 0 ;
    let max = 5 ;
    let pickChar =  Math.floor(Math.random() * (max - min) + min); 
    let chars = ['char-boy.png','char-cat-girl.png','char-horn-girl.png','char-pink-girl.png',
                'char-princess-girl.png'];
    return `images/${chars[pickChar]}`;
}