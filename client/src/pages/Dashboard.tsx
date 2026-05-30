import { useNavigate } from 'react-router-dom'

export function Dashboard() {
  const navigate = useNavigate()
  
  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>Você está logado!</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}