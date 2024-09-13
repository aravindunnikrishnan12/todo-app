


import { Route, Routes } from 'react-router-dom'
import Todo from './page/Todo'
import  Login  from './page/Login'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/Login' element={  <Login/>}/>
        <Route path='/todolist' element={  <Todo/>}/>
        
      </Routes>
    </div>
  )
}
