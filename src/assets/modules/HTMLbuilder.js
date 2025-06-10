import f_logo from '../images/logo-plain.png'

// PAGE ID'S
const ID_play = 'setup';
const ID_quickgame = 'quick-game';
const ID_setup_back = 'setup-back';
const ID_setup_text = 'setup-text';
const ID_setup_actionbar = 'action-bar';
const ID_setup_random = 'random';
const ID_setup_next = 'next';
const ID_setup_easy = 'easy';
const ID_setup_normal = 'normal';
const ID_setup_hard = 'hard';
const ID_setup_graphpaper = 'graph-paper';
const ID_ship5 = 'ship-5';
const ID_ship4 = 'ship-4';
const ID_ship3a = 'ship-3a';
const ID_ship3b = 'ship-3b';
const ID_ship2 = 'ship-2';
const ID_setup_fauxdrop = 'faux-drop';
const ID_setup_pieceTray = 'piece-tray';
const ID_setup_gridDrop = 'grid-drop';



// HELPER CLASS FOR BUILDING HTML ELEMENTS
class PageBuilder {

    // HELPER FUNCTION FOR CREATING HTML ELEMENTS WITH CLASSES
    createElement ( type, classes, src) {
        let element = document.createElement( type );
        for(const el of classes.split(' ')) {
            if (el == ' ' | el == '' ) { break; }
            element.classList.add( el);
        };
        if (src) { element.src = src; }
        return element;
    };

    getHTML_Start(){

        // <div class="centerpiece game-size">
        //     <div class="relative game-size flex v center-j centerpiece">
        //          <div class="abs-center">
        //             <img class="logo-sm shadow" src="../assets/images/logo-plain.png" alt="">
        //         </div>
        //         <div class="box glow drop relative">

        //             <ul class="relative drop">
        //                 <li class="faux-drop hidden" id="faux-drop"></li>
        //             </ul>

        //             <div class="graph-paper wide tall play-box"></div>
        //         </div>
        //         <div class="border overlay"></div>
        //     </div>
        //     <div class="button-tray marg-top flex h center-a center">
        //         <div class="safetybox flex h center-j wide grow">
        //             <button class="pill pad-sides" id="quick-game">
        //                  <p class="">Quick Game </p>
        //             </button>
        //         </div>
        //         <div class="saftybox flex h center-j wide grow">
        //             <button class="text pad-sides right" id="setup" >
        //                  <p class="glow-pink font-big">Play</p>
        //             </button>
        //         </div>
        //     </div>
        // </div>

        const mainDiv = this.createElement( 'div', 'centerpiece game-size');
        const relativeDiv = this.createElement( 'div', 'relative game-size flex v center-j centerpiece' );
        const titleDiv = this.createElement( 'div', 'abs-center' );
        const logoImg = this.createElement( 'img', 'logo-sm shadow', f_logo );
        const boxDiv = this.createElement( 'div', 'box glow drop relative' );
        const graphDiv = this.createElement( 'div', 'graph-paper wide tall play-box' );
        const borderDiv = this.createElement( 'div', 'border overlay' );

        const trayDiv = this.createElement( 'div', 'button-tray marg-top flex h center-a center' );
        const safetyboxPillDiv = this.createElement( 'div', 'safetybox flex h center-j wide grow' );
        const pillButton = this.createElement( 'button', 'pill pad-sides' );
        const pillP = this.createElement( 'p', '' );
        const safetyboxTextDiv = this.createElement( 'div', 'saftybox flex h center-j wide grow' );
        const textButton = this.createElement( 'button', 'text pad-sides right' );
        const textP = this.createElement( 'p', 'glow-pink font-big' );

        pillP.textContent = 'Quick Game';
        textP.textContent = 'Play';

        pillButton.id = ID_quickgame;
        textButton.id = ID_play;

        titleDiv.appendChild( logoImg );
        boxDiv.appendChild( graphDiv );

        relativeDiv.appendChild( titleDiv );
        relativeDiv.appendChild( boxDiv );
        relativeDiv.appendChild( borderDiv );

        pillButton.appendChild( pillP );
        safetyboxPillDiv.appendChild( pillButton );

        textButton.appendChild( textP );
        safetyboxTextDiv.appendChild( textButton );

        trayDiv.appendChild( safetyboxPillDiv );
        trayDiv.appendChild( safetyboxTextDiv );

        mainDiv.appendChild( relativeDiv );
        mainDiv.appendChild( trayDiv );
        
        return mainDiv;
    };

