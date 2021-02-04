import React, { Component } from 'react';
import AppNav from './AppNav';
import './Home.css';
class Home extends Component {
    state = {  }
    render() { 
        return (  

            //In the home page it adds an app nav with the following tag
       <div >
            <AppNav/>
            </div>
            );
    }
}
 
export default Home;