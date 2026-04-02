'use strict';

document.addEventListener( 'DOMContentLoaded', OnLoadedDom );


/**
 * DOMを読み込んだ時の処理
 */
function OnLoadedDom() 
{
    const SCANNER = new Html5QrcodeScanner( "qr-reader", { fps: 15, qrbox: 240 } );

    const OnSucceeded = text =>
    {
        document.getElementById("result").textContent="Scanned: "+ text;
    };

    const OnFailed = () => {};

    SCANNER.render( OnSucceeded, OnFailed );
}
