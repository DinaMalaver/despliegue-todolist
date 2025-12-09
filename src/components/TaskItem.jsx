import { useState } from 'react'
import '../styles/TaskItem.css'

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [desc, setDesc] = useState(task.description || '')
  const [loading, setLoading] = useState(false)

  const formatDate = (d) => {
    try { return new Date(d).toLocaleString() } catch { return '' }
  }

  const submitEdit = async (e) => {
    e?.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    try {
      await onEdit(task.id, title.trim(), desc.trim())
      setIsEditing(false)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  return (
    <div className={`task-row ${task.completed? 'done':''}`}>
      <div className="left-area">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id, task.completed)} />
        {!isEditing ? (
          <div className="meta">
            <div className="title">{task.title}</div>
            {task.description && <div className="desc">{task.description}</div>}
            <div className="date">{formatDate(task.created_at)}</div>
          </div>
        ) : (
          <form className="edit-form" onSubmit={submitEdit}>
            <input className="edit-in" value={title} onChange={e=>setTitle(e.target.value)} />
            <textarea className="edit-in" value={desc} onChange={e=>setDesc(e.target.value)} rows={2} />
            <div className="edit-actions">
              <button type="submit" className="btn-save" disabled={loading}>{loading? 'Guardando':'Guardar'}</button>
              <button type="button" className="btn-cancel" onClick={()=>{ setIsEditing(false); setTitle(task.title); setDesc(task.description||'') }}>Cancelar</button>
            </div>
          </form>
        )}
      </div>

      <div className="actions">
        {!isEditing && <button className="btn-edit" onClick={()=>setIsEditing(true)} title="Editar">✏️</button>}
        <button className="btn-del" onClick={() => { if(confirm('Eliminar?')) onDelete(task.id) }} title="Eliminar">🗑️</button>
      </div>
    </div>
  )
}

export default TaskItem
