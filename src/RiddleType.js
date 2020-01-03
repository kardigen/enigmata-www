import React from 'react';

function RiddleType (props) {

    let sourceType = "";
    if(props.riddleType === "wikipedia") {
        sourceType = <p>Rozwiązaniem jest hasło znajdujące się w <a href="https://pl.wikipedia.org" target="_blank" rel="noopener noreferrer">polskiej wikipedii</a>.</p>
    } else if( props.riddleType === "logika") {
        sourceType = <p>Rozwiązaniem jest hasło bazujące na logice i wiedzy podstawowej.</p>
    } else if( props.riddleType === "wiedza") {
        sourceType = <p>Rozwiązaniem jest hasło znajdujące się w tekście strony <a href="https://pl.wikipedia.org" target="_blank" rel="noopener noreferrer">polskiej wikipedii</a>.</p>
    }else if( props.riddleType === "liczba") {
        sourceType = <p>Rozwiązaniem jest hasło będące liczbą o możliwie najkrótszej postaci dziesiętnej (bez zbędnych zer, spacji i innych znaków), gdzie część ułamkową oddziela ',' (przecinek).</p>
    }

    return(sourceType)
}

export default RiddleType;