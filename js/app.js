import {mapInit, placeBomb, placeNumbers} from './map.js';
import {initControls} from './controls.js';
import {displayMap, gameOver, gameVictory, isAdjacentNull, timerInit, remainingFlags, windowInit} from './ui.js';

export function gameRemove(){
    document.getElementById('game').innerHTML = '';
}

export function gameStart(difficulty){

    document.getElementById('game').innerHTML = '';

    let width = 10;

    let game = { // On initialise l'objet jeu
        _mapWidth: width,
        _map: placeNumbers(placeBomb(mapInit(width), difficulty)),

        get map(){
            return this._map;
        }
    }

    displayMap(game.map);

    initControls(game.map);

    setInterval(timerInit, 1000);

    return game;
}

let exec = windowInit();

let game = gameStart('easy');

