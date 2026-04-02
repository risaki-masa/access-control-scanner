'use strict';

document.addEventListener( 'DOMContentLoaded', OnLoadedDom );


/**
 * DOMを読み込んだ時の処理
 */
function OnLoadedDom() 
{
    const SCANNER = new Html5QrcodeScanner( 'qr-reader', { fps: 15, qrbox: 250 } );

    const OnSucceeded = text =>
    {
        const PARAMETERS = new URLSearchParams( location.search );

        document.getElementById( 'result' ).textContent= 'Scanned: ' + text + ', origin: ' + PARAMETERS.get( 'origin' ) + ', access-type: ' + PARAMETERS.get( 'access-type' );
    };

    const OnFailed = () => {};

    SCANNER.render( OnSucceeded, OnFailed );
}
