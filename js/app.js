import {mapInit, placeBomb, placeNumbers} from './map.js';
import {initControls} from './controls.js';
import {displayMap, gameOver, gameVictory, isAdjacentNull, timerInit, remainingFlags, windowInit} from './ui.js';

export function displayProgram(str){
    if(str === 'close'){
        document.getElementById("window").style.display = 'none';
        selectDifficulty()
        if(document.getElementById('menu_list').style.display == 'flex'){
            document.getElementById('menu_list').style.display = 'none';
        }

    }else if(str === 'open'){
        document.getElementById("window").style.display = 'block';
    }else{
        console.log('error');
    }
}

export function gameRemove(){
    document.getElementById('game').innerHTML = '';
}

export function selectDifficulty (){
    document.getElementById('game').innerHTML = '';
    document.getElementById('status').innerText = '';
    document.querySelector(`#game`).insertAdjacentHTML('beforeend',`
        <h4>Choisissez votre difficulté :</h4>
        <button id="button_easy">Facile</button>
        <button id="button_normal">Normal</button>
        <button id="button_hard">Difficile</button>
    `);

    document.getElementById('button_easy').addEventListener('click', function(){
        gameStart('easy');
    });

    document.getElementById('button_normal').addEventListener('click', function(){
        gameStart('normal');
    });

    document.getElementById('button_hard').addEventListener('click', function(){
        gameStart('hard');
    });

    clearInterval(timer);
    document.getElementById('score2').innerText = '000';
    document.getElementById('score1').innerText = '000';
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

    timer = setInterval(timerInit, 1000);    

    return game;
}


let timer;

let exec = windowInit();

let game = selectDifficulty();

document.getElementById('menu_close_link').addEventListener('click', function(){
    displayProgram('close');
});

document.getElementById('close').addEventListener('click', function(){
    displayProgram('close');
});

document.getElementById('demineur_button').addEventListener('click', function(){
    displayProgram('open');
});

document.getElementById('github_button').addEventListener('click', function(){
    window.open('https://github.com/moicestpaul/Demineur_Js', '_blank').focus();

});

