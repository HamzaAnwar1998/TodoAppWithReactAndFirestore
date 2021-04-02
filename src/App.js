import React, { Component } from 'react'
import { Home } from './Components/Home'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Signup } from './Components/Signup'
import { Login } from './Components/Login'
import {NotFound} from './Components/NotFound'
import {auth, db} from './Config/Config'

export class App extends Component {

  state={
    currentUser: null,
    todos:[],
    todo: null
  }

  componentDidMount(){
    // getting current user
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('users').doc(user.uid).get().then(snapshot=>{
          this.setState({
            currentUser: snapshot.data().Name
          })
        })
      }
      else{
        console.log('user is not signed in for getting current user');
      }      
    })
    // getting todo items for current user
    auth.onAuthStateChanged(user=>{
      if(user){
        const todoList = this.state.todos;
        db.collection('todos of ' + user.uid).onSnapshot(snapshot=>{
          let changes = snapshot.docChanges();
          changes.forEach(change=>{
            if(change.type==='added'){
              todoList.push({
                id: change.doc.id,
                Todo: change.doc.data().Todo
              })
            }
            else if(change.type==='removed'){
              for(var i = 0; i<todoList.length; i++){
                if(todoList[i].id===change.doc.id){
                  todoList.splice(i,1);
                }
              }
            }

            this.setState({
              todos: todoList
            })
            // console.log(this.state.todos);
          })
        })
      }
      else{
        console.log('user is not signed in to retrive todos');
      }
    })
  }

  deleteTodo=(id)=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('todos of ' + user.uid).doc(id).delete();
      }
      else{
        console.log('user is not signed in to delete data');
      }
    })
  }

  editModal=(todo)=>{
    // console.log(todo.id);
    this.setState({
      todo: todo
    })
  }

  updateTodoHandler=(todo, id)=>{
    // console.log(id, todo);
    const todoList=this.state.todos;
    for(var i=0; i<todoList.length; i++){
      if(todoList[i].id===id){
        // console.log('id matched');
        todoList.splice(i,1,{id,Todo: todo});
        
      }
      this.setState({
        todos: todoList
      })
      
    }
    
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={()=><Home
            currentUser={this.state.currentUser}
            todos={this.state.todos}
            deleteTodo={this.deleteTodo}
            editModal={this.editModal}
            todo={this.state.todo}
            updateTodoHandler={this.updateTodoHandler}
          />}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>

          <Route path="" component={NotFound}/>
        </Switch>
      </Router>      
    )
  }
}

export default App
