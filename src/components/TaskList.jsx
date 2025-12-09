import TaskItem from './TaskItem'
import '../styles/TaskList.css'

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (!tasks || tasks.length === 0) return <div className="empty-message">No hay tareas. Añade la primera.</div>

  return (
    <div className="tasks-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}

export default TaskList
