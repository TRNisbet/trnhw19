import React, { Component } from "react";
import API from "../utils/API";

export default class Discover extends Component {
   
   constructor(props) {
       super(props);

    this.state = {
        Employees: [],
        sorted: false,
    };
       this.handleOnClick = this.handleOnClick.bind(this);
    }

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

    handleOnClick = (e) => {
        function compare(a, b) {
            const emp1 = a.name.first.toUpperCase();
            const emp2 = b.name.first.toUpperCase();

            if (emp1<emp2) {
                return -1;
            }
            if (emp1>emp2) {
                return 1;
            }
            // a must be equal to b
            return 0;
        }

var sortedEmp = this.state.Employees.sort(compare);

            this.setState({
                   Employees: sortedEmp
                })
           

    }

    render() {
        return (
            <div>
                <table>
                   <caption className="text-center">Employee Directory</caption>
                   <thead>
                       <tr> 
                            <th onClick={this.handleOnClick}>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>UUID</th>
                            <th>Gender</th>
                        </tr>
                   </thead>
                       <tbody>
                    {this.state.Employees.map((Employee) => {
                        return (<tr key={Employee.login.uuid}>
                            <td>{Employee.name.first} </td>
                            <td>{Employee.name.last} </td>
                            <td>{Employee.email} </td>
                            <td>{Employee.login.uuid} </td>
                            <td>{Employee.gender} </td>
                        </tr>
                    )})
                }
                    </tbody>
        </table> 
    
               
            </div>
        );
    }






}