'use strict';

/**
 * パッシブオプションを取得 
 */
function GetPassiveOption()
{
  return CanUsePassive() ? { passive: true } : false;
};

/**
 * パッシブオプションが使用できるか判別する値を取得
 */
function CanUsePassive() 
{
  let can_use_passive = false;
  
  const PROPERTY  = { get: function() { can_use_passive = true; } };
  const OPTIONS   = Object.defineProperty( {}, 'passive', PROPERTY );

  try 
  {
    window.addEventListener( 'dummy', null, OPTIONS );
  }
  catch( e ) 
  {
  }

  return can_use_passive;
};

/**
 * スマートデバイスか判別する値を取得
 */
function IsSmartDevice() 
{
  return IsSmartPhone() || IsTablet();
}

/**
 * スマートフォンか判別する値を取得
 */
function IsSmartPhone() 
{
  const USER_AGENT      = GetUserAgent();
  const IS_SMART_PHONE  = 
    USER_AGENT.indexOf('iPhone')  > 0 || 
    USER_AGENT.indexOf('iPod')    > 0 ||
    USER_AGENT.indexOf('Android') > 0 && USER_AGENT.indexOf('Mobile') > 0
  ;

  return IS_SMART_PHONE;
}

/**
 * タブレットか判別する値を取得
 */
function IsTablet() 
{
  const USER_AGENT  = GetUserAgent();
  const IS_TABLET   = USER_AGENT.indexOf('iPad') > 0 || USER_AGENT.indexOf('Android') > 0;

  return IS_TABLET;
}

/**
 * ユーザエイジェントを取得
 */
function GetUserAgent() 
{
  return navigator.userAgent;
}

/**
 * テキストファイルとしてダウンロード
 */
function DownloadAsTextFile( file_name, content ) 
{
  DownloadFile( file_name, content, 'text/plain' );
}

/**
 * JSONファイルとしてダウンロード
 */
function DownloadAsJsonFile( file_name, content ) 
{
  DownloadFile( file_name, content, 'application/json' );
}

/**
 * ファイルをダウンロード
 */
function DownloadFile( file_name, content, type ) 
{
  const BLOB              = new Blob( [ content ], { 'type': type } );
  const CAN_USE_SAVE_BLOB = window.navigator.msSaveBlob !== undefined;

  if ( CAN_USE_SAVE_BLOB ) 
  {
    window.navigator.msSaveBlob( BLOB, file_name );
    return;
  }

  const TEMPORARY_ANCHOR  = document.createElement( 'a' );
  TEMPORARY_ANCHOR.href   = URL.createObjectURL( BLOB );
  TEMPORARY_ANCHOR.setAttribute( 'download', file_name );
  TEMPORARY_ANCHOR.dispatchEvent( new MouseEvent( 'click' ) );
}

/**
 * nullか判別する値を取得 
 */
function IsNull( value ) 
{
  return value === null;
}
