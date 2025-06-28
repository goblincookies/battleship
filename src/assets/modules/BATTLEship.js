import { PageBuilder, DeepLore } from './HTMLbuilder';


class Battleship {
    owners = {
        PLAYER: 0,
        COMPUTER: 1
    };

    results = {
        MISS: 0,
        HIT: 1
    }

    targetingCellID = null;
    rowCount = null;
    totalCount = null;

    knownCells = { 0:[], 1:[] };
    shipCells = { 0:[], 1:[] };
    isHunting = false;
    deepLore = new DeepLore();

    setup( rowCount ) {

        this.rowCount = rowCount;
        this.totalCount = rowCount * rowCount;


        let temparray = Array.from(Array( this.totalCount ).keys());
        let chosenCells = [];

        // for ( let id = 0; id < 17; id++ ) {
        //     let index = Math.floor( Math.random() * temparray.length );
        //     chosenCells.push( temparray[ index ] );
        //     temparray.splice( index, 1 );
        // };

        // for ( let chosenIndex = 0; chosenIndex < chosenCells.length; chosenIndex++ ) {
        //     let testHit = new Cell();
        //     testHit.cellID = chosenCells[ chosenIndex ];
        //     this.shipCells[ this.owners.PLAYER ].push( testHit )
        // };


    };

    resetGame() {
        this.targetingCellID = null;
        this.knownCells = { 0:[], 1:[] };
        this.shipCells = { 0:[], 1:[] };
        this.isHunting = false;
    };

    isFreeCell( cell, shipLength, blockingShips, isVert ){
        let cellCheck = -1;

        for( let len = 0; len < shipLength; len++ ) {

            if ( isVert > 0 ) {
                cellCheck = cell + len;
            } else {
                cellCheck = cell + ( len * this.rowCount );
            };

            for ( let blocked = 0; blocked < blockingShips.length; blocked ++ ) {

                if ( cellCheck == blockingShips[ blocked ].cellID ) {
                    console.log( `found one! cell ${ cellCheck } is blocked by ${ blockingShips[ blocked ] }`)
                    return false;
                };

            };
        };
        return true;
    };

    removeBlockedCells( allOptions, blockingShips, shipLength, isVert ) {

        // REMOVE ANY NON-VIABLE CELLS
        let trimmedOptions = [];
        for ( let cell = 0; cell < allOptions.length; cell ++ ) {
            
            const startingCell = allOptions[ cell ];
            let cellCheck = startingCell;

            if( this.isFreeCell( cellCheck, shipLength, blockingShips, isVert ) ){
                // OPEN
                trimmedOptions.push( allOptions[ cell ] );
            } else {
                // BLOCKED 
            };
        };
        return trimmedOptions;
    };

