import {mapInit, placeBomb, placeNumbers, displayMap, gameOver, isAdjacentNull} from './map.js';
import {} from './ui.js';



let width = 10; // Taille de la carte

let game = {
    _mapWidth: width,
    _numOfFlags: 10,
    _map: placeNumbers(placeBomb(mapInit(width))),

    get map(){
        return this._map;
    }
}

for(let i = 0; i < width; i++){
    console.log(game.map[i]);
} 

displayMap(game.map);

let tiles = document.getElementsByClassName('tile');

for (let i = 0; i < tiles.length; i++) {

    // Gestion du clic gauche
    tiles[i].addEventListener('click', function(e){

        if(!e.currentTarget.classList.contains('flaged')){ // Si la case n'est pas flag
            let x = e.currentTarget.classList[2][6]; // Troisième classe de chaque div.tile, position x ('.pos_Y_X')
            let y = e.currentTarget.classList[2][4]; // Troisième classe de chaque div.tile, position y

            if(game.map[y][x] === 'B'){
                e.currentTarget.classList.add('bomb', 'clicked', 'bombFocused'); 
                gameOver(game.map);            
            }else if(game.map[y][x] === 0){
                isAdjacentNull(game.map, y, x);
            }else{
                e.currentTarget.innerHTML=game.map[y][x];
                e.currentTarget.classList.add('clicked');
            } 
        }
    });    


    // Gestion du clic droit
    tiles[i].addEventListener('contextmenu', function(e){
        e.preventDefault();
        if(!e.currentTarget.classList.contains('clicked')){
            if(e.currentTarget.classList.contains('flaged')){
                e.currentTarget.classList.remove('flaged');
            }else{
                e.currentTarget.classList.add('flaged');
            }
        }
        return false;
    }, false);
}