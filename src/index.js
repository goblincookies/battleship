import './assets/style.css';
import { PageBuilder, DeepLore } from './assets/modules/HTMLbuilder';
import { Interaction, Reaction } from './assets/modules/ACTIONmanager';
import { Battleship } from './assets/modules/BATTLEship';

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

const owners = {
        PLAYER: 0,
        COMPUTER: 1
};

const pageBuilder = new PageBuilder();
const deepLore = new DeepLore();
const reaction = new Reaction();
const interactShipShelf = new Interaction();
const battleship = new Battleship();

const content = document.getElementById( 'content' );
let actionBar;
let currentPage = page.UNKOWN;
let currentSubPage = page.UNKOWN;
let currentDifficulty = difficulty.NORMAL;
let isPlayerTurn = true;
let lastSelected = null;
let isHunting = false;

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

async function interactTarget( e ) {
    console.log( 'clicked a target!', e.currentTarget.id );
    
    let id = e.currentTarget.id.split( '-' )[ 1 ];
    let result = battleship.uncover( owners.PLAYER, id );
    pageBuilder.uncover( e.currentTarget, result );

    e.currentTarget.removeEventListener( 'click', interactTarget );

    let w = gridSize( currentDifficulty );

    for( let i = 0; i < w*w; i++ ) {
        // TAKE COMPUTER TURN
        result = await battleship.hunt();
        console.log( 'comp result:', result )
        
        if ( result.cellID < 0 ) {
            console.log( 'no valid cell' )
            break;
        };

        const compCell = deepLore.getCompCell( result.cellID );
        // PROCESS RESULT
        
        // CLICK
        pageBuilder.falseClick( compCell );
        // PAUSE ON CLICK
        await new Promise( ( resolve, reject ) => setTimeout( resolve, 150 ) );
        // ADD HIT OR MISS
        pageBuilder.uncover( compCell, result );
    }


    console.log( 'returning control' );
};

async function computerTurn(){
    console.log( 'taking computer turn' );

    const gridX = gridSize( currentDifficulty );
    const totalCells = gridX * gridX;

    // GET LAST SELECTED SQUARE
    // ELSE RANDOM
    if ( !lastSelected ) {
        lastSelected = Math.floor( Math.random() * totalCells );
    };

    let targetedCell = deepLore.getCompCell( lastSelected );
    targetedCell.classList.add( 'active' );


    // IF HUNTING, MOVE 1 ADJECENT FROM LAST HIT (MUST BE TARGET-LIVE)
    if ( isHunting ) {

        // HUNT SQUARE == 45
        let directions = [ 1, -1, gridX, -gridX ];
        let lastStepHunt = 1;
        let lastCellResult = result.UNKOWN;
        if ( huntCell == lastCell ) {
            // CHOOSE A NEW DIRECTION
        }
        if ( lastCellResult != result.HIT_GOAL ) {
            // CHOOSE A NEW DIRECTION
        }

    } else {

        // ELSE TAKE RANDOM NUMBER OF STEPS, IN RANDOM NON-REPEATING DIRECTIONS
        // const steps = Math.floor( 2 + Math.random() * 8 );
        const steps = 5;
        console.log( `taking ${ steps } steps` );

        let directions = [ 1, -1, gridX, -gridX ];
        let index = 0;
        
        // WALK THROUGH
        for ( let s = 0; s < steps; s++ ){
            // RANDOMIZE NEXT INDEX
            index = ( index + Math.floor( Math.random() * 3 ) ) % 4;
            
            // CHECK AND STOP FOR VERTICAL WRAP
            if ( ( lastSelected % gridX == 0 ) && ( lastSelected + directions[ index ] ) % gridX == gridX - 1 ) {
                index -= 1;
                index = index % directions.length;
                console.log( 'V - adjusting new index -1', directions[ index ] );
            };

            if ( ( lastSelected % gridX == gridX - 1 ) && ( lastSelected + directions[ index ] ) % gridX == 0 ) {
                index += 1;
                index = index % directions.length;
                console.log( 'V - adjusting new index +1', directions[ index ] );
            };

            // CHECK AND STOP HORIZONTAL WRAP
            if ( ( lastSelected + directions[ index ] ) > totalCells ) {
                index += 1;
                index = index % directions.length;
                console.log( 'H - adjusting new index +1', directions[ index ] );
            };

            if ( ( lastSelected + directions[ index ] ) < 0 ) {
                index -= 1;
                index = index % directions.length;
                console.log( 'H - adjusting new index -1', directions[ index ] );
            };

            // BASIC FAIL SAFE TO KEEP IT IN BOUNDS
            // THIS WILL WRAP
            lastSelected += directions[ index ];            
            if ( lastSelected < 0 ){ lastSelected = totalCells + lastSelected };
            lastSelected = lastSelected %( totalCells );
            // PAUSE
            await new Promise( ( resolve, reject ) => setTimeout( resolve, 150 ) );

            // HIGHLIGHT THE NEW CELL
            targetedCell.classList.remove( 'active' );
            targetedCell = deepLore.getCompCell( lastSelected );
            console.log( lastSelected );
            console.log( targetedCell );
            targetedCell.classList.add( 'active' );
        };
        
        if ( targetedCell.classList.contains( 'seen' ) ) {
            // WALK TO NEARST TARGET-LIVE SQUARE
        };
    };
    
    // CLICK
    targetedCell.classList.remove( 'unknown' );
    targetedCell.classList.remove( 'active' );
    targetedCell.classList.add( 'seen' );
    targetedCell.classList.add( 'fire' );
    // PAUSE ON CLICK
    await new Promise( ( resolve, reject ) => setTimeout( resolve, 350 ) );
    targetedCell.classList.remove( 'fire' );
    targetedCell.classList.add( 'miss' );
    

    console.log( 'returning control' );
    isPlayerTurn = true;
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

            const rowCount = gridSize( currentDifficulty );
            battleship.setup( rowCount );
            content.appendChild( pageBuilder.getHTML_Game_Title() );
            content.appendChild( pageBuilder.getHTML_Game_Main( rowCount ) );
            
            deepLore.getGame_Quit.addEventListener( 'click', interact );

            // FOR EACH SQUARE ADD A LISTENER
            const targets = Array.from( deepLore.getGame_TargetsPlayer.children );

            targets.forEach( target => {
                target.addEventListener( 'click', interactTarget );
            });

            battleship.randomlyPlaceShips( owners.PLAYER );

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
    lastSelected = null;
    battleship.resetGame();
};

setup();