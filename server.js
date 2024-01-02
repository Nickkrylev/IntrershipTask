const express = require('express'); //Строка 1
const app = express(); //Строка 2
const port = process.env.PORT || 5000; //Строка 3

// Сообщение о том, что сервер запущен и прослушивает указанный порт 
app.listen(port, () => console.log(`Listening on port ${port}`)); //Строка 6

// Создание GET маршрута
app.get('/express_backend', (req, res) => { //Строка 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Строка 10
}); //Строка 11
const mongoose = require('mongoose');

// Подключение к MongoDB
mongoose.connect('mongodb+srv://mykyta:cLJ7qPoOKd6pyj1L@cluster0.effhuzl.mongodb.net/bikes');

// Определение схемы
const bikeSchema = new mongoose.Schema({
  id: String, // Custom ID
  name: String,
  type: String,
  color: String,
  wheelSize: Number,
  price: Number,
  description: String,
  status: {
    type: String,
    enum: ['available', 'unavailable', 'busy'],
    default: 'unavailable'
  }
});

// Создание модели
const Bike = mongoose.model('Bike', bikeSchema);

app.use(express.json());

app.get('/api/bikes', async (req, res) => {
  try {
    const bikes = await Bike.find(); // Fetch bikes from the database
    res.json(bikes);
  } catch (error) {
    res.status(500).send("Error fetching bikes");
  }
});

app.delete('/api/bikeDel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBike = await Bike.findOneAndDelete({ id: id }); // Assuming 'id' is the field name in your schema
    if (!deletedBike) {
      return res.status(404).send("Bike not found");
    }
    res.status(200).send(`Bike with ID ${id} deleted`);
  } catch (error) {
    res.status(500).send("Error deleting bike: " + error.message);
  }
});


app.put('/api/bikes/:id', async (req, res) => {
  console.log("Request Params:", req.params);
  console.log("Request Body:", req.body);
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedBike = await Bike.findOneAndUpdate({ id: id }, { status }, { new: true });

    res.json(updatedBike);
    
  } catch (error) {
    
      console.error("Error updating bike status:", error);
      res.status(500).send(`Error updating bike status: ${error.message}`);
    
    
  }
});

app.post('/api/bikeAdd', async (req, res) => {
  try {
    const newBike = new Bike(req.body);
    const savedBike = await newBike.save();
    res.status(201).json(savedBike);
  } catch (error) {
    res.status(500).send("Error saving bike");
  }
});



