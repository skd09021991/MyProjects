import React from 'react';

import './Backdrop.scss';

const Backdrop = props => (
    <div onClick = { props.click } className = 'Backdrop' ></div>
)

export default Backdrop;