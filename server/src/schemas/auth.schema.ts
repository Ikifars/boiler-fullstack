import { z } from 'zod'

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha precisa de 6+ caracteres')
  })
})

export type LoginInput = z.infer<typeof loginSchema>['body']