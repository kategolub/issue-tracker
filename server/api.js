let express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose,
    cors = require('cors')

let app = express();

app.use(cors()) 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

mongoose.connect("mongodb+srv://admin:admin@cluster0.lulqk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
 
let Task = app.resource = restful.model('task', mongoose.Schema(
    {
        title: String,
        description: String,
        urgency: Number,
    },
    { 
        timestamps: true 
    }
  ))
  .methods(['get', 'post', 'put', 'delete']);


Task.register(app, '/tasks');

app.listen(3000);
