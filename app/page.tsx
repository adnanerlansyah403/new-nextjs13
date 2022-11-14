import React, { Suspense } from 'react'
import TodoList from './(users)/todos/TodoList'

function Home() {
  return (
    <div className=''>

      <Suspense fallback={<p className='text-red-400'>Loading the Todos...</p>}>
        <h1>Loading Todos</h1>
        <div className="flex space-x-2">
          {/* @ts-ignore */}
          <TodoList />
        </div>
      </Suspense>

      <Suspense fallback={<p className='text-blue-400'>Loading the Shopping Trulley</p>}>
        <h1>Loading Shopping Trulley</h1>
        <div className="flex space-x-2">
          {/* @ts-ignore */}
          <TodoList />
        </div>
      </Suspense>

    </div>
  )
}

export default Home