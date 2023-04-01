export function mapInit (width) {
    /* 
    Fonction de génération de la carte du jeu
    --> Param: int, taille de la carte
    --> Renvoie: matrice carrée
    */
    let map = [];
    for(let y = 0; y < width; y++){
        map.push([]);
        for(let x = 0; x < width; x++){
            map[y].push(0);
        }
    }
    return map;
};

export function placeBomb (map) {
    /*
    Fonction qui place les bombes sur une matrice donnée
    La fonction parcours la matrice pour placer les bombes aléatoirement tant que le nombre max n'est pas atteint
    --> Param: matrice carrée
    --> Retourne: Matrice avec les bombes placées

    Niveau facile : totalBombs = width + 1
    Niveau moyen : totalBombs = width + width//4
    Niveau difficile : totalBombs = width + width//2

    */
    const totalBombs = map.length + 1;
    let currentBomb = 0;

    while(currentBomb !== totalBombs){
        for(let y = 0; y < map.length; y++){
            for(let x = 0; x < map.length; x++){
                // ---------
                // On vérifie si toutes les bombes ont été placées ou non
                // Puis on place ou non une bombe, aléatoirement
                // Seulement si la case n'est pas déjà une bombe
                if(currentBomb !== totalBombs
                    && Math.round(Math.random() * totalBombs) == Math.round(totalBombs/2)
                    && map[y][x] !== 'B'){
                    // ---------
                    map[y][x] = 'B';
                    currentBomb++;
                    // ---------
                }
                x++;
            }
        }
    } 
    return map; 
};

export function placeNumbers (map) {
    /*
    Fonction qui généère pour chaque case le nombre de bombes adjacentes
    --> Param: matrice avec les bombes
    --> Renvoie: matrice finale avec bombes + indices adjacents
    */

    let nBombsAdj;


    // On parcours chaque cellule de la matrice
    for(let y = 0; y < map.length; y++){
        for(let x = 0; x < map.length; x++){
            if(map[y][x] !== 'B'){
                nBombsAdj = 0;

                // On vérifie les cases adjacentes de la cellule courante
                // Sans dépasser les limites de la matrice
                for(let Y = y-1;Y <= y+1; Y++){
                    for(let X = x-1;X <= x+1; X++){
                        if(Y >= 0 && Y < map.length
                            && X >= 0 && X < map.length){
                                nBombsAdj += (map[Y][X] == 'B')?1:0;
                            } 

                    }
                }
                map[y][x] = nBombsAdj;
            }

        }
    }

    return map;
}

export function displayMap(map) {
    /* 
    Fonction qui affiche la zone de jeu 
    --> Param: matrice de la map
    */
    let tile = null;
    document.querySelector('.game').insertAdjacentHTML('beforeend', '<div>')
    for(let y = 0; y < map.length; y++){

        // On crée un div pour chaque ligne de cases
        document.querySelector('.game').insertAdjacentHTML('beforeend', `<div></div>`);
        document.querySelector('.game').lastElementChild.classList.add(`row${y}`, 'row');

        // On rajoute les cases de chaque ligne
        for (let x = 0; x < map.length; x++) { 
            tile = `<div class='tile type_${map[y][x]} pos_${y}_${x}'></div>`;
            document.querySelector(`.row${y}`).insertAdjacentHTML('beforeend',tile);
        }
    }
} 

export function gameOver (map){
    /*
    Fonction qui conditionne le GameOver
    --> Param: matrice du jeu
    */
    document.getElementById('status').innerText = 'GAME OVER';

    let tmpTiles = document.getElementsByClassName('tile');

    for (let i = 0; i < tmpTiles.length; i++) {
        
        // On récupère les coordonnées de chaque tuile
        let tmpY = tmpTiles[i].classList[2][4];
        let tmpX = tmpTiles[i].classList[2][6];
        
        // Grâce aux coordonnées récupérées,
        // on vérifie dans la game.map le type de tuile dont il s'agit
        // Puis on affiche en fonction
        if(map[tmpY][tmpX] === 'B'){
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
        if(!upTile[0].classList.contains('clicked')){
            upTile[0].classList.add('clicked');
            if(map[y-1][x] === 1){upTile[0].innerHTML = 1}
            else{let pass = isAdjacentNull(map,y-1,x)}
        }
    }

    // Tuile de gauche
    if(x > 0 && map[y][x-1] <= 1){ 
        let leftTile = document.getElementsByClassName(`pos_${y}_${x-1}`);
        if(!leftTile[0].classList.contains('clicked')){
            leftTile[0].classList.add('clicked');
            if(map[y][x-1] === 1){leftTile[0].innerHTML = 1}
            else{let pass = isAdjacentNull(map,y,x-1)}
        }
    }

    // Tuile de droite
    if(x+1 < map.length && map[y][x+1] <= 1){ 
        let rightTile = document.getElementsByClassName(`pos_${y}_${x+1}`);
        if(!rightTile[0].classList.contains('clicked')){
            rightTile[0].classList.add('clicked');
            if(map[y][x+1] === 1){rightTile[0].innerHTML = 1}
            else{let pass = isAdjacentNull(map,y,x+1)}
        }
    }

    // Tuile du dessous
    if(y+1 < map.length && map[y+1][x] <= 1){ 
        let downTile = document.getElementsByClassName(`pos_${y+1}_${x}`);
        if(!downTile[0].classList.contains('clicked')){
            downTile[0].classList.add('clicked');
            if(map[y+1][x] === 1){downTile[0].innerHTML = 1}
            else{let pass = isAdjacentNull(map,y+1,x)}
        }
    }
    
}