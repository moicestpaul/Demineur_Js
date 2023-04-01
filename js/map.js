import {initControls} from './controls.js';
import {displayMap, gameOver, isAdjacentNull, timerInit, windowInit} from './ui.js';

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

export function placeBomb (map, difficulty) {
    /*
    Fonction qui place les bombes sur une matrice donnée
    La fonction parcours la matrice pour placer les bombes aléatoirement tant que le nombre max n'est pas atteint
    --> Param: matrice carrée
    --> Retourne: Matrice avec les bombes placées

    Niveau facile : totalBombs = width / 2
    Niveau moyen : totalBombs = width + width//4
    Niveau difficile : totalBombs = width + width//2

    */

    let totalBombs = 10;

    switch (difficulty) { // On définit la taille de la carte
        case 'easy':
            totalBombs = Math.floor(map.length/2);
            break;
        case 'normal':
            totalBombs = map.length + Math.floor(map.length / 4);
            break;
        case 'hard':
            totalBombs = map.length + Math.floor(map.length / 2);
            break;
        default:
            totalBombs = 10;
            break;
    }

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
                    && map[y][x] !== '-1'){
                    // ---------
                    map[y][x] = '-1';
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
    Fonction qui génère pour chaque case le nombre de bombes adjacentes
    --> Param: matrice avec les bombes
    --> Renvoie: matrice finale avec bombes + indices adjacents
    */

    let nBombsAdj;


    // On parcours chaque cellule de la matrice
    for(let y = 0; y < map.length; y++){
        for(let x = 0; x < map.length; x++){
            if(map[y][x] !== '-1'){
                nBombsAdj = 0;

                // On vérifie les cases adjacentes de la cellule courante
                // Sans dépasser les limites de la matrice
                for(let Y = y-1;Y <= y+1; Y++){
                    for(let X = x-1;X <= x+1; X++){
                        if(Y >= 0 && Y < map.length
                            && X >= 0 && X < map.length){
                                nBombsAdj += (map[Y][X] == '-1')?1:0;
                            } 

                    }
                }
                map[y][x] = nBombsAdj;
            }

        }
    }

    return map;
}

