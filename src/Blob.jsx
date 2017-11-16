import React from 'react';

const Blob = (props) => {
 return <li> 
   Blob -- Path: {props.item.path}, Type: {props.item.type}, parentBlob: {props.item.parentTree}
   </li>
}

export default Blob;