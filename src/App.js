import React, { Component } from 'react';
// import uuid from 'uuid';
// import uuid from 'uuid/v4';
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery';
import Todos from './Components/Todos';
import './App.css';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';

class App extends Component {
  constructor(){
    super();
    this.state = {
      projects: [ ],
      todos:[]
    }
  }
  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({todos: data}, function(){
          console.log(this.state);
        })

      }.bind(this),
      error: function(xhr,status,err){
        console.log(err);
      }
    });

  }
  getProjects(){
    this.setState({projects: [
        {
          id: uuidv4(),
          title: 'Business Website',
          category: 'Web Design'
        },
        {
          id: uuidv4(),
          title: 'Social App',
          category: 'Mobile Development'
        },
        {
          id: uuidv4(),
          title: 'Ecoomerce Shopping Cart',
          category: 'Web Development'
        }
      ]}); 

  }
  componentWillMount(){
      this.getProjects();
      this.getTodos(); 
  }
  componentDidMount(){
    this.getTodos();

  }

  handleAddProject(project){
    // console.log(project)
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});
  }
  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index,1);
    this.setState({projects:projects});

  }
  render() {
     return (
    <div className="App">
      <AddProject addProject={this.handleAddProject.bind(this)}/>
      <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
      <hr/>
      <Todos todos={this.state.todos}/>
    </div>
  );
  }
}
 

export default App;
