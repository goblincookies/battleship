import f_logo from '../images/logo-plain.png'

// PAGE ID'S
const ID_play = 'setup';
const ID_quickgame = 'quick-game';
const ID_setup_back = 'setup-back';
const ID_setup_text = 'setup-text';
const ID_setup_actionbar = 'action-bar';
const ID_setup_random = 'random';
const ID_setup_next = 'next';


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
        //     <div class="play-area relative">
        //         <div class="title abs-center">
        //             <img class="logo-sm shadow" src="./assets/images/logo-plain.png" alt="">
        //         </div>
        //         <div class="box glow">
        //             <div class="graph-paper wide tall play-box"></div>
        //         </div>
        //     </div>

        //     <div class="button-tray marg-top flex-h-center center">
        //         <div class="saftybox flex-h-center wide grow">
        //             <button class="pill pad-sides" id="quick-game"> <p class="glow-pink">Quick Game </p></button>
        //         </div>
        //         <div class="saftybox flex-h-center wide grow">
        //             <button class="text pad-sides right" id="setup" > <p class="glow-pink">Play</p></button>
        //         </div>
        //     </div>
        // </div>

        const mainDiv = this.createElement( 'div', 'centerpiece game-size');
        const playDiv = this.createElement( 'div', 'play-area relative' );
        const titleDiv = this.createElement( 'div', 'title abs-center' );
        const logoImg = this.createElement( 'img', 'logo-sm shadow', f_logo );
        const boxDiv = this.createElement( 'div', 'box glow' );
        const graphDiv = this.createElement( 'div', 'graph-paper wide tall play-box' );
        const trayDiv = this.createElement( 'div', 'button-tray marg-top flex-h-center center' );
        const safetyboxPillDiv = this.createElement( 'div', 'safetybox flex-h-center wide grow' );
        const pillButton = this.createElement( 'button', 'pill pad-sides' );
        const pillP = this.createElement( 'p', 'glow-pink' );
        const safetyboxTextDiv = this.createElement( 'div', 'safetybox flex-h-center wide grow' );
        const textButton = this.createElement( 'button', 'text pad-sides' );
        const textP = this.createElement( 'p', 'glow-pink' );

        pillP.textContent = 'Quick Game';
        textP.textContent = 'Play';

        pillButton.id = ID_quickgame;
        textButton.id = ID_play;

        titleDiv.appendChild( logoImg );
        boxDiv.appendChild( graphDiv );

        playDiv.appendChild( titleDiv );
        playDiv.appendChild( boxDiv );

        pillButton.appendChild( pillP );
        safetyboxPillDiv.appendChild( pillButton );

        textButton.appendChild( textP );
        safetyboxTextDiv.appendChild( textButton );

        trayDiv.appendChild( safetyboxPillDiv );
        trayDiv.appendChild( safetyboxTextDiv );

        mainDiv.appendChild( playDiv );
        mainDiv.appendChild( trayDiv );
        
        return mainDiv;
    };

    getHTML_Setup_Title(){
        // <div class="flex-v-center marg-top min-height debugB">
        //     <div class="title debugC">
        //         <img class="logo-sm shadow" src="../assets/images/logo-plain.png" alt="">
        //     </div>
        //     <div class="button-tray flex-h-center center debugA">
        //         <div class="safetybox flex-h-center wide grow">
        //             <button class="pill pad-sides" id="quick-game"> <p class="glow-pink">Back </p></button>
        //         </div>
        //         <div class="saftybox flex-h-center wide grow">
        //             <p class="basic">Place your ships<br>tap to rotate</p>
        //         </div>
        //     </div>
        // </div>
        const mainDiv = this.createElement( 'div', 'flex-v-center marg-top min-height' );
        const titleDiv = this.createElement( 'div', 'title' );
        const titleImg = this.createElement( 'img', 'logo-sm shadow', f_logo );
        const trayDiv = this.createElement( 'div', 'button-tray flex-h-center center' );
        const safetyboxPillDiv = this.createElement( 'div', 'safetybox flex-h-center wide grow' );
        const pillButton = this.createElement( 'button', 'pill pad-sides' );
        const backP = this.createElement( 'p', 'glow-pink' );
        const safetyboxTextDiv = this.createElement( 'div', 'safetybox flex-h-center wide grow' );
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

    getHTML_Setup_Main(){
        // <div class="grow stacker-tray center debugA">
        //     <div class="game-size centerpiece debugB">
        //         <div class="box glow">
        //             <div class="graph-paper wide tall play-box"></div>
        //         </div>
        //     </div>

        //     <div class="game-size flex-v-center-align debugC">
        //         <div class="wide grow flex-v-center min-height debugA" id="action-bar">
                    // DIFFICULTY
                    // SHIPS
                    
        //         </div>

        //         <div class="button-tray flex-h-center center">

        //             <div class="saftybox flex-h-center wide grow">
        //                 <button class="pill pad-sides" id="random-layout"> <p class="glow-pink">Random Layout </p></button>
        //             </div>

        //             <div class="saftybox flex-h-center wide grow">
        //                 <button class="text pad-sides" id="next" > <p class="glow-pink">Play</p></button>
        //             </div>

        //         </div>
        //     </div>
        // </div>

        const mainDiv = this.createElement( 'div', 'grow stacker-tray center' );
        const centerpieceDiv = this.createElement( 'div', 'game-size centerpiece' );
        const boxDiv = this.createElement( 'div', 'box glow');
        const graphDiv = this.createElement( 'div', 'graph-paper wide tall play-box' );
        const otherDiv = this.createElement( 'div', 'game-size flex-v-center-align' );
        const actionBarDiv = this.createElement( 'div', 'wide grow flex-v-center min-height' )
        const trayDiv = this.createElement( 'div', 'button-tray flex-h-center center' );
        const safetyboxPillDiv = this.createElement( 'div', 'safetybox flex-h-center wide grow' );
        const pillButton = this.createElement( 'button', 'pill pad-sides' );
        const pillP = this.createElement( 'p', 'glow-pink' );
        const safetyboxTextDiv = this.createElement( 'div', 'safetybox flex-h-center wide grow' );
        const textButton = this.createElement( 'button', 'text pad-sides' );
        const textP = this.createElement( 'p', 'glow-pink' );

        pillP.textContent = 'random layout';
        textP.textContent = 'Next';


        actionBarDiv.id = ID_setup_actionbar;
        pillButton.id = ID_setup_random;
        textButton.id = ID_setup_next;

        boxDiv.appendChild( graphDiv );
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

        return mainDiv;
    };

    getHTML_Setup_Difficulty(){
        // <ul class="difficulty flex-v-center wide tall">
        //     <li>
        //         <div class="safetybox flex-h-center wide grow debugA">
        //             <button class="text">
        //                 <p class="glow-pink">easy</p>
        //             </button>
        //         </div>
        //     </li>
        //     <li><button class="text"> <p class="glow-pink selected">normal</p></button></li>
        //     <li><button class="text"> <p class="glow-pink">hard</p></button></li>
        // </ul>

        const mainUl = this.createElement( 'ul', 'difficulty flex-v-center wide tall' );
        const firstLi = this.createElement( 'li', '' );
        const firstDiv = this.createElement( 'div', 'safetybox flex-h-center wide grow' );
        const firstButton = this.createElement( 'button', 'text' );
        const firstP = this.createElement( 'p', 'glow-pink' );

        const secondLi = this.createElement( 'li', '' );
        const secondDiv = this.createElement( 'div', 'safetybox flex-h-center wide grow' );
        const secondButton = this.createElement( 'button', 'text' );
        const secondP = this.createElement( 'p', 'glow-pink' );

        const thirdLi = this.createElement( 'li', '' );
        const thirdDiv = this.createElement( 'div', 'safetybox flex-h-center wide grow' );
        const thirdButton = this.createElement( 'button', 'text' );
        const thirdP = this.createElement( 'p', 'glow-pink' );

        firstP.textContent = 'easy';
        secondP.textContent = 'normal';
        thirdP.textContent = 'hard';

        this.modify_TextSelect( secondP );

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

        return mainUl;
    };

    getHTML_Setup_Place(){
        const mainDiv = this.createElement('div', '' );
        return mainDiv;
    };

    modify_TextSelect( html ){
        html.classList.add( 'selected' );
    }
    modify_TextDeselect( html ){
        html.classList.remove( 'selected' );
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

    get getID_Start_play() { return ID_play };
    get getID_Start_quickgame() { return ID_quickgame };

    get getID_Setup_back() { return ID_setup_back };
    get getID_Setup_next() { return ID_setup_next };
    get getID_Setup_random() { return ID_setup_random };

}

export { PageBuilder, DeepLore };