const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
require('dotenv').config()

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.je3vw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function server() {
    try {
        await client.connect();
        const database = client.db('brainzet');
        const blogCollection = database.collection('blogs');

        // Blogs Get API
        app.get('/blogs', async (req, res) => {
            const cursor = blogCollection.find({});
            const blogs = await cursor.toArray();
            res.json(blogs);
        });

    }
    finally {
        // await client.close();
    }
}
server().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Brainzet Blog Server');
});

app.listen(port, () => {
    console.log('listening to port at', port)
});