require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const res = require('express/lib/response')
const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] -> :response-time ms :type'))
app.use(cors())

morgan.token('type', (req, res) => { 
  if (req.method == 'POST') return JSON.stringify(req.body)
  else return ' '
})


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
  Person.count({}, ( err, count) => 
    response.send(
      `<div>
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
      </div>`
    ))
})


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      throw ReferenceError(`id ${request.params.id} can not be found`)
    }
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Incomplete data' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save()
  .then(savedPerson => savedPerson.toJSON())
  .then(savedAndFormattedPerson => {
    response.json(savedAndFormattedPerson)
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = Number(request.params.id)
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      if (result === null) {
        throw ReferenceError(`Can not delete document with ID ${request.params.id} because the ID can not be found`)
      }
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      if(updatedPerson === null) {
        throw ReferenceError(`Can not update document with ID ${request.params.id} because the ID can not be found`)
      }
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' })
  } 

  else if (error.name === 'ReferenceError') {
    return response.status(400).send({ error: 'ID not found' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)