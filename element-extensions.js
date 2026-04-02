'use strict';

/**
 * 押したときの処理を登録
 */
Element.prototype.RegisterOnPushed = function( on_pushed ) 
{
  if ( !IsSmartDevice() ) 
  {
    this.addEventListener( 'click', on_pushed );
    return;
  }

  let   is_touching = false;
  const OPTION      = GetPassiveOption();

  const OnTouched = () =>
  {
      if ( !is_touching ) return;

      on_pushed();
      is_touching = false;
  };

  this.addEventListener( 'touchstart' , () => is_touching = true  , OPTION );
  this.addEventListener( 'touchmove'  , () => is_touching = false , OPTION );
  this.addEventListener( 'touchend'   , OnTouched                 , OPTION );
};

/**
 * 変更したときの処理を登録
 */
Element.prototype.RegisterOnChanged = function( on_changed ) 
{
    this.addEventListener( 'change', on_changed );
};

/**
 * 全ての子要素を削除
 */
Element.prototype.RemoveAllChildren = function() 
{
    while ( this.firstChild !== null ) this.removeChild( this.firstChild );
};

/**
 * オプションを作成し、子として追加
 */
Element.prototype.CreateOptionAndAddAsChild = function( value ) 
{
    const OPTION = document.createElement( 'option' );
    OPTION.value = value;

    this.appendChild( OPTION );
};
