const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] -> :response-time ms :type'))

morgan.token('type', (req, res) => { 
  if (req.method == 'POST') return JSON.stringify(req.body)
  else return ' '
})

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(
    `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
      </div>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) response.json(person)
  else response.status(404).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(request.get)
  //console.log(request.body)
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Incomplete data' 
    })
  }
  else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'Similar name already exists' 
    })
  }

  const person = {
    id: Math.floor(Math.random() * (100000 - 1) + 1),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  //console.log(JSON.stringify(request.body))
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)