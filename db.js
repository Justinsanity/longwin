var mongoose = require('mongoose');
var schema = mongoose.Schema;
var uristring = 
  process.env.MONGOLAB_URI || // if using mongolab
  process.env_MONGOHQ_URI ||  // if using mongohq
  'mongodb://localhost/longwin';
  
/* tmp, considering to separate agent_order and general_order  */
var order = new schema({
    id: {type: Number, unique: true}, 
    name: String,
    goods: String,
    count: Number,
    phone: String,
    email: String,  // for confirmation, allow null
    addr: String,
    time: {type: Date, default: Date.now()}
});

/*
var mail = new schema({
    id: {type: Number, unique: true},
    name: String,
    content: String,
    time: {type: Date, default: Date.now()},
    mail: String           // for reply, can null(if contact info is yet written in content)
});
*/

mongoose.model('order', order);

mongoose.connect(uristring, function(err, res){
  if(err) { 
    console.log('ERROR connected to: ' + uristring);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});