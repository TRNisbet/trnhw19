import React, { Component } from "react";
import API from "../utils/API";

export default class Discover extends Component {
   
   constructor(props) {
       super(props);

    this.state = {
        Employees: [],
        filteredEmp: [],
    };
       this.handleOnClick = this.handleOnClick.bind(this);
       this.onClickRad = this.onClickRad.bind(this);
    }

    componentDidMount() {
        this.loadNextEmployees();
    }



    loadNextEmployees = () => {
        API.getEmployees()
            .then(res =>
                this.setState({
                   Employees: res.data.results,
                   filteredEmp:  res.data.results,
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
            
            return 0;
        }

            var sortedEmp = this.state.Employees.sort(compare);

            this.setState({
                   filterEmps: sortedEmp
                })
    }

onClickRad = (e) => {
    const gender = e.currentTarget.value;
    
    if (gender === "all") {
        this.setState({
      filteredEmp: this.state.Employees
      });
       return;
    }

    var filterEmps = this.state.Employees.filter( function(employee) { 
    return employee.gender == gender;

    });
    
    this.setState({
      filteredEmp: filterEmps
      });
    
    }
    render() {
        return (
            <div>
                <h1>Employee Dirctory</h1>
                   <input type="radio" id="male" name="gender" value="male" onClick={this.onClickRad}/>
                   <label for="male">Male</label>
                   <input type="radio" id="female" name="gender" value="female" onClick={this.onClickRad}/>
                   <label for="female">Female</label>
                   <input type="radio" id="all" name="gender" value="all" onClick={this.onClickRad}/>
                   <label for="other">All</label>
                <table>
                   
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
                    {this.state.filteredEmp.map((Employee) => {
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