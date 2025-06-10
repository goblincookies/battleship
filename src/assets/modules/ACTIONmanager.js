import { DeepLore } from "./HTMLbuilder";

class Reaction {

    constructor(){
        // console.log( 'hello!' )
        window.addEventListener( 'resize', this.resizeWindow );
    }

    resizeWindow = ( e ) => {
        console.log( 'resizing the window here!' );
    };
};

class Interaction {
    // fauxShadow = null;
    fauxBox = null;
    trayUl = null;
    draggingItem = null;
    dropboxes = [];
    boundingBox = null;
    dropBoxOver = null;
    pointerStartX = 0;
    pointerStartY = 0;
    pointerOffsetX = 0;
    pointerOffsetY = 0;
    centerOffsetX = 0;
    centerOffsetY = 0;
    thePageX = 0;
    thePageY = 0;
    offsetX = 0;
    offsetY = 0;
    snapRes = 90;
    rotateSensativity = 15;
    rotateTimer = 0;
    // maxSlide = 0;

    constructor( ) { 
        document.addEventListener( 'mouseup', this.dragEnd );
        document.addEventListener( 'touchend', this.dragEnd );
        
        // GET FAUX BOX
    };

    setup( trayUl, fauxBox ) {
        this.trayUl = trayUl;
        this.fauxBox = fauxBox;
        console.log('faux box', this.fauxBox );
    };

    update_grid ( snapRes ){ this.snapRes = snapRes; }

    // ADD LISTENERS TO ITEM
    watch( HTML ) {
        HTML.addEventListener( 'mousedown', this.dragStart );
        HTML.addEventListener( 'touchstart', this.dragStart );
    };

    cssToOffset( css ){
        if ( !css ){ return };
        css = css.split(',');
        css[ 0 ] = css[ 0 ].replace(/[^0-9-\.]+/g,'');
        css[ 1 ] = css[ 1 ].replace(/[^0-9-\.]+/g,'');

        this.offsetX = parseFloat( css[ 0 ] );
        this.offsetY = parseFloat( css[ 1 ] );
    };

    cssToFloat( css ){
        css = css.replace(/[^0-9-\.]+/g,'');
        return css;
    }

    shouldSnap( x, y, bounds ){
        if ( this.draggingItem.parentNode == this.fauxBox ) { return true };
        if ( !bounds ) { return false };
        if ( x < bounds.left || x > bounds.right ) { return false };        
        if ( y < bounds.top || y > bounds.bottom ) { return false };
        return true;
    };

    // TRIGGERS WHEN A DRAG IS DETECTED
    dragStart = ( e ) => {

        console.log( 'registering drag start' );


        e.preventDefault();

        // MAKE SURE IT'S A VIABLE ITEM; THIS IS USEFUL
        // FOR DISABLING DRAGGING ON CERTAIN ITEMS
        if ( e.target.classList.contains( 'drag') ) {

            console.log( 'drag starting here' );

            this.draggingItem = e.target;
            this.draggingItem.classList.remove( 'block' );
            this.draggingItem.classList.add( 'dragging' );

            this.pointerStartX = e.clientX || e.touches[0].clientX;
            this.pointerStartY = e.clientY || e.touches[0].clientY;

            let bounds = this.draggingItem.getBoundingClientRect();
            
            
            let offsetX = e.pageX || e.touches[0].pageX;
            let offsetY = e.pageY || e.touches[0].pageY;
            this.centerOffsetX = offsetX - bounds.left;
            this.centerOffsetY = offsetY - bounds.top;

            this.cssToOffset( this.draggingItem.style.transform );
            this.dropboxes = document.querySelectorAll( '.drop-box' );
            // this.fauxShadow.classList.remove( 'hidden' );

        };

        // SET UP DOCUMENT LISTENERS REQUIRED FOR DRAGGIN
        document.addEventListener( 'mousemove', this.drag );
        document.addEventListener( 'touchmove', this.drag, {passive: false});
        document.addEventListener( 'mouseleave', this.dragEnd );
    };

