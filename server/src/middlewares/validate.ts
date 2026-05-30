import {Request, Response, NextFunction} from 'express'
import {ZodTypeAny, ZodError } from 'zod'


export const validate = (schema: ZodTypeAny) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next() // Só chama se passou na validação
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation error',
          errors: error.format() // format() fica mais legível
        })
      }
      next(error) // Deixa o errorHandler global cuidar
    }
  }