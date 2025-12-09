import { useState } from 'react'
import '../styles/TaskForm.css'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setIsSubmitting(true)
    try {
      await onAddTask(title.trim(), description.trim())
      setTitle('')
      setDescription('')
    } catch (err) {
      console.error(err)
    } finally { setIsSubmitting(false) }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input className="input" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} disabled={isSubmitting} />
      <textarea className="textarea" placeholder="Descripción (opcional)" value={description} onChange={e=>setDescription(e.target.value)} rows={3} disabled={isSubmitting} />
      <div style={{display:'flex', justifyContent:'flex-end', marginTop:'0.6rem'}}>
        <button className="add-button" type="submit" disabled={isSubmitting}>{isSubmitting? 'Agregando...' : 'Agregar'}</button>
      </div>
    </form>
  )
}

export default TaskForm
