import React, { Component } from 'react';
import { AppList } from './AppList/index';
import './App.css';

class App extends Component {
    render() {
        return (
           <div className='appContainer'>
                <AppList />
           </div>
        );
    }
}

export default App;