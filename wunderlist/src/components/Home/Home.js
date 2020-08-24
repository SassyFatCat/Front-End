// LIBRARIES, UTILITIES, CSS
import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div id='container'>
            <div id='background'></div>
            <div id='title'>
                <h1>Wunderlist<span id='copyright'>©</span></h1>
                <p>Your new favorite to-do list.</p>
                <Link to='/login'>Login</Link>
            </div>
            
        </div>
    )
}

export default Home