import React,{useState} from 'react'
import { Header } from './Header'
import {auth, db} from '../Config/Config'
import { Todos } from './Todos';
import { Modal } from './Modal';

export const Home = ({currentUser, todos, deleteTodo,
editModal, todo, updateTodoHandler}) => {

  const [addTodo, setAddTodo]=useState('');

  const [todoError, setTodoError]=useState('');

  const handleTodoSubmit=(e)=>{
    e.preventDefault();
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('todos of ' + user.uid).add({
          Todo: addTodo
        }).then(setAddTodo('')).catch(err=>setTodoError(err.message))
      }
      else{
        console.log('no user is signed in');
      }
    })
  }

    return (
      <>
        <div className='wrapper'>
          <Header currentUser={currentUser}/>
          <br></br>
          <br></br>
          <div className='container'>
            <form autoComplete='off' className='form-group'
            onSubmit={handleTodoSubmit}>
            {currentUser&&<>
              <input type="text" placeholder="Enter TODO's"
                className='form-control' required
                onChange={(e)=>setAddTodo(e.target.value)} value={addTodo}
              />
              <br></br>
              <div style={{width: 100+'%',
              display: 'flex',justifyContent: 'flex-end'}}>
                <button type="submit" className='btn btn-success'
                  style={{width: 100+'%'}}>
                   ADD
                </button>
              </div>
              {todoError&&<div className='error-msg'>{todoError}</div>}
            </>}
            {!currentUser&&<>
              <input type="text" placeholder="Enter TODO's"
                className='form-control' required disabled
              />
              <br></br>
              <div style={{width: 100+'%',
              display: 'flex',justifyContent: 'flex-end'}}>
                <button type="submit" className='btn btn-success'
                disabled style={{width: 100+'%'}}>
                   ADD
                </button>
              </div>
              <div className='error-msg'>
                Please register your account or login to use application
              </div>
            </>}
            
            </form>

            <Todos todos={todos} deleteTodo={deleteTodo}
              editModal={editModal}
            />
            <br></br>
            <br></br>
          </div>  
        </div>
        {todo&&<Modal todo={todo} editModal={editModal}
        updateTodoHandler={updateTodoHandler}
        />}
        </>

    )
}
