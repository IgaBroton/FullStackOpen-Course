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

app.get('/info',(request, response) => {
  response.send(
      `<p>Phonebook has info for ${Person.length} persons</p>
       <br>
       <p>${new Date()}</p>`
  )
})

app.get('/api/persons',(request, response) => {
  Person.find({}).then(result => {
      response.json(result)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person
      .findById(request.params.id)
      .then(person => { 
          if(person){
              response.json(person)
          }else{
              response.status(404).end()
          }
      })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = Person.filter(persons => persons.id === id)

  response.status(204).end()
})

/* 
const generateId = () => {
    const randomID = Math.floor(Math.random () * 500)
    return randomID
} 
*/

app.post('/api/persons', postMorgan, (request, response) => {
  const body = request.body
  //const personName = Person.map(persons => persons.name)
  if(!body.name || !body.number){
      return response.status(400).json({
          error: 'name or number missing'
      })
/* else if (personName.includes(body.name)){
    return response.status(400).json({
        error: 'name must be unique'
    })
} */
  }else{
      const person = new Person({
          //id: generateId(),
          name: body.name,
          number: body.number,
      })

      person.save().then(person => {
          response.json(person)
      })
  }  
})

const port = process.env.port
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
  );