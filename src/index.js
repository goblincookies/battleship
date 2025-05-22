import './assets/style.css';
import { PageBuilder, DeepLore } from './assets/modules/HTMLbuilder.';

console.log( 'hello world!' );

const page = {
    UNKOWN: 0,
    START: 1,
    SETUP: 2,
    GAME: 3
}

const pageBuilder = new PageBuilder();
const deepLore = new DeepLore();

const content = document.getElementById( 'content' );
let currentPage = page.UNKOWN;

function setup(){

    // START
    currentPage = page.START;
    loadPage( currentPage );
}

function interact( e ) {
    let newPage = page.UNKOWN;

    // SET THE PAGE LOGIC
    switch( e.currentTarget.id ) {
        case 'START':
            newPage = page.START;
            break;
        case deepLore.Get_ID_Setup_play:
            console.log( 'setup!' );
            newPage = page.SETUP;
            break;
        case deepLore.Get_ID_Setup_quickgame:
            console.log( 'quickgame' );
            newPage = page.GAME;
            break;
        default:
            break;
    };

    if ( newPage != currentPage && newPage != page.UNKOWN ) {
        currentPage = newPage;
        loadPage( currentPage );
    };
};

function loadPage( pageToLoad ){
    content.textContent = '';

    // RENDER THE PAGE
    switch( pageToLoad ) {
        case page.START:
            console.log( 'loading start page!')
            content.appendChild( pageBuilder.getHTML_Start() );
            deepLore.Get_Button_Setup_Play.addEventListener( 'click', interact );
            deepLore.Get_Button_Setup_QuickGame.addEventListener( 'click', interact );
            break;

        case page.SETUP:
            console.log( 'loading SETUP!');
            break;
        case page.GAME:
            console.log( 'loading SETUP!');
            break;
        default:
            console.log( "didn't find page" );
            break;
    };
};

setup();