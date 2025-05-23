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
        case deepLore.getID_Start_play:
            console.log( 'setup!' );
            newPage = page.SETUP;
            break;
        case deepLore.getID_Start_quickgame:
            console.log( 'quickgame' );
            newPage = page.GAME;
            break;
        case deepLore.getID_Setup_back:
            console.log( 'back!' );
            newPage = page.START;
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
            pageBuilder.modify_ContentCenter( content );
            content.appendChild( pageBuilder.getHTML_Start() );
            deepLore.getButton_Start_Play.addEventListener( 'click', interact );
            deepLore.getButton_Start_QuickGame.addEventListener( 'click', interact );
            break;

        case page.SETUP:
            console.log( 'loading SETUP!');
            pageBuilder.modify_ContentTop( content );
            content.appendChild( pageBuilder.getHTML_Setup_Title() );

            console.log( 'back button' );
            console.log( deepLore.getButton_Setup_Back )
            deepLore.getButton_Setup_Back.addEventListener( 'click', interact );

            break;
        case page.GAME:
            console.log( 'loading GAME!');
            break;
        default:
            console.log( "didn't find page" );
            break;
    };
};

setup();