    getHTML_Setup_Title(){
        // <div class="flex v title marg-top">
        //     <div class="logo-display">
        //         <img class="logo-sm shadow" src="../assets/images/logo-plain.png" alt="">
        //     </div>
        //     <div class="button-tray wide flex h center-a center">
        //         <div class="saftybox flex h center-j wide grow">
        //             <button class="pill pad-sides" id="quick-game"> <p class="">Back </p></button>
        //         </div>
        //         <div class="saftybox flex h center-j wide grow">
        //             <p class="basic">Place your ships tap to rotate</p>
        //         </div>
        //     </div>
        // </div>

        const mainDiv = this.createElement( 'div', 'flex v title marg-top' );
        const titleDiv = this.createElement( 'div', 'logo-display' );
        const titleImg = this.createElement( 'img', 'logo-sm shadow', f_logo );
        const trayDiv = this.createElement( 'div', 'button-tray wide flex h center-a center' );
        const safetyboxPillDiv = this.createElement( 'div', 'saftybox flex h center-j wide grow' );
        const pillButton = this.createElement( 'button', 'pill pad-sides' );
        const backP = this.createElement( 'p', '' );
        const safetyboxTextDiv = this.createElement( 'div', 'saftybox flex h center-j wide grow' );
        const textP = this.createElement( 'p', 'basic' );

        backP.textContent = 'back';
        textP.textContent = 'Select your difficulty';

        pillButton.id = ID_setup_back;
        textP.id = ID_setup_text;

        pillButton.appendChild( backP );
        safetyboxPillDiv.appendChild( pillButton );
        safetyboxTextDiv.appendChild( textP );

        trayDiv.appendChild( safetyboxPillDiv );
        trayDiv.appendChild( safetyboxTextDiv );

        titleDiv.appendChild( titleImg );

        mainDiv.appendChild( titleDiv );
        mainDiv.appendChild( trayDiv );

        return mainDiv;        
    };

    getHTML_Setup_Main( graphpapersize ){

        // <div class="stacker-tray center">
        //     <div class="relative game-size flex v center-j centerpiece">
        //         <div class="box glow drop relative">
        //             <ul class="relative drop">
        //                 <li class="faux-drop hidden" id="faux-drop"></li>
        //             </ul>
        //             <div class="graph-paper wide tall play-box"></div>
        //         </div>
        //         <div class="border overlay"></div>
        //         <!-- <div class="border-status overlay"></div> -->
        //     </div>

        //     <div class="info-size flex v">
        //         <ul class="difficulty grow flex v center-j">
        //             <li><div class="safetybox flex h center-j"><button class="text font-med"><p class="glow-pink">easy</p></button></div></li>
        //             <li><div class="safetybox flex h center-j"><button class="text font-med"><p class="glow-pink">normal</p></button></div></li>
        //             <li><div class="safetybox flex h center-j"><button class="text font-med"><p class="glow-pink">hard</p></button></div></li>
        //         </ul>
        //         <div class="button-tray flex h center-a">
        //             <div class="safetybox flex h center-j wide grow">
        //                 <button class="pill pad-sides" id="quick-game"> <p class="">Random Layout </p></button>
        //             </div>
        //             <div class="safetybox flex h center-j wide grow">
        //                 <button class="text pad-sides right" id="setup" > <p class="glow-pink font-big">Play</p></button>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        const mainDiv = this.createElement( 'div', 'stacker-tray center' );
        const centerpieceDiv = this.createElement( 'div', 'relative game-size flex v center-j centerpiece' );
        const boxDiv = this.createElement( 'div', 'box glow drop relative');
        const dropUl = this.createElement( 'div', 'overlay drop drop-box float'); // relative
        // const fauxLi = this.createElement( 'div', 'faux-drop hidden' );
        const graphDiv = this.createElement( 'div', 'graph-paper wide tall play-box' );
        const borderDiv = this.createElement( 'div', 'border overlay' );

        const otherDiv = this.createElement( 'div', 'info-size flex v debugB' );
        const actionBarDiv = this.createElement( 'div', 'flex center-j grow debugA' );
        const trayDiv = this.createElement( 'div', 'button-tray flex h center-a' );
        const safetyboxPillDiv = this.createElement( 'div', 'safetybox flex h center-j wide grow' );
        const pillButton = this.createElement( 'button', 'pill pad-sides hidden' );
        const pillP = this.createElement( 'p', '' );
        const safetyboxTextDiv = this.createElement( 'div', 'safetybox flex h center-j wide grow' );
        const textButton = this.createElement( 'button', 'text pad-sides right' );
        const textP = this.createElement( 'p', 'glow-pink font-big' );

        pillP.textContent = 'random layout';
        textP.textContent = 'Next';

        actionBarDiv.id = ID_setup_actionbar;
        pillButton.id = ID_setup_random;
        textButton.id = ID_setup_next;
        graphDiv.id = ID_setup_graphpaper;
        // fauxLi.id = ID_setup_fauxdrop;
        dropUl.id = ID_setup_gridDrop;

        // dropUl.appendChild( fauxLi );
        boxDiv.appendChild( dropUl );
        boxDiv.appendChild( graphDiv );
        // centerpieceDiv.appendChild( borderDiv );
        centerpieceDiv.appendChild( boxDiv );

        pillButton.appendChild( pillP );
        textButton.appendChild( textP );
        safetyboxTextDiv.appendChild( textButton );
        safetyboxPillDiv.appendChild( pillButton );
        
        trayDiv.appendChild( safetyboxPillDiv );
        trayDiv.appendChild( safetyboxTextDiv );
        
        otherDiv.appendChild( actionBarDiv );
        otherDiv.appendChild( trayDiv );

        mainDiv.appendChild( centerpieceDiv );
        mainDiv.appendChild( otherDiv );

        this.modify_GraphPaper( graphDiv, graphpapersize );

        return mainDiv;
    };

