import './assets/style.css';
import { PageBuilder, DeepLore } from './assets/modules/HTMLbuilder';
import { Interaction, Reaction } from './assets/modules/ACTIONmanager';

console.log( 'hello world!' );

const page = {
    UNKOWN: 0,
    START: 1,
    SETUP: 2,
    SETUP_PLACE: 3,
    GAME: 4
}

const subpage = {
    UNKOWN: 0,
    DIFFICULTY:1,
    PLACE:2,
    DONE:3,
}

const difficulty = {
    EASY: 0,
    NORMAL: 1,
    HARD: 2
}

const pageBuilder = new PageBuilder();
const deepLore = new DeepLore();
const reaction = new Reaction();

const interactShipShelf = new Interaction();

const content = document.getElementById( 'content' );
let actionBar;
let currentPage = page.UNKOWN;
let currentSubPage = page.UNKOWN;
let currentDifficulty = difficulty.NORMAL;


function setup(){
    // START
    currentPage = page.START;
    loadPage( currentPage );
    window.addEventListener( 'resize', resizeWindow );
}

function gridSize( diff ){ return  6 + ( 3 * diff ) };
function shipHeight( fullHeight, diff ){ return  fullHeight / ( 6 + ( 3 * diff ) ) };

function resizeWindow( e ) {
    // console.log( 'resizing the window here!' );
    if( currentSubPage == subpage.PLACE ) {
        let height = pageBuilder.getHeight( deepLore.getSetup_GraphPaper );
        height = shipHeight( height, currentDifficulty );
        const allShips = document.querySelectorAll( '.ship' );
        interactShipShelf.update_grid( height );
        allShips.forEach( ship => {
            pageBuilder.modify_shipSize( ship, height );
        });

    };
};

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
            currentSubPage = subpage.DIFFICULTY;
            break;
        case deepLore.getID_Start_quickgame:
            console.log( 'quickgame' );
            newPage = page.GAME;
            break;
        case deepLore.getID_Setup_next:
            console.log( 'next' );
            currentSubPage += 1;
            currentSubPage = Math.min( currentSubPage, Object.keys( subpage ).length - 1 );
            
            if( currentSubPage == subpage.UNKOWN ) {
                newPage = page.START;
            } else if ( currentSubPage == subpage.DONE ) {
                newPage = page.GAME;
            } else {
                loadSubPage( currentSubPage );
            };

            break;
        case deepLore.getID_Setup_back:
            console.log( 'back!' );
            currentSubPage -= 1;
            currentSubPage = Math.max( currentSubPage, 0 );

            if( currentSubPage == subpage.UNKOWN ) {
                newPage = page.START;
            } else if ( currentSubPage == subpage.DONE ) {
                newPage = page.GAME;
            } else {
                loadSubPage( currentSubPage );
            };

            break;
        case deepLore.getID_Setup_easy:
            currentDifficulty = difficulty.EASY;
            changeDifficulty( currentDifficulty );
            break;
        case deepLore.getID_Setup_normal:
            currentDifficulty = difficulty.NORMAL;
            changeDifficulty( currentDifficulty );
            break;
        case deepLore.getID_Setup_hard:
            currentDifficulty = difficulty.HARD;
            changeDifficulty( currentDifficulty );
            break;
        case deepLore.getID_Game_Quit:
            console.log( 'Quit :(' );
            newPage = page.START;
            break;
        default:
            break;
    };

    if ( newPage != currentPage && newPage != page.UNKOWN ) {
        currentPage = newPage;
        loadPage( currentPage );
    } else if( currentSubPage != currentSubPage && currentSubPage != page.UNKOWN) {

    };
};

function changeDifficulty( currDiff ){
    const buttons = [
        deepLore.getSetup_Easy,
        deepLore.getSetup_Normal,
        deepLore.getSetup_Hard
    ]

    for( let i = 0; i < Object.keys( difficulty ).length; i++ ){
        if ( i == currDiff ){
            pageBuilder.modify_TextSelect( buttons[ i ] );
        } else{
            pageBuilder.modify_TextDeselect( buttons[ i ] );
        };
    };
    pageBuilder.modify_GraphPaper( deepLore.getSetup_GraphPaper, gridSize(currDiff) )
    // pageBuilder.modify_TextSelect( deepLore.getSetup_Easy );
    // console.log( 'easy peasy' );
    // document.querySelector
};

function loadPage( pageToLoad ){
    preCleaning();

    // RENDER THE PAGE
    switch( pageToLoad ) {
        case page.START:
            console.log( 'loading start page!')

            // pageBuilder.modify_ContentCenter( content );
            // pageBuilder.modify_ContentNarrow( content );

            content.appendChild( pageBuilder.getHTML_Start() );
            deepLore.getStart_Play.addEventListener( 'click', interact );
            deepLore.getStart_QuickGame.addEventListener( 'click', interact );
            break;

        case page.SETUP:
            console.log( 'loading SETUP!');
            // pageBuilder.modify_ContentTop( content );
            // pageBuilder.modify_ContentWide( content );

            content.appendChild( pageBuilder.getHTML_Setup_Title() );
            content.appendChild( pageBuilder.getHTML_Setup_Main( gridSize( currentDifficulty ) ) );
            // pageBuilder.modify_GraphPaper( deepLore.getSetup_GraphPaper, gridSize( currDiff ) );

            actionBar = deepLore.getSetup_ActionBar;

            // SUBPAGE
            currentSubPage = subpage.DIFFICULTY;
            loadSubPage( currentSubPage );

            deepLore.getSetup_Back.addEventListener( 'click', interact );
            // deepLore.getSetup_Back.addEventListener( 'click', interact );
            deepLore.getSetup_Next.addEventListener( 'click', interact );

            break;
        case page.GAME:
            console.log( 'loading GAME!');

            content.appendChild( pageBuilder.getHTML_Game_Title() );
            content.appendChild( pageBuilder.getHTML_Game_Main( gridSize( currentDifficulty ) ) );
            
            deepLore.getGame_Quit.addEventListener( 'click', interact );


            break;
        default:
            console.log( "didn't find page" );
            break;
    };
};

function loadSubPage( pageToLoad ) {

    if( actionBar ){
        actionBar.textContent='';
        deepLore.getSetup_GridDrop.textContent = '';
        switch( pageToLoad ) {
    
            case subpage.DIFFICULTY:
                // console.log( 'currentDifficulty:', currentDifficulty );
                actionBar.appendChild( pageBuilder.getHTML_Setup_Difficulty( currentDifficulty ) );
                deepLore.getSetup_Easy.addEventListener( 'click', interact );
                deepLore.getSetup_Normal.addEventListener( 'click', interact );
                deepLore.getSetup_Hard.addEventListener( 'click', interact );
                break;
    
            case subpage.PLACE:
                let height = pageBuilder.getHeight( deepLore.getSetup_GraphPaper );
                height = shipHeight( height, currentDifficulty );
                actionBar.appendChild( pageBuilder.getHTML_Setup_Shipshelf( height ) );
                
                // interactShipShelf.reset( deepLore.getSetup_PieceTray );
                interactShipShelf.setup( deepLore.getSetup_PieceTray, deepLore.getSetup_GridDrop );
                interactShipShelf.update_grid( height );
                interactShipShelf.watch( deepLore.getSetup_PieceTray );
                interactShipShelf.watch( deepLore.getSetup_GridDrop );

                break;
                
            default:
                break;
        };
    };
};

function preCleaning(){
    content.textContent = '';
    actionBar = null;
}

setup();