    randomlyPlaceShips( owner ){
        let ships = [ 5, 4, 3, 3, 2 ];
        let isVert = -1;
        const pageBuilder = new PageBuilder();
        
        for ( let n = 0; n < ships.length; n++ ) {
            console.log( `placing a ${ships[n]} piece ship (${n}) `)
            // console.log( 'placing ship:', n )
            isVert = Math.floor( Math.random() * 2 );
            console.log( 'is vertical: ', isVert );
            let maxValues = this.rowCount * ( this.rowCount - ( ships[ n ] - 1 ) );
            console.log( 'max values', maxValues )

            // CREATE ALL POSSIBLE OPEN POSITIONS
            let allOptions = Array.from(Array( maxValues ).keys());
            
            // CONVERT THE NUMBERS FOR VERTICAL PLACEMNET
            if ( isVert > 0 ) {
                console.log( 'flagged as vertical' );
                let depth = this.rowCount - ships[ n ] + 1;
                for ( let n = 0; n < allOptions.length; n++ ) {
                    allOptions[ n ] = ( Math.floor( n / depth ) * this.rowCount ) + n % depth;
                };
                // chosen = ( Math.floor( chosen / depth ) * this.rowCount ) + chosen % depth;                
            };

            console.log( 'all Options' );
            console.log( allOptions );

            // CHECK EACH BLOCKED CELL AND REMOVE IT
            const blockedShips = this.shipCells[ owner ];
            console.log( 'blocked ships' );
            console.log( blockedShips );

            allOptions = this.removeBlockedCells( allOptions, blockedShips, ships[ n ], isVert );
            console.log( 'final Options' );
            console.log( allOptions );
            
            // RANDOMLY SELECT A CELL
            let chosen = allOptions[ Math.floor( Math.random() * (allOptions.length - 1) ) ];
            console.log( 'randomly selected', chosen );
            // OCCASIONALLY RETURNS NAN ON CELLID FOR AN ENTIRE SHIP ??

            // FOR THE LENGTH OF THE DECLARED SHIP, MAKE AND
            // STORE A UNIQUE CELL OBJECT
            for ( let len = 0; len < ships[ n ]; len ++ ) {
                let testHit = new Cell();
                testHit.shipID = ships[ n ];
                if ( isVert > 0 ) {
                    testHit.cellID = chosen + len;
                } else {
                    testHit.cellID = chosen + ( len * this.rowCount );
                };
                this.shipCells[ owner ].push( testHit )
            };

            // DRAW IT TO THE GRID
            // DEEPLORE.GETSHIPS
            const shipDisplay = this.deepLore.getGame_ShipDisplayGrid;
            const shipHTML = pageBuilder.getHTML_singleShip( n );

            // COLUMN
            const colStart = Math.floor( chosen / this.rowCount ) + 1;
            console.log( `column start: ${ colStart }, ( ${ chosen } / ${ this.rowCount } )`);
            shipHTML.style.gridColumnStart = colStart;
            // ROW
            const rowStart = Math.floor( chosen % this.rowCount ) + 1;
            console.log( `row start: ${ rowStart }, ( ${ chosen } % ${ this.rowCount } )`);
            shipHTML.style.gridRowStart = rowStart;

            if ( isVert > 0 ) {
                console.log( `row end: ${ rowStart + ships[ n ] }, ( ${ rowStart } + ${ ships[ n ] } )`);
                shipHTML.style.gridRowEnd = rowStart + ships[ n ];
            } else {
                console.log( `column end: ${ colStart + ships[ n ] }, ( ${ colStart } + ${ ships[ n ] } )`);
                shipHTML.style.gridColumnEnd = colStart + ships[ n ];
            };

            shipDisplay.appendChild( shipHTML );

        };

        const placedShips = this.shipCells[ owner ];
        console.log( 'randomly set up ships:' );
        for ( let placed = 0; placed < placedShips.length; placed ++ ) {
            console.log( placedShips[ placed ].cellID );
        };

        console.log( 'handing it back!' );
    };

    uncover( owner,  cellID ) {

        // cellID == number
        let result = { result: -1, ship: -1, cellID:-1 };
        console.log( 'checking what we know' )
        console.log( this.knownCells[ owner ] );
        if ( this.knownCells[ owner ].includes( cellID ) ) {
            console.log( 'already checked' );
            return result;
        };

        for( let n = 0; n < this.shipCells[ owner ].length; n++ ) {
            let cell = this.shipCells[ owner ][ n ];

            if ( cell.cellID == cellID ) {
                console.log( 'hit!' );
                this.knownCells[ owner ].push( cellID );
                result.result = this.results.HIT;
                result.ship = this.shipCells[ owner ].shipID;
                return result;
            };
        };

        console.log( 'miss!' );
        result.result = this.results.MISS;
        return result;
    };

    createArray_UnknownCells( owner ) {
        let unknown = [];
        for ( let cellID = 0; cellID < this.totalCount; cellID++ ) {
            if ( !this.knownCells[ owner ].includes( cellID ) ) {
                unknown.push( cellID );
            };
        };
        console.log( 'unkown cells:' );
        console.log( unknown );
        return unknown;
    };

    randomlySelectCell( cellArray ) {

        if ( cellArray?.length ) {
            const cell = cellArray[ Math.floor( Math.random() * cellArray.length ) ];
            console.log( 'randomly selected:', cell );
            return cell;
        };
        return -1;
    };

