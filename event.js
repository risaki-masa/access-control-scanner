'use strict';

document.addEventListener( 'DOMContentLoaded', OnLoadedDom );

/**
 * DOMを読み込んだ時の処理
 */
function OnLoadedDom() 
{
    let     is_scanned  = false;
    const   SCANNER     = new Html5QrcodeScanner( 'qr-scanner', { fps: 15, qrbox: 250 } );

    SCANNER.render( text => 
    {
        if ( is_scanned ) return;
        is_scanned = true;

        const PARAMETERS = new URLSearchParams( location.search );

        window.opener.postMessage(
            { type: 'qr', value: text, access_type: PARAMETERS.get( 'access-type' ) },
            PARAMETERS.get( 'origin' )
        );


        // postMessageを正常に完了させ、不安定なバグを防止するため少し待機してから閉じる
        setTimeout( () => CloseWindow( SCANNER), 1000 );
    } );

    const CANCEL_ELEMENT = document.getElementById( 'cancel' );
    CANCEL_ELEMENT.RegisterOnPushed( () =>
    {
        if ( is_scanned ) return;
        CloseWindow( SCANNER );
    } );
}

/**
 * ウィンドウを閉じる
 */
async function CloseWindow( scanner ) 
{
    try {
        if ( scanner ) 
        {
            await scanner.stop();
            scanner.clear();
        }
    } 
    catch ( e ) 
    {
        console.error( "停止エラー: ", e );
    }

    window.close();
}
