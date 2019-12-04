import React, {Component} from 'react';
import Person from './Person/Person';
import './App.css';

class App extends Component {
  state= {
    persons: [
      {name:'mahesh', age:27},
      {name: 'sujit', age:28},
      {name: 'santosh', age:27}

    ],
    showPersons: false,
  }
  switchNameHandler = () => {
    this.setState({
      persons: [
        {name:'mahesh ahirwar', age:28},
        {name: 'sujit prajapati', age:29},
        {name: 'santosh dash', age:28}
  
      ]
    })
}
togglePersonHandler = () => {
 const doesShow = this.state.showPersons;
 this.setState({showPersons: !doesShow})
}
  
  render() {

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map(person => {
            return <Person name={person.name} age={person.age}/>
          })}
        </div>
      );
      
    }
    return (
      <div className="App">
        <h1>Welcome to the practice session</h1>
        <p>Here i am for practice</p>
        <button onClick={this.togglePersonHandler}>Switch Name</button>
        
          
        {persons}
        
      </div>
    );
  }
  
}

export default App;
