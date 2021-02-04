import React, { Component } from 'react';
//import Category from './Category';
import './Category.css';

import AppNav from './AppNav';
class  Category extends Component {
    state = { 
        isLoading:true,
        Categories:[]
     }
     async componentDidMount() {

        // Here we need to use a proxy and mentionit it in package.json file as the api would be sending it localhost: 8080/api/categories and we need to fetch it from there
   const response = await fetch('/api/categories/');
   const body=await response.json();
   this.setState({Categories:body,isLoading:false});
        
     }
    render() { 

        const {Categories,isLoading}= this.state;
       //If it is still loading then show the following else..
        if(isLoading)
        {
            return(<div>Loading Data! Please wait....</div>);
        }
        //else return this
        return (  <div>
            <AppNav/>
            <h2 className='categoryHeader'>Categories</h2>
{
    // we use a javascript map function where we are mappinf each id with a division and printing  its name in that  div
    Categories.map(category =>
        <div className='categoryValues' id={category.id}>
        {category.name }
        </div> )
}            
            </div>);
    }
}
 
export default  Category;