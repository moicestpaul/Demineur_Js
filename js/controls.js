import {mapInit, placeBomb, placeNumbers} from './map.js';
import {displayMap, gameOver, gameVictory, isAdjacentNull, timerInit, remainingFlags, windowInit} from './ui.js';


export function initControls(map){
    let tiles = document.getElementsByClassName('tile');

    for (let i = 0; i < tiles.length; i++) {

        // Gestion du clic gauche
        tiles[i].addEventListener('click', function(e){
            if(!e.currentTarget.classList.contains('flaged')){ // Si la case n'est pas flag
                let x = e.currentTarget.classList[2][6]; // Troisième classe de chaque div.tile, position x ('.pos_Y_X')
                let y = e.currentTarget.classList[2][4]; // Troisième classe de chaque div.tile, position y

                if(map[y][x] === '-1'){
                    e.currentTarget.classList.add('bomb', 'clicked', 'bombFocused'); 
                    gameOver(map);            
                }else if(map[y][x] === 0){
                    isAdjacentNull(map, y, x);
                }else{
                    e.currentTarget.innerHTML=map[y][x];
                    e.currentTarget.classList.add('clicked');
                } 
            }
        });    


        // Gestion du clic droit
        tiles[i].addEventListener('contextmenu', function(e){
            e.preventDefault();
            if(!e.currentTarget.classList.contains('clicked')){ // 
                    
                // Si la case n'est pas marquée, alors on la marque et ondécrémente le compteur
                if(!e.currentTarget.classList.contains('flaged')){ 
                        if(parseInt(document.getElementById('score1').innerText) > 0){
                            e.currentTarget.classList.add('flaged');
                        }
                        
                        remainingFlags(map, 'remove');

                // Si la case est marquée, alors on la dé-marque et on incrémente le nb de drapeuax restants        
                }else if(e.currentTarget.classList.contains('flaged')){

                        e.currentTarget.classList.remove('flaged');
                        remainingFlags(map, 'add');

                }
            }
            return false;
        }, false);
    }
}