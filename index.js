const server = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { getStudents, createNewStudent, updateStudent, deleteStudent, login } = require('./src/controllers/index')
const { authRouter } = require('./src/router/users')

const app = server() // server is an object of express class
app.use(cors())
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost:27017/mern_g4')

mongoose.connection.on('connected', () => {
  console.log('connection established')
})

mongoose.connection.on('error', () => {
  console.log('Connection error')
})

app.use("/auth", authRouter);

app.get('/students', getStudents)
app.post('/create-new-student', createNewStudent)
app.put('/update-student', updateStudent)
app.delete('/delete-student', deleteStudent)
app.post('/login', login)

const port = 4000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
