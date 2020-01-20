const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const Question = require('./question')

const connectDB = async () => {
  const conn = await mongoose.connect('<DBName>', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  console.log(`MongoDB Connected: ${conn.connection.host}`)
  getAllQ()
}
connectDB()

const getAllQ = async () => {
  let q = await Question.find({})
  for (let i = 0; i < q.length; i++) {
    let oldName = q[i].asset
    let newName = i + '.png'
    q[i].asset = newName
    await q[i].save()
    renameFile(oldName, newName)
  }
  console.log('Finish')
}

const renameFile = (oldName, newName) => {
  const folder = path.join(__dirname, '..', 'assets', 'img')
  fs.rename(path.join(folder, oldName), path.join(folder, newName), err => {
    if (err) throw err
  })
}