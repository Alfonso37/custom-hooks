import { useReducer, useEffect } from "react";
import { todoReducer } from "./todoReducer";

const initialState = []

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const UseTodos = ( ) => {

    /* Utilizando el todoReducer.js (Se envía la función dispatch para )
        enviar los eventos que van en el "type"
    */
    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init )

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ) );
    }, [todos])

    const handleNewTodo = ( todo ) => {
        const action = {
            type: 'Add Todo',
            payload: todo
        }
        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: 'Remove Todo',
            payload: id,
        })
    }

    const handleToggleTodo = ( id ) => {
            dispatch({
                type: 'Toggle Todo',
                payload: id,
            })
    }

    return {
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todos,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        todosCount: todos.length,
    }

}