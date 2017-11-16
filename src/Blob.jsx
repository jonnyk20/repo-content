import React from 'react';
import { string, object } from 'prop-types'; 

const Blob = ({ object: { path } } ) => {
 return <li> 
   Blob: {path}
   </li>
}

Blob.propTypes = {
  object: object,
  path: string
}

export default Blob;