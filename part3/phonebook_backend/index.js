require('dotenv').config()
const { request } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const postMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

app.get('/info',(request, response, next) => {
  Person
  .find({})
  .then(result => {
  response.send(
      `<p>Phonebook has info for ${result.length} persons</p>
       <br>
       <p>${new Date()}</p>`
      ) 
  })
  .catch(error => next(error))
})

app.get('/api/persons',(request, response, next) => {
  Person
  .find({})
  .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
  Person
      .findById(request.params.id)
      .then(person => { 
        response.json(person)
      })
      .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', postMorgan, (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
      return response.status(400).json({
          error: 'name or number missing'
      })
  }
  else {
      const person = new Person({
          name: body.name,
          number: body.number,
      })

      person.save().then(person => {
          response.json(person)
      })
  }  
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
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
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
  // this has to be the last loaded middleware.
app.use(errorHandler)

const port = process.env.PORT
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port},`)
  );