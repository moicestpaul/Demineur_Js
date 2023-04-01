import {mapInit, placeBomb, placeNumbers} from './map.js';
import {initControls} from './controls.js';
import { gameRemove, gameStart } from './app.js';



export function displayMap(map) {
    /* 
    Fonction qui affiche la zone de jeu 
    --> Param: matrice de la map
    */
    let tile = null;
    let nBombs = 0;

    // On affiche la zone de jeu
    document.querySelector('#game').insertAdjacentHTML('beforeend', '<div>')
    for(let y = 0; y < map.length; y++){

        // On crée un div pour chaque ligne de cases
        document.querySelector('#game').insertAdjacentHTML('beforeend', `<div></div>`);
        document.querySelector('#game').lastElementChild.classList.add(`row${y}`, 'row');

        // On rajoute les cases de chaque ligne
        for (let x = 0; x < map.length; x++) { 
            tile = `<div class='tile type_${map[y][x]} pos_${y}_${x}'></div>`;
            document.querySelector(`.row${y}`).insertAdjacentHTML('beforeend',tile);
        }
    }

    // On compte le nombre de bombes dans la map
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            if(map[i][j] === '-1'){nBombs++}
        }
    }
    // On affiche le nombre de drapeaux à poser (= nb de bombes)
    if(nBombs < 10){
        document.getElementById('score1').innerText = '00'+nBombs;
    }else if(nBombs < 100){
        document.getElementById('score1').innerText = '0'+nBombs;
    }else{
        document.getElementById('score1').innerText = nBombs;
    }
    
} 

export function gameOver (map){
    /*
    Fonction qui conditionne le GameOver
    --> Param: matrice du jeu
    */
    document.getElementById('status').innerText = 'GAME OVER';
    document.getElementById('status').classList.add('gameover');


    let tmpTiles = document.getElementsByClassName('tile');

    for (let i = 0; i < tmpTiles.length; i++) {
        
        // On récupère les coordonnées de chaque tuile
        let tmpY = tmpTiles[i].classList[2][4];
        let tmpX = tmpTiles[i].classList[2][6];
        
        // Grâce aux coordonnées récupérées,
        // on vérifie dans la game.map le type de tuile dont il s'agit
        // Puis on affiche en fonction
        if(map[tmpY][tmpX] === '-1'){
            tmpTiles[i].classList.add('bomb', 'clicked'); 
        }else if(map[tmpY][tmpX] === 0){
            tmpTiles[i].classList.add('clicked');
        }else{
            tmpTiles[i].innerHTML=map[tmpY][tmpX]; 
            tmpTiles[i].classList.add('clicked'); 
        } 

        // On supprime les flags
        if(tmpTiles[i].classList.contains('flaged')){
            tmpTiles[i].classList.remove('flaged');
        }
    }
}

export function gameVictory (map){
    /*
    Fonction qui conditionne la victoire
    --> Param: matrice du jeu
    */
    document.getElementById('status').innerText = 'YOU WIN';
    document.getElementById('status').classList.add('victory');
    
    let tmpTiles = document.getElementsByClassName('tile');

    for (let i = 0; i < tmpTiles.length; i++) {
        
        // On récupère les coordonnées de chaque tuile
        let tmpY = tmpTiles[i].classList[2][4];
        let tmpX = tmpTiles[i].classList[2][6];
        
        // Grâce aux coordonnées récupérées,
        // on vérifie dans la game.map le type de tuile dont il s'agit
        // Puis on affiche en fonction
        if(map[tmpY][tmpX] === '-1'){
            tmpTiles[i].classList.add('bomb', 'clicked', 'defused'); 
        }else if(map[tmpY][tmpX] === 0){
            tmpTiles[i].classList.add('clicked');
        }else{
            tmpTiles[i].innerHTML=map[tmpY][tmpX]; 
            tmpTiles[i].classList.add('clicked'); 
        } 

        // On supprime les flags
        if(tmpTiles[i].classList.contains('flaged')){
            tmpTiles[i].classList.remove('flaged');
        }
    } 
}

