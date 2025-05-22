import f_logo from '../images/logo-plain.png'

const ID_play = 'setup';
const ID_quickgame = 'quick-game';
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

}

class DeepLore {

    get Get_Button_Setup_Play(){ return document.getElementById( ID_play ) };
    get Get_Button_Setup_QuickGame(){ return document.getElementById( ID_quickgame ) };

    get Get_ID_Setup_play() { return ID_play; }
    get Get_ID_Setup_quickgame() { return ID_quickgame; }

}

export { PageBuilder, DeepLore };