import fs from 'fs'
import express from 'express'
import Router from 'express-promise-router'

// Create router
const router = Router()

// Main route serves the index HTML
router.get('/', async (req, res, next) => {
    let html = fs.readFileSync('index.html', 'utf-8')
    res.send(html)
})

// Everything else that's not index 404s
router.use('*', (req, res) => {
    res.status(404).send({ message: 'Not Found' })
})

// Create express app and listen on port 4444
const app = express()
app.use(express.static('dist'))
app.use(router)
app.listen(process.env.PORT || 4444, () => {
    console.log(`Listening on port http://localhost:4444...`)
})