    getHTML_Setup_Difficulty( currDiff ){

        // <ul class="difficulty grow flex v center-j">
        //     <li><div class="safetybox flex h center-j"><button class="text font-med"><p class="glow-pink">easy</p></button></div></li>
        //     <li><div class="safetybox flex h center-j"><button class="text font-med"><p class="glow-pink">normal</p></button></div></li>
        //     <li><div class="safetybox flex h center-j"><button class="text font-med"><p class="glow-pink">hard</p></button></div></li>
        // </ul>

        const mainUl = this.createElement( 'ul', 'difficulty grow flex v center-j' );
        const firstLi = this.createElement( 'li', '' );
        const firstDiv = this.createElement( 'div', 'safetybox flex h center-j' );
        const firstButton = this.createElement( 'button', 'text font-med' );
        const firstP = this.createElement( 'p', 'glow-pink' );

        const secondLi = this.createElement( 'li', '' );
        const secondDiv = this.createElement( 'div', 'safetybox flex h center-j' );
        const secondButton = this.createElement( 'button', 'text font-med' );
        const secondP = this.createElement( 'p', 'glow-pink' );

        const thirdLi = this.createElement( 'li', '' );
        const thirdDiv = this.createElement( 'div', 'safetybox flex h center-j' );
        const thirdButton = this.createElement( 'button', 'text font-med' );
        const thirdP = this.createElement( 'p', 'glow-pink' );

        firstP.textContent = 'easy';
        secondP.textContent = 'normal';
        thirdP.textContent = 'hard';

        firstButton.id = ID_setup_easy;
        secondButton.id = ID_setup_normal;
        thirdButton.id = ID_setup_hard;

        firstButton.appendChild( firstP );
        firstDiv.appendChild( firstButton );
        firstLi.appendChild( firstDiv );

        secondButton.appendChild( secondP );
        secondDiv.appendChild( secondButton );
        secondLi.appendChild( secondDiv );

        thirdButton.appendChild( thirdP );
        thirdDiv.appendChild( thirdButton );
        thirdLi.appendChild( thirdDiv );

        mainUl.appendChild( firstLi );
        mainUl.appendChild( secondLi );
        mainUl.appendChild( thirdLi );

        console.log('currDiff:', currDiff );

        if( currDiff < 1 ){
            this.modify_TextSelect( firstButton );
        } else if ( currDiff < 2 ){
            this.modify_TextSelect( secondButton );
        } else {
            this.modify_TextSelect( thirdButton );
        }
        return mainUl;
    };

