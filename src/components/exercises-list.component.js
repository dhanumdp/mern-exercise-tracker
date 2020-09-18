import React, {Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

const Exercise = props =>(
    <tr>
        <td>{props.exercise.Username}</td>
        <td>{props.exercise.Description}</td>
        <td>{props.exercise.Duration}</td>
        <td>{props.exercise.Date.substring(0,10)}</td>
        <td>
        <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="#" onClick={()=>{props.deleteExercise(props.exercise._id)}}>Delete</a>
        </td>
     </tr>   

)

export default class ExercisesList extends Component{

    constructor(props)
    {
        super(props);
      this.deleteExercise = this.deleteExercise.bind(this);

       this.state = {Exercises :[]};
    }

        componentDidMount()
        {
            axios.get('http://localhost:5000/exercises/list')
            .then((res)=>{
               this.setState({
                   Exercises : res.data.Exercises
               })
            })
            .catch((err)=>{
                console.log(err);
            })
        }

        deleteExercise(id)
        {
            axios.delete('http://localhost:5000/exercises/delete/'+id)
            .then(res=>console.log(res.data))
            this.setState({
                Exercises : this.state.Exercises.filter(element => element._id !== id)
            })
        }
        exerciseList()
        {
            return this.state.Exercises.map(currentExercise =>{ 
                return <Exercise exercise ={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>;
            })
        }
    render(){
        return(
            <div>
                 <h3 style={{textAlign:"center"}}>Exercises</h3>
                 <table className="table">
                     <thead className="thead-light">
                         <tr>
                             <th>Username</th>
                             <th>Description</th>
                             <th>Duration</th>
                             <th>Date</th>
                             <th>Actions</th>
                         </tr>
                     </thead>
                     <tbody>
                         {this.exerciseList()}
                     </tbody>
                </table>
            </div>
        )
    }
  
}