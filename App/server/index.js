const express = require("express");
const bodyParser = require("body-parser");
const Equipment = require('./model/schema')
const mongoose = require('mongoose');
const Employee = require('./model/user');
const cors = require('cors')

mongoose.connect("mongodb://localhost:27017/PRATICEAPP", { useNewUrlParser: true })
  .then((res) => {
    console.log('connected', res)
  }).catch(err => {
    console.log("Could not connect:", err)
  })

const app = express();

// const corsOption = {
//   origin: 'http://localhost:3000'
// }

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/equipment', async (req, res)=>{
  const {name, quantity, status, description} = req.body
  await Equipment.create({
    name: name,
    quantity: quantity,
    status: status,
    description: description
  })
  .then(()=>console.log('Saved'), res.send('Saved'))
  .catch((err)=> console.log(err))
})

app.get('/equipments', (req, res)=>{
  Equipment.find({},(err, equipments)=>{
    if(err){
      return err;
    }else{
      res.send(equipments)
      return equipments;
    }
  })
});

app.get('/equipment/:id', (req, res)=>{
  Equipment.findById(req.params.id, (err, equipment)=>{
    if(err){
      console.log(err)
    }else{
      console.log(equipment)
      res.send(equipment)
    }
  })
})

app.delete("/equipments", (req, res) => {
  Equipment.deleteMany({}, (err, equipments) => {
    if (err) {
      console.log(err)
      
    } else {
      console.log(equipments)
      res.send(equipments)
    }
  })
})

app.delete('/equipment/:id', (req, res) => {
  console.log(req.params)
  Equipment.findByIdAndRemove(req.params.id, (err, employee) => {
    if (err) {
      console.log(err)
     
    } else {
      console.log(employee)
      res.send(employee)
    }
  })
})

app.put('/equipment/:id', (req, res) => {
  Equipment.findByIdAndUpdate(req.params.id, req.body, (err, updated) => {
    if (err) {
      console.log(err)
    } else {
      res.send(updated)
    }
  })
})



app.post('/employee',(req, res)=>{
  const {username, password} = req.body
  Employee.create({
    username: username,
    password: password
  })
  .then(()=> console.log('Saved'))
  .catch((err)=> console.log(err))
})






// router.route('/update-todo/:id').put((req, res, next) => {
//   studentSchema.findByIdAndUpdate(req.params.id, {
//     $set: req.body
//   }, (error, data) => {
//     if (error) {
//       return next(error);
//       console.log(error)
//     } else {
//       res.json(data)
//       console.log('Student updated successfully !')
//     }
//   })
// })
app.listen(3000, () => {
  console.log("App running on port 3001");
});

// fuser -k 3000/tcp