    getHTML_Setup_Shipshelf( height ){
        // <ul class="wide piece-tray debugB">
        //     <li class="block ship-grad" id="block-5"></li>
        //     <li class="block ship-grad" id="block-2"></li>
        //     <li class="block ship-grad" id="block-3a"></li>
        //     <li class="block ship-grad" id="block-4"></li>
        //     <li class="block ship-grad" id="block-3b"></li>
        // </ul>

        const mainUl = this.createElement('div', 'piece-tray drop-box reset debugA' );
        const ship5li = this.createElement('div', 'ship block drag ship-grad' );
        const ship4li = this.createElement('div', 'ship block drag ship-grad' );
        const ship3ali = this.createElement('div', 'ship block drag ship-grad' );
        const ship3bli = this.createElement('div', 'ship block drag ship-grad' );
        const ship2li = this.createElement('div', 'ship block drag ship-grad' );

        mainUl.id = ID_setup_pieceTray;
        ship5li.id = ID_ship5;
        ship4li.id = ID_ship4;
        ship3ali.id = ID_ship3a;
        ship3bli.id = ID_ship3b;
        ship2li.id = ID_ship2;

        console.log( 'setting height', height );

        ship5li.style.height = height+'px';
        ship5li.style.width = (height*5)+'px';

        ship4li.style.height = height+'px';
        ship4li.style.width = (height*4)+'px';

        ship3ali.style.height = height+'px';
        ship3ali.style.width = (height*3)+'px';

        ship3bli.style.height = height+'px';
        ship3bli.style.width = (height*3)+'px';

        ship2li.style.height = height+'px';
        ship2li.style.width = (height*2)+'px';



        mainUl.appendChild( ship5li );
        mainUl.appendChild( ship2li );
        mainUl.appendChild( ship3ali );
        mainUl.appendChild( ship4li );
        mainUl.appendChild( ship3bli );

        return mainUl;
    };

    getHeight( html ) {
        return html.getBoundingClientRect().height;
    };

    modify_shipSize( html, height ){
        html.style.height = height + 'px';
        html.style.width = height * parseInt( html.id.split('-')[1] ) + 'px';
    };

    modify_GraphPaper( html, size ){
        console.log('this registering?');
        // html.style.maskSize = `calc(100% / ${ size } + 1px) calc(100% / ${ size } + 1px)`;
        html.style.maskSize = `calc(100% / ${ size }) calc(100% / ${ size })`;
    };

    modify_TextSelect( html ){
        html.querySelector('p').classList.add( 'selected' );
    }
    modify_TextDeselect( html ){
        html.querySelector('p').classList.remove( 'selected' );
    }

    modify_ContentTop( html ) {
        html.classList.remove( 'flex-v-center' );
        html.classList.add( 'flex-v-start' );
    };
    
    modify_ContentCenter( html ) {
        html.classList.remove( 'flex-v-start' );
        html.classList.add( 'flex-v-center' );
    };

    modify_ContentNarrow( html ) {
        html.classList.remove( 'ideal-size-wide' );
        html.classList.add( 'ideal-size' );
    };

    modify_ContentWide( html ) {
        html.classList.remove( 'ideal-size' );
        html.classList.add( 'ideal-size-wide' );
    };
};

class DeepLore {

    get getStart_Play(){ return document.getElementById( ID_play ) };
    get getStart_QuickGame(){ return document.getElementById( ID_quickgame ) };

    get getSetup_Back(){ return document.getElementById( ID_setup_back ) };
    get getSetup_Next(){ return document.getElementById( ID_setup_next ) };
    get getSetup_Random(){ return document.getElementById( ID_setup_random ) };
    get getSetup_ActionBar(){ return document.getElementById( ID_setup_actionbar ) };
    get getSetup_Easy(){ return document.getElementById( ID_setup_easy ) };
    get getSetup_Normal(){ return document.getElementById( ID_setup_normal ) };
    get getSetup_Hard(){ return document.getElementById( ID_setup_hard ) };
    get getSetup_GraphPaper(){ return document.getElementById( ID_setup_graphpaper ) };
    get getSetup_PieceTray(){ return document.getElementById( ID_setup_pieceTray ) };
    get getSetup_GridDrop(){ return document.getElementById( ID_setup_gridDrop ) };
    get getSetup_FauxShadow(){ return document.getElementById( ID_setup_fauxdrop ) };
    

    get getID_Start_play() { return ID_play };
    get getID_Start_quickgame() { return ID_quickgame };

    get getID_Setup_back() { return ID_setup_back };
    get getID_Setup_next() { return ID_setup_next };
    get getID_Setup_random() { return ID_setup_random };
    get getID_Setup_easy() { return ID_setup_easy };
    get getID_Setup_normal() { return ID_setup_normal };
    get getID_Setup_hard() { return ID_setup_hard };

}

export { PageBuilder, DeepLore };