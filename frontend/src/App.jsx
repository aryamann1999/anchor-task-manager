import { useState } from 'react'
import './App.css'
import Header from './Header'
import TaskInput from "./TaskInput.jsx";
import TaskList from "./TaskList.jsx";
function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
          <Header name = "Anchor V0"/>
          <TaskInput placeholder = "Enter Task" buttonText = "Add Task"/>
          <TaskList task = "Task 1"/>
      </div>
    )

}

export default App
