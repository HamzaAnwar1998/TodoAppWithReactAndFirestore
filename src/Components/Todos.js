import React from 'react'
import { IndividualTodo } from './IndividualTodo'

export const Todos = ({todos, deleteTodo
,editModal}) => {
    // console.log(todos);
    return todos.map(todo=>(
        <IndividualTodo todo={todo} key={todo.id} deleteTodo={deleteTodo}
            editModal={editModal}
        />
    ))
}
