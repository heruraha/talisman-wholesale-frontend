const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const cors = require('cors')
//db details
const url = 'mongodb://localhost:27017'
const config = { useNewUrlParser: true, useUnifiedTopology: true }
const dbName = 'talismanwholesale'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))


let selectedDB;

MongoClient.connect(url, config, (err, client) => {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb server");
  selectedDB = client.db(dbName);
  app.listen(3000, ()=>console.log('API server listening on port 3000'))
});

app.get('/', (req, res, next) => {
    res.json({msg: 'please specify a method' })
})
  
app.get('/products', (req, res, next) => {
    //get all products
    const collection = selectedDB.collection('talismanwholesale');
    collection.find({}).toArray((err, prd) => {
        assert.equal(err, null)
        if(prd.length > 0) {
            res.json(prd)
        } else {
            res.end()
        }
    });
})

app.get('/product/:id', (req, res, next) => {
    //get specific product by id
    const collection = selectedDB.collection('talismanwholesale');
    collection.find({_id: new mongodb.ObjectID(req.params.id)}).toArray((err, prd) => {
        assert.equal(err, null)
        console.log(prd, 'result')
        if(prd.length > 0) {
            res.json(prd)
        } else {
            res.end()
        }
    });
})

app.post('/product', (req, res, next) => {
    //add a new product
    if(!req.body) {
        return res.status(400).send({
            message: "Empty body not permitted"
        });
    } else {
        const sku = req.body.sku;
        const name = req.body.name;
        const price = req.body.price;
        const desc = req.body.description;
        const sizes = req.body.sizes;
        const colors = req.body.colors;
        const img_url = req.body.img_url;

        const body = {
            sku: sku,
            name: name,
            price: price,
            description: desc,
            sizes: sizes,
            colors: colors,
            img_url: img_url ? img_url :  null
        }

        if(sku && name && price && desc && sizes && colors) {
            const collection = selectedDB.collection('talismanwholesale');
            collection.insertOne(body, (err, result) => {
                err ? console.log(err, 'error adding product') : console.log('Product added:', result.ops);
            })
        } else {
            console.log('ERROR - missing necessary fields')
            res.end()
        }

        res.end();
    }
})

app.delete('/product/:id', (req, res, next) => {
    //delete a product
    const collection = selectedDB.collection('talismanwholesale');
    collection.deleteOne({_id: new mongodb.ObjectID(req.params.id)}, (err, result) => {
        err ? console.log(err, 'error deleting product') : console.log('Product deleted');
    })
    res.end();
})

app.patch('/product/:id', (req, res, next) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Patch needs some details"
        });
    }
    const collection = selectedDB.collection('talismanwholesale');
    collection.findAndModify(
        { _id: new mongodb.ObjectID(req.params.id) },// query
        [ ['sku', 1] ],// sort
        {
            sku: req.body.sku,
            name: req.body.name,
            price: req.body.price,
            desc: req.body.description,
            sizes: req.body.sizes,
            colors: req.body.colors,
            img_url: req.body.img_url
        },
        { new: true },// options
        (err, prod) => {// callback
            if (err){
                throw err;
            } else if(prod){
                console.log('product updated successfully');
                console.log(prod);
            }
        }
    );
    res.end();
})