export function isAdjacentNull (map, y, x){
    /*
    Lorsqu'on clique sur une case vide (= non adjacente d'une bombe),
    cette fonction vérifie si les cases adjacentes sont elles aussi vides,
    Et si oui, les définies comme 'cliquées'
    --> Param: map: matrice du jeu, y,x: position de la case cliquée
    */
    x = parseInt(x);
    y = parseInt(y);

    let currentTile = document.getElementsByClassName(`pos_${y}_${x}`);
    currentTile[0].classList.add('clicked');

    // Tuile du dessus
    if(y > 0 && map[y-1][x] <= 1){ 
        let upTile = document.getElementsByClassName(`pos_${y-1}_${x}`);
        if(!upTile[0].classList.contains('clicked') && !upTile[0].classList.contains('flaged')){
            upTile[0].classList.add('clicked');
            if(upTile[0].classList.contains('flaged')){upTile[0].classList.remove('flaged')}
            if(map[y-1][x] === 1){upTile[0].innerHTML = 1}
            else{let pass = isAdjacentNull(map,y-1,x)}
        }
    }

    // Tuile de gauche
    if(x > 0 && map[y][x-1] <= 1){ 
        let leftTile = document.getElementsByClassName(`pos_${y}_${x-1}`);
        if(!leftTile[0].classList.contains('clicked') && !leftTile[0].classList.contains('flaged')){
            leftTile[0].classList.add('clicked');
            if(leftTile[0].classList.contains('flaged')){leftTile[0].classList.remove('flaged')}
            if(map[y][x-1] === 1){leftTile[0].innerHTML = 1}
            else{let pass = isAdjacentNull(map,y,x-1)}
        }
    }

    // Tuile de droite
    if(x+1 < map.length && map[y][x+1] <= 1){ 
        let rightTile = document.getElementsByClassName(`pos_${y}_${x+1}`);
        if(!rightTile[0].classList.contains('clicked') && !rightTile[0].classList.contains('flaged')){
            rightTile[0].classList.add('clicked');
            if(rightTile[0].classList.contains('flaged')){rightTile[0].classList.remove('flaged')}
            if(map[y][x+1] === 1){rightTile[0].innerHTML = 1}
            else{let pass = isAdjacentNull(map,y,x+1)}
        }
    }

    // Tuile du dessous
    if(y+1 < map.length && map[y+1][x] <= 1){ 
        let downTile = document.getElementsByClassName(`pos_${y+1}_${x}`);
        if(!downTile[0].classList.contains('clicked') && !downTile[0].classList.contains('flaged')){
            downTile[0].classList.add('clicked');
            if(downTile[0].classList.contains('flaged')){downTile[0].classList.remove('flaged')}
            if(map[y+1][x] === 1){downTile[0].innerHTML = 1}
            else{let pass = isAdjacentNull(map,y+1,x)}
        }
    }
    
}

export function timerInit(){
    /*
    Fonction de mise à jour du timer (compteur de secondes)
    Aucun paramètre ni renvoi, met seulement à jour l'élément si la partie est en cours
    */
    if(document.getElementById('status').innerText !== 'GAME OVER'
        && document.getElementById('status').innerText !== 'YOU WIN'){
        let time = parseInt(document.getElementById('score2').innerText);
        let timeStr = '';

        time++;

        if(time < 10){
            timeStr = '00'+time;
        }else if(time < 100){
            timeStr = '0'+time;
        }else{
            timeStr = time;
        }

        document.getElementById('score2').innerText = timeStr;        
    }
}

export function remainingFlags(map,e){
    /*
    Fonction appelée à chaque pose/depose d'un drapeau
    Vérifie et met à jour le nombre de drapeaux restants
    Déclenche la victoire si tous les drapeaux sont posés au bon endroit
    */
    let flagsCount = parseInt(document.getElementById('score1').innerText);
    
    if(e === 'remove'){ // Un drapeau a été posé, on diminue le compteur

        if(flagsCount > 0){
            flagsCount--;

            if(flagsCount < 10){
                document.getElementById('score1').innerText = '00'+flagsCount;
            }else if(flagsCount < 100){
                document.getElementById('score1').innerText = '0'+flagsCount;
            }else{
                document.getElementById('score1').innerText = flagsCount;
            }
        }
        
        if(flagsCount === 0){ // Le compteur est à 0, on vérifie si le joueur a gagné 

            let flags = document.getElementsByClassName('flaged');
            let victory = 0;

            for (let i = 0;i < flags.length; i++) {
                let y = flags[i].classList[2][4];
                let x = flags[i].classList[2][6];
                victory += (map[y][x] === '-1')?1:0;
            }

            if(victory == flags.length){
                gameVictory(map);
            }

        }
    }else if(e === 'add'){ // Un drapeau a été enlevé, on le rajoute au compteur de drapeaux restants
        flagsCount++;

        if(flagsCount < 10){
            document.getElementById('score1').innerText = '00'+flagsCount;
        }else if(flagsCount < 100){
            document.getElementById('score1').innerText = '0'+flagsCount;
        }else{
            document.getElementById('score1').innerText = flagsCount;
        }
    }else{
        console.error('Wrong paramter in function remainingFlags() : \'add\' or \'remove\' expected');
    }
}

export function windowInit(){
    document.getElementById('fichier_button').addEventListener('click', function(){

        if(document.getElementById('menu_list').style.display == 'flex'){
            document.getElementById('menu_list').style.display = 'none';
        }else{
            document.getElementById('menu_list').style.display = 'flex'
        }

    })

    document.getElementById('new_game_menu').addEventListener('click', function(){

        // On ferme le menu
        document.getElementById('menu_list').style.display = 'none';

        // On lance une nouvelle partie
        gameRemove();
        gameStart('easy');
        
    })
}
