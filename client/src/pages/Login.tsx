import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export function Login() {
  const [email, setEmail] = useState('admin@test.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ display: 'block', width: '100%', margin: '8px 0', padding: 8 }}
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ display: 'block', width: '100%', margin: '8px 0', padding: 8 }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Entrar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}