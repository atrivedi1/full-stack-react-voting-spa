'use strict'

//define requirements and create instance of express server
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

//buildPath of index.html file
let buildPath = path.join(__dirname, '../../client')

//set up middleware, including buildPath
app.use(bodyParser.json())
app.use(express.static(buildPath))

//connect on routes
require('../routes/routes.js')(app)

//listen on port
var port = process.env.PORT || 3000
app.listen(port, () => console.log("Server listening on port: " + port))

//export app
module.exports = app
