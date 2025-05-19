import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/database.js'
import env from 'dotenv'
env.config()

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })
}

export const register = async (req, res) => {
    const { email, password } = req.body

    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email])
        if (rows.length > 0) {
            return res.status(400).json({ message: 'Email já registrado' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await pool.query(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, hashedPassword])

        res.status(201).json({ message: 'Usuário registrado com sucesso!' })

    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar', error: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email])
        if (rows.length === 0) {
            res.status(400).json({ message: 'Credenciais inválidas' })
        }

        const user = rows[0]
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(400).json({ message: 'Credenciais inválidas' })
        }

        const token = generateToken(user)
        res.json({ token })

    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error: error.message })
    }
}

export const protectedRoute = (req, res) => {
    res.json({ message: `Bem-vindo, usuário com ID ${req.user.id}`})
}