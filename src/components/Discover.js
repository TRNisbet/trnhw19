import React, { Component } from "react";
import API from "../utils/API";

export default class Discover extends Component {
    state = {
        Employees: [],
        sorted: false,
    };

    componentDidMount() {
        this.loadNextEmployees();
    }

    loadNextEmployees = () => {
        API.getEmployees()
            .then(res =>
                this.setState({
                   Employees: res.data.results
                })
            )
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <table>
                   <caption className="text-center">Employee Directory</caption>
                   <thead>
                       <tr> 
                           <th> First Name</th>
                            <th> Last Name</th>
                            <th> Email</th>
                        </tr>
                   </thead>
                       <tbody>
                    {this.state.Employees.map((Employee) => {
                        return (<tr>
                            <td>{Employee.name.first} </td>
                            <td>{Employee.name.last} </td>
                            <td>{Employee.email} </td>
                        </tr>
                    )})
                }
                    </tbody>
        </table> 
    
               
            </div>
        );
    }






}