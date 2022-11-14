import React from 'react'
import { Todo } from '../../../../typings'
import NotFound from './not-found'

type PageProps = {
    params: {
        todoId: string
    }
}

const fetchTodo = async (todoId: string) => {

    const timeOut = Math.floor(Math.random() * 5 + 1) * 1000;
    await new Promise((resolve) => setTimeout(resolve, timeOut));

    const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`, { 
            next: {
                revalidate: 60
            } 
        }
    )

    const todo: Todo = await res.json()
    return todo;

}

async function TodoPage({ params: { todoId }}: PageProps ) {

    const todo = await fetchTodo(todoId);

    if(!todo.id) return <NotFound />

  return (
    <div className='p-10 bg-yellow-200 border-2 m-2 shadow-md'>
        <p>
            #{todo.id}: {todo.title}
        </p>
        <p>Completed: {todo.completed ? "Yes" : "No"}</p>
        <p className="border-t border-black mt-5 text-right">
            By User: {todo.userId}
        </p>
    </div>
  )
}

export default TodoPage

export async function genericStaticParams() {
    
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos: Todo[] = await res.json();

    // for this DEMO, we are only prebuilding the first 10 pages to avoid being rate limited by the DEMO API
    const trimmedTodos = todos.slice(0, 10);


    return todos.map((todo) => ({
        todoId: todo.id.toString(),
    }));
}