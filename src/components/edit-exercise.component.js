import React, {Component } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
export default class EditExercise extends Component{


    constructor(props)
    {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            Username : '',
            Description :'',
            Duration :0,
            Date : new Date(),
            Users :[]
        }
    }

    componentDidMount()
    {

        axios.get('http://localhost:5000/exercises/list/'+this.props.match.params.id)
        .then(res=>{
            this.setState({
                Username : res.data.Exercise.Username,
                Description:res.data.Exercise.Description,
                Duration : res.data.Exercise.Duration,
                Date : new Date(res.data.Exercise.Date)

            })
           
        }) .catch((err)=>{console.log(err)})




        axios.get('http://localhost:5000/users/list')
        .then((res)=>{
            if(res.data.Users.length >0)
                {   
                this.setState({
                    Users :res.data.Users.map(user =>user.Username),

                })
            }
            
        })
       
    }

    onChangeUsername(e)
    {
        this.setState({
            Username : e.target.value
        })
    }
    onChangeDescription(e)
    {
        this.setState({
            Description : e.target.value
        })
    }
    onChangeDuration(e)
    {
        this.setState({
            Duration : e.target.value
        })
    }
    onChangeDate(date)
    {
        this.setState({
            Date : date
        })
    }

    onSubmit(e)
    {
        e.preventDefault();

        const exercise={
            Username : this.state.Username,
            Description : this.state.Description,
            Duration : this.state.Duration,
            Date : this.state.Date
        }
        console.log(exercise);

        axios.put('http://localhost:5000/exercises/update/'+this.props.match.params.id,exercise)
        .then((res)=>{
            console.log(res.data);
        })

       window.location = '/';
    }

    

    render(){
        return(
           <div>
               <h3>Edit Exercise</h3>
               <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Userame : </label>
                        <select useref="userInput" required
                            className="form-control" value={this.state.Username}
                            onChange={this.onChangeUsername}>

                                {
                                    this.state.Users.map(function(user){
                                        return <option
                                        key ={user}
                                    value ={user}>{user}</option>
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group">
                                <label>
                                    Description
                                </label>
                                <input type="text" required className="form-control" value={this.state.Description} onChange={this.onChangeDescription}/>
                     </div>  
                     <div className="form-group">
                                <label>
                                   Duration
                                </label>
                                <input type="text" required className="form-control" value={this.state.Duration} onChange={this.onChangeDuration}/>
                     </div>  
                     <div className="form-group">
                                <label>
                                    Date
                                </label>
                                <div>
                                    <DatePicker
                                        selected = {this.state.Date}
                                        onChange = {this.onChangeDate}
                                       /> 
                                </div>    
                          </div> 
                          <div className="form-group">
                              <input type="submit" value="Edit" className="btn btn-primary" />
                        </div>       
               </form>
           </div>
        );
    }
  
}