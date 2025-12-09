import { useState, useEffect } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const API_URL = 'https://backend-todolist-l3qk.onrender.com/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => { fetchTasks() }, [])

  const fetchTasks = async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch(`${API_URL}/tasks`)
      if (!res.ok) throw new Error('Error al obtener tareas')
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  const handleAddTask = async (title, description) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title, description })
    })
    if (!res.ok) throw new Error('Error al crear tarea')
    const newTask = await res.json()
    setTasks(prev => [newTask, ...prev])
  }

  const handleToggleTask = async (taskId, currentCompleted) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ completed: !currentCompleted })
    })
    if (!res.ok) throw new Error('Error al actualizar tarea')
    const updatedTask = await res.json()
    setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t))
  }

  const handleDeleteTask = async (taskId) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Error al eliminar tarea')
    setTasks(prev => prev.filter(t => t.id !== taskId))
  }

  const handleEditTask = async (taskId, title, description) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title, description })
    })
    if (!res.ok) throw new Error('Error al actualizar tarea')
    const updatedTask = await res.json()
    setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t))
  }

  const filtered = tasks.filter(t => filter === 'all' ? true : filter === 'done' ? t.completed : !t.completed)

  return (
    <div className="app-new">
      <header className="topbar">
        <div className="brand-left">
          <strong>Todo List</strong>
          <span className="small">— organiza tu día</span>
        </div>
        <div className="top-actions">
          <button className={`chip ${filter==='all'?'active':''}`} onClick={() => setFilter('all')}>Todas</button>
          <button className={`chip ${filter==='pending'?'active':''}`} onClick={() => setFilter('pending')}>Pendientes</button>
          <button className={`chip ${filter==='done'?'active':''}`} onClick={() => setFilter('done')}>Completadas</button>
        </div>
      </header>

      <main className="layout">
        <section className="left">
          <div className="card">
            <h2 className="card-title">Añadir nueva tarea</h2>
            <TaskForm onAddTask={handleAddTask} />
          </div>

          <div className="card">
            <h2 className="card-title">Tareas</h2>
            {error && <div className="error">{error}</div>}
            {loading ? <div className="loading">Cargando...</div> : (
              <TaskList tasks={filtered} onToggle={handleToggleTask} onDelete={handleDeleteTask} onEdit={handleEditTask} />
            )}
          </div>
        </section>

        <aside className="right">
          <div className="card stats-card">
            <h3>Resumen</h3>
            <p><strong>{tasks.filter(t=>t.completed).length}</strong> completadas</p>
            <p><strong>{tasks.length}</strong> totales</p>
          </div>

          <div className="card help-card">
            <h3>Consejos</h3>
            <ul>
              <li>Haz clic en la casilla para marcar como completada.</li>
              <li>Usa ✏️ para editar la tarea.</li>
              <li>Arrastra y suelta no soportado (simple list).</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App
