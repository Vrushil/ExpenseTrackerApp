import React, { Component } from 'react';
import{Route,BrowserRouter as Router,Switch,} from 'react-router-dom';
import Category from './Category';
import Home from './Home';
import Expense from './Expense';
import './Expense.css';

// This class will bring everything together and send it to Index.js
class App extends Component {
    state = {  }
    render() { 
        return ( <Router>
            <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/categories" exact={true} component={Category}/>
            <Route path="/expenses" exact={true} component={Expense}/>
            
            
           
            </Switch>
            
            </Router>
             );
    }
}
 
export default App;