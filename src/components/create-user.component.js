import React, {Component } from 'react';
import axios from 'axios'

export default class CreateUser extends Component{

    constructor(props)
    {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            Username : '',
        }
    }
    onChangeUsername(e)
    {
        this.setState({
            Username : e.target.value
        })
    }

    onSubmit(e)
    {
        e.preventDefault();

        const user={
            Username : this.state.Username,
        }
        console.log(user);

        axios.post('http://localhost:5000/users/addUser',user)
        .then((res)=>{
            console.log(res.data.success);
        })

        this.setState({
            Username :' '
        })
      // window.location = '/';
    }
    render(){
        return(
            <div>
               <h3>Create New User</h3>
               <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>
                            Username  
                        </label>
                        <br />
                        <input type="text" className="form-control" required value={this.state.Username}
                        onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                              <input type="submit" value="Create" className="btn btn-primary" />
                        </div>    
               </form>
            </div>
        )
    }
  
}