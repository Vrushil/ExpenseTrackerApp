import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Table,Button,Input,Container, Form, FormGroup , Label} from 'reactstrap';
import {Link }from 'react-router-dom';
import Moment from 'react-moment';
import './Expense.css';


class Expense extends Component {
    
    emptyItem={
        description:'',
        expenseDate: new Date(),
        id:100,
        location:'',
        category:{id:1,name:'Travel'}
    }

    constructor(props)
    {
        super(props)
        this.state = { 

        
            isLoading:false,
            Categories:[],
            Expenses:[],
            date: new Date(),
           
            item:this.emptyItem
        
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleDateChange= this.handleDateChange.bind(this);
    }

   

    // {
    //     "id": 103,
    //     "expensedate": "2019-06-15T15:00:00Z",
    //     "description": "fIAT Mustang Payment",
    //     "location": "Los Angeles",
    //     "category": {
    //         "id": 2,
    //         "name": "Auto Loan"
    //     }
    // }

    // async remove(id)
    // {
        
    //  await fetch('api/expenses/:id',{ 
    //     method:'DELETE',
    //     headers:{
    //         'Accept':'application/json',
    //         'Content-Type':'application/json'
    //     }
    //    }).then(()=>{
    //        let UpdatedExpenses=[...this.state.Expenses].filter(i=>i.id!==id);
    //        this.setState({Expenses:UpdatedExpenses});
    //    }); 


    // }

   

    async handleSubmit(event)
    {
       
        const item=this.state.item;
        await fetch(`api/expenses`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(item),
        });
        event.preventDefault();
       
        this.props.history.push("/expenses");
    }

    handleChange(event){
        const target= event.target;
        const value= target.value;
        const name = target.name;
        let item={...this.state.item};
        item[name] = value;
        this.setState({item});
        console.log(item);
      }

      handleDateChange(date){
        let item={...this.state.item};
        item.expensedate= date;
        this.setState({item});
      
      }


    async remove(id){
        await fetch(`/api/expenses/${id}`,{
            method:'DELETE',
            headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    }
        }).then(()=>{
            let UpdatedExpenses=[...this.state.Expenses].filter(i=>i.id!==id);
             this.setState({Expenses:UpdatedExpenses}); 
        });
    }
   



    // async remove(id){
    //     await fetch(`/api/expenses/${id}` , {
    //       method: 'DELETE' ,
    //       headers : {
    //         'Accept' : 'application/json',
    //         'Content-Type' : 'application/json'
    //       }

    //     }).then(() => {
    //       let updatedExpenses = [...this.state.Expsenses].filter(i => i.id !== id);
    //       this.setState({Expsenses : updatedExpenses});
    //     });

    // }



     async componentDidMount()
     {
         const response= await fetch('/api/categories');
         const body= await response.json();
         this.setState({Categories:body,isLoading :false});


         const responseExp= await fetch('/api/expenses');
         const bodyExp= await responseExp.json();
         this.setState({Expenses:bodyExp,isLoading :false});
         console.log(bodyExp);
        }


    render() { 
        const title= <h3 className="expenseTitle">Add Expense</h3>
        const{Categories}=this.state;
        const{Expenses,isLoading}=this.state;

        if(isLoading)
            return(<div>Loading. Please wait</div>)
        
        
        let categoriesList=  Categories.map(category=> 
                <option value={category.id} key={category.id}>
                    {category.name}
                    </option>
                    )

        let rows= Expenses.map(expense=> <tr key={expense.id}  id="expenseList">
                        <td>{expense.description}</td>
                        <td>{expense.location}</td>
                        <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                        <td>{expense.category.name}</td>
                        <td><Button  size='sm' color='danger' onClick={()=> this.remove(expense.id)}>Delete</Button></td>
                               
               
                       </tr>
                )
 
            return (<div className="expenseAdd">
            <AppNav/>
         <Container>
            {title}
            <Form onSubmit={this.handleSubmit}>
            <FormGroup>
            <Label for="description">Title</Label>
            <Input type='description'  name='description' id='description'  onChange={this.handleChange} autoComplete="name"/>
            </FormGroup>



            <FormGroup>
            <Label for="category">Category</Label>
                <select onChange={this.handleChange}>
                {categoriesList}
                </select>
            
            </FormGroup>

            
            <FormGroup>
            
            <Label for="city"> Date</Label>
            <DatePicker selected={this.state.item.expensedate} id='expenseDate'  onChange={this.handleDateChange}/>
            </FormGroup>

           
            <div className="row">
            <FormGroup className="col-md-4 mb-3" >
            <Label for="location">Location</Label>
            
        <Input type='text' name='location'  id='location' onChange={this.handleChange}/>
            
            </FormGroup>
            </div>

            <FormGroup>
            <Button color='primary'type="submit" > Save</Button>{' '}
            <Button color="secondary"  tag={Link} to='/'>Cancel</Button>
            </FormGroup>


            </Form>
            
            </Container>


            {''}

            <Container>
            <h3> Expense List</h3>
            <Table className="mt-4" id="expenseList" >
            <thead>
            <tr>
            <th width="30%">Description</th>
            <th width="10%">Location</th>
            <th width="10%">Date</th>
            <th>Category</th>
            <th width="10%">Action</th>
            

            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
            </Table>
            
            </Container>

            </div>
            );
          
        }
}
 
export default Expense ;