import React from 'react'

function Svg (props) {
    const useTag = '<use xlink:href="'+ props.href + '" />';
    return(<svg style={props.style} className={props.className} dangerouslySetInnerHTML={{__html: useTag }} ></svg>)
}

export default Svg;