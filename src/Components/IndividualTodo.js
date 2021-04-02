import React from 'react'
import { Icon } from 'react-icons-kit'
import {edit2} from 'react-icons-kit/feather/edit2'
import {trash} from 'react-icons-kit/feather/trash'

export const IndividualTodo = ({todo, deleteTodo, editModal}) => {
    // console.log(todo)
    const handleDelete=()=>{
        deleteTodo(todo.id);
    }

    const handleEditModal=()=>{
        editModal(todo);
    }

    return (
        <div className='todo'>
            <div>
                {todo.Todo}
            </div>
            <div className='actions-div'>
                <div onClick={handleEditModal} id={todo.id} data-id={todo.id}>
                   <Icon size={18} icon={edit2}/>
                </div>
                <div className='delete-btn' onClick={handleDelete}>
                   <Icon size={18} icon={trash}/>
                </div>
            </div>
        </div>
    )
}
