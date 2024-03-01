const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_mongodb_uri' with your actual MongoDB URI)
mongoose.connect('your_mongodb_uri', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define a Mongoose schema for the Order model
const orderSchema = new mongoose.Schema({
    invoiceId: String,
    userInformation: {
        userId: String,
        name: String,
        email: String
    },
    paymentDetails: {
        cardNumber: String,
        expiryDate: String,
        cvv: String,
        amount: Number
    }
});

// Create a Mongoose model based on the schema
const Order = mongoose.model('Order', orderSchema);

// Handle MongoDB connection events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');

    // Set up the Express endpoint to handle order submissions
    app.post('/api/submitOrder', (req, res) => {
        const orderDetails = req.body;

        // Create a new Mongoose document using the Order model
        const order = new Order(orderDetails);

        // Save the order document to the MongoDB database
        order.save(function(err) {
            if (err) {
                console.error('Error saving order to MongoDB:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Order submitted and saved to MongoDB successfully.');
                res.json({ message: 'Order submitted successfully.' });
            }
        });
    });

    // Start the Express server
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
});