    // MOVE 1 STEP CLOSER 
    walkTowards( start, end ) {

        // THIS CURRENTLY DOESN'T ADDRESS TOP/BOTTOM WRAP
        // IT SHOULD BE:
        // +/- BY ROWCOUNT UNTIL IN COLUMN
        // +/- 1 UNTIL EQUAL 

        // console.log( 'walking!', start, end  );

        let rowEnd = Math.floor( end / this.rowCount );
        let rowStart = Math.floor( start / this.rowCount );
        
        if ( rowStart == rowEnd ) {
            if ( start > end ) {
                return start - 1;
            }
            return start + 1;
        }

        if ( rowStart > rowEnd ) {
            return start - this.rowCount;
        }
        return start + this.rowCount;


        if ( start > end ) {
            // TO THE LEFT SOMEWHERE
            return ( start - this.rowCount >= end ) ? start - this.rowCount : start - 1;
        };
            // TO THE RIGHT SOMEWHERE
            return ( start + this.rowCount <= end ) ? start + this.rowCount : start + 1;
    };

    highlightCell( html, id ) {
        html.classList.remove( 'active' );
        html = this.deepLore.getCompCell( id );
        html.classList.add( 'active' );
    };

    async hunt( ){
        console.log( 'known cells:' );
        console.log( this.knownCells[ this.owners.COMPUTER ] );

        let result = { result: -1, ship: -1, cellID:-1 };
        let unknownCells = this.createArray_UnknownCells( this.owners.COMPUTER );

        if ( unknownCells.length < 1 ) {
            // THERE ARE NO LEGAL MOVES
                return result;
        }

        // GET LAST SELECTED SQUARE
        // ELSE RANDOM
        if ( !this.targetingCellID ) {

            // CONSIDER MAKING THIS TRULY RANDOM
            // EDGE CASE:
            // ONLY 1 CELL LEFT
            // WE WILL RANDOMLY SELECT FROM A LIST OF 1 CELLS
            // MAKE SURE ALL THE STEP/WALK LOGIC ACCOUNTS FOR THIS
            this.targetingCellID = this.randomlySelectCell( unknownCells );
        };

        let targetingCellHTML = this.deepLore.getCompCell( this.targetingCellID );
        this.highlightCell( targetingCellHTML, this.targetingCellID );

        // IF HUNTING, MOVE 1 ADJECENT FROM LAST HIT
        if ( this.isHunting ) {

        } else {

            // RANDOMLY SELECT A TARGET
            let endGoalCellID = this.randomlySelectCell( unknownCells );

            // MAKE END-GOAL AND TARGETINGCELLID DIFFERENT?

            while ( this.targetingCellID != endGoalCellID ) {

                this.targetingCellID = this.walkTowards( this.targetingCellID, endGoalCellID );
                // console.log( this.targetingCellID, endGoalCellID );
                // PAUSE
                await new Promise( ( resolve, reject ) => setTimeout( resolve, 25 ) );

                // HIGHLIGHT THE NEW CELL
                this.highlightCell( targetingCellHTML, this.targetingCellID );
                targetingCellHTML = this.deepLore.getCompCell( this.targetingCellID );
            };
            result.cellID = this.targetingCellID;
        };

        this.knownCells[ this.owners.COMPUTER ].push( this.targetingCellID );

        // GET RESULTS
        // CHECK PLAYERS SHIP LIST
        
        for( let n = 0; n < this.shipCells[ this.owners.PLAYER ].length; n++ ) {
            let cell = this.shipCells[ this.owners.PLAYER ][ n ];

            if ( cell.cellID == this.targetingCellID ) {
                console.log( 'hit!' );
                // this.knownCells[ this.owners.COMPUTER ].push( cellID );
                result.result = this.results.HIT;
                result.ship = this.shipCells[ this.owners.PLAYER ].shipID;
                return result;
            };
        };

        console.log( 'miss!' );
        result.result = this.results.MISS;
        return result;

    };


};

class Cell {
    ship_ID = -1;
    cell_ID = -1;
    set shipID( val ) { this.ship_ID = val };
    set cellID( val ) { this.cell_ID = val };
    get shipID() { return this.ship_ID };
    get cellID() { return this.cell_ID };
}

export { Battleship };