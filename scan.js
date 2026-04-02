'use strict';

document.addEventListener( 'DOMContentLoaded', OnLoadedDom );

/**
 * DOMを読み込んだ時の処理
 */
function OnLoadedDom() 
{
    let     is_scanned  = false;
    const   SCANNER     = new Html5QrcodeScanner( 'qr-reader', { fps: 15, qrbox: 250 } );

    SCANNER.render( text => 
    {
        if ( is_scanned ) return;
        is_scanned = true;

        const SE = document.getElementById( 'se' );
        SE.currentTime = 0;
        SE.play();

        const PARAMETERS = new URLSearchParams( location.search );

        window.opener.postMessage(
            { type: "qr", value: text, access_type: PARAMETERS.get( 'access-type' ) },
            PARAMETERS.get( 'origin' )
        );

        // postMessageを正常に完了させ、不安定なバグの防止のため少し待機してから閉じる
        setTimeout( () => window.close(), 1000 );
    } );
}