    // TRIGGERS WHEN DRAGGING
    drag = ( e ) => {
        e.preventDefault();

        // PROTECTS AGAINST 'STICKY' DRAGS
        if ( e.buttons < 1 ) {
            console.log( 'sticky' );
            this.dragEnd();
            return;
        };

        // // THIS IS NULLIFYING THE TOUCH INPUT
        // // CHECK IF OUTSIDE THE BOUNDS OF THE WINDOW
        if ( ( !e.clientX || !e.clientY ) && ( !e.touches )  ) {
            console.log( 'outside bounds' )
            console.log( !e.clientX )
            console.log( !e.clientY )
            this.dragEnd();
            return;
        };

        // VERIFY AN ITEM HAS BEEN FOUND
        if ( this.draggingItem ) {
            // CALC THE MOUSE MOVEMENT
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;

            let _x = this.offsetX + clientX - this.pointerStartX;
            let _y = this.offsetY + clientY - this.pointerStartY;

            console.log( 'checking starting values:', _x, _y );


            this.pointerOffsetX = _x;
            this.pointerOffsetY = _y;

            // CALCULATE THE SNAP
            let snap_x = 0;
            let snap_y = 0;
            this.thePageX = e.pageX || e.touches[0].pageX;
            this.thePageY = e.pageY || e.touches[0].pageY;

            console.log( 'checking pagepos:', this.thePageX, this.thePageY );

            let bounds = this.fauxBox.getBoundingClientRect();
            let shipBounds = this.draggingItem.getBoundingClientRect();
            console.log( bounds.top, bounds.bottom );


            if ( this.shouldSnap( e.pageX, e.pageY, bounds ) ) {

                console.log( 'snap please' );
                let x_off = this.thePageX - _x;
                _x = this.thePageX - bounds.left;
                _x = Math.floor( _x / this.snapRes );
                _x = Math.max( 0, _x );
                let _width = this.cssToFloat( this.draggingItem.style.width );
                _x = Math.min( Math.floor( ( bounds.width - _width ) / this.snapRes) , _x );
                
                _x = _x * this.snapRes;
                _x = _x + bounds.left;
                _x = _x - x_off;
                _x = _x + this.centerOffsetX;
                console.log( '>>>>x', _x );

                let y_off = this.thePageY - _y;
                console.log( 'y offset', y_off );
                _y = this.thePageY - bounds.top;
                _y = Math.floor( _y / this.snapRes );
                _y = Math.max( 0, _y );
                let _height = this.cssToFloat( this.draggingItem.style.height );
                _y = Math.min( Math.floor( ( bounds.width - _height ) / this.snapRes ), _y );

                _y = _y * this.snapRes;
                _y = _y + bounds.top;
                _y = _y - y_off;
                _y = _y + this.centerOffsetY;

            } else {
                console.log( 'no snap' );
            }

            console.log( 'checking in', _x, _y );
            
            this.draggingItem.style.transform = `translate( ${ _x }px, ${ _y }px )`;
        };

        if( this.rotateTimer <= this.rotateSensativity){ this.rotateTimer += 1 };
        
    };

