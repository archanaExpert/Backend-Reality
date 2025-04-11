const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const authRoute = require('./routes/authRoute'); 
const videoRoute = require('./routes/videoRoute');
const { connectDBVideo } = require('./controllers/videoController');
const audioRoute = require('./routes/audioRoute');
const { connectDBAudio } = require('./controllers/audioController');
const pdfRoute = require('./routes/pdtRoute');
const { connectDBPdf } = require('./controllers/pdfController');
const webRoute = require('./routes/webRoute'); 


const path = require('path');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(__dirname, 'public', 'webgl')));
app.use(cors({ origin: ["http://localhost:5173"], credentials: "true" }));

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connection successful...");
    })
    .catch((error) => {
        console.log("Connection failed!!!", error);
    });

app.get('/',(req,res)=>{
res.send('welcome');
})

app.use('/auth',authRoute); 
app.use('/api/video', videoRoute);
app.use('/api/audio', audioRoute);
app.use('/api/pdf', pdfRoute);
app.use('/upload', webRoute); 


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
