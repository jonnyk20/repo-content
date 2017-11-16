import React from 'react';

const Tree = (props) => {
 return <li> 
    Tree -- Path: {props.item.path},  Type: {props.item.type},  parentTree: {props.item.parentTree}
    <ul>
      {props.renderTree(props.item.items)}
    </ul>
   </li>
}

export default Tree;