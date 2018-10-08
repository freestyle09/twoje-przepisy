import React from 'react';

export class Header extends React.Component {
    render() {
        return (
            <div>
                <h1 className='h1'>Twoje <img src='../../images/egg-24404_1280.png' /> <span className='header-color'> Przepisy </span></h1>
            </div>
        );
    }
}