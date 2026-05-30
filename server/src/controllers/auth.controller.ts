import { Request, Response } from 'express'
import { LoginInput } from '../schemas/auth.schema'

export const login = (req: Request<{}, {}, LoginInput>, res: Response) => {
  const { email, password } = req.body
  
  // Fake auth: só pra testar
  if (email === 'admin@test.com' && password === '123456') {
    return res.json({ 
      message: 'Login success',
      token: 'fake-jwt-token-123',
      user: { id: 1, email, name: 'Admin' }
    })
  }
  
  return res.status(401).json({ message: 'Invalid credentials' })
}