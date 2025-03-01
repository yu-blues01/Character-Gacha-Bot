function checkHavingStatus( table, userIndex ) {
  var havingTokenName = [];

  for ( let col = 0; col < table[userIndex].length; col++ ) {
    if ( table[userIndex][col] === '○' ) {
      havingTokenName.push( table[0][col] );
    }
  }

  return havingTokenName;
}