    // TRIGGERS WHEN DRAG IS COMPLETE OR A BUNCH OF WAYS
    // CLEANS UP LOADED ITEMS, AND MAKES SURE
    // EVERYTHING IS READY FOR THE NEXT DRAG
    dragEnd = ( ) => {
        console.log('DRAG END DRAG END DRAG END DRAG END DRAG END DRAG END DRAG END DRAG END ')
        if ( this.draggingItem ) {

            this.draggingItem.classList.remove( 'dragging' );

            // WHICH DROP BOX?
            // let _x = this.thePageX;
            // let _y = this.thePageY;

            let _x = this.draggingItem.getBoundingClientRect().left;
            let _y = this.draggingItem.getBoundingClientRect().top;


            console.log( 'dropped, x & y:', _x, _y )
            let droppedHere = null;

            this.dropboxes.forEach( box => {

                let bounds = box.getBoundingClientRect();
                console.log( 'bonds!', box );
                console.log( bounds.top, bounds.bottom, bounds.left, bounds.right );


                if ( _x < bounds.right && _x > bounds.left ) {
                    console.log( 'inside Xs')

                    if ( _y < bounds.bottom  && _y > bounds.top ) {
                        console.log( 'inside Ys')

                        console.log( 'dropped here!' )
                        droppedHere = box;
                    };
                };
            });

            console.log( 'dropped here:', droppedHere );

            if( droppedHere ) {

                // IS THE DROPBOX FLOAT OR RESET?
                if ( droppedHere.classList.contains( 'float' ) ){
                    console.log( 'parent:' );
                    console.log( this.draggingItem.parentNode );
                    this.draggingItem.classList.add( 'placed' );


                    // DOES IT NEED AN OFFSET?
                    if ( this.draggingItem.parentNode != droppedHere ) {
                        console.log( 'offset please!' );
                    };

                    console.log( 'float!' );
                    // MAKE IT A CHILD 
                    
                    // PRESERVE THE RELATIVE X,Y
                    let bounds = droppedHere.getBoundingClientRect();
                    let shipBounds = this.draggingItem.getBoundingClientRect();

                    this.draggingItem.style.transform = `translate(${ shipBounds.left - bounds.left}px, ${ shipBounds.top - bounds.top }px)`;
                    droppedHere.prepend( this.draggingItem );
                } else {
                    // REMOVE THE TRANSFORM
                    this.draggingItem.style.transform = '';
                    // MAKE IT A CHILD 
                    droppedHere.prepend( this.draggingItem );
                };

                if( this.draggingItem.parentNode == this.fauxBox ) {

                    console.log( 'rotate timer check: ', this.rotateTimer );

                    // IF WE HAVEN'T TIMED OUT
                    if( this.rotateTimer < this.rotateSensativity){
                        // ROTATE
                        let itemBounds = this.draggingItem.getBoundingClientRect();
                        this.draggingItem.style.width = `${ itemBounds.height }px`;
                        this.draggingItem.style.height = `${ itemBounds.width }px`;
                    };

                };

            } else {
                // IF PARENT IS FAUXBOX ROTATE
                if( this.draggingItem.parentNode == this.fauxBox ) {

                    console.log( 'rotate timer check: ', this.rotateTimer );

                    // IF WE HAVEN'T TIMED OUT
                    if( this.rotateTimer < this.rotateSensativity){
                        // ROTATE
                        let itemBounds = this.draggingItem.getBoundingClientRect();
                        this.draggingItem.style.width = `${ itemBounds.height }px`;
                        this.draggingItem.style.height = `${ itemBounds.width }px`;
                    };

                } else {
                    
                    // ELSE
                    // REMOVE THE TRANSFORM
                    this.draggingItem.style.transform = '';
                    this.draggingItem.classList.add( 'block' );
    
                    // MAKE IT A CHILD 
                    this.trayUl.prepend( this.draggingItem );            
                }

            };

        }

        this.removeListeners();
        this.cleanup();
    };

    // REMOVES LISTENERS THAT ARE ONLY NEEDED WHILE DRAGGING
    removeListeners() {
        document.removeEventListener( 'mousemove', this.drag );
        document.removeEventListener( 'touchmove', this.drag );
        document.removeEventListener( 'mouseleave', this.dragEnd );
    };

    // GENERAL CLEANUP
    // UNLOADS ITEMS
    cleanup() {
        // this.draggingItem = null;
        // this.offsetX = this.pointerOffsetX;
        // this.offsetY = this.pointerOffsetY;

        this.draggingItem = null;
        this.offsetX = 0;
        this.offsetY = 0;
        this.thePageX = 0;
        this.thePageY = 0;
        this.rotateTimer = 0;
    };

    // RESETS OFFSET AND TRANSFORM
    // USEFUL WHEN ITEMS SHOULD BE IN THEIR
    // ORIGINAL STARTING POSITION
    reset( HTML ) {
        HTML.style.transform = null;
        this.draggingItem = null;
        this.offsetX = 0;
        this.offsetY = 0;
    };

};

export { Interaction, Reaction };