/**
 * Route all the requests to /tickets to this file....
 *
 * Use models/tickets.js to perform appropriate CRUD Operations.
 */


//var tickets = require("./../models/tickets");
// console.log("control flow tickets 1");
/*
 * This file will contain the methods to handle requests to /tasks url.
 *
 * Invoke appropriate methods from models/tasks file to perform corresponding DB operations.
 */



//var students_db_model = require("./../../src/models/databaseHelper");

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/ticketdb');
 var Ticket=require('./../models/tickets.js')
  var express=require('express');
  var router=express.Router();
  var bodyParser=require('body-parser');
  router.use(bodyParser.urlencoded({extended:false}));
  router.use(bodyParser.json());



  router.get('/cancelled',(req,res)=>{
    req.query.cancelled=true;
    Ticket.find(req.query,(err,result)=>{
      if(err)
      res.send(err);

       res.send(result);
    });
    // if(req.query.length==0){
    //   console.log("Haiii");
    //   Ticket.find({cancelled:true},(err,result)=>{
    //     if(err)
    //     res.send(err);
    //     res.send(result);
    //   });
    // }
    // else{
    //   req.query.cancelled=true;
    //   Ticket.find(req.query,(err,result)=>{
    //     if(err)
    //     res.send(err);
    //
    //      res.send(result);
    //   });
    //   }
  });


router.get('/:id',function(req,res,next){

  Ticket.find({_id:req.params.id},(err,result)=>{
    if(err)
    res.send(err);
    res.send(result);
  });
});
console.log('control at before get /request');
router.get('/',(req,res)=>{
  console.log("Inside get request");
 //  //Object.keys(req.query).length
 //  if(req.query.length==0)
 //  {
 //  Ticket.find().then((res)=>{
 //    res.send(res);
 //  },(err)=>{
 //    res.send("Cannot get the required tickets");
 //  });
 // }
 // else{
 //   console.log("HAII");
 //   // console.log(typeof(req.query));
 //   Ticket.find(req.query,(err,result)=>{
 //     if(err)
 //     res.send(res);
 //
 //     res.send(result);
 //
 //   });
 //
 // }
 Ticket.find(req.query,(err,result)=>{
   if(err)
   res.send(res);

   res.send(result);

 });

  });

router.put('/:id',(req,res)=>{
  Ticket.findByIdAndUpdate(req.params.id,req.body,(err)=>{
    if(err)
    res.send("Not found",err);
    res.send("Updated sucessfully");
  });
});
router.delete('/:id',(req,res)=>{
  Ticket.findByIdAndRemove(req.params.id,(err)=>{
    if(err)
    res.send("In deletion error occured");

    res.send("Deleted sucessfully");
  });
});


router.get(function(req, res, next) {
    res.statusCode=404;
    res.end("");
});
router.post('/',function(req,res,next){
  console.log(req.body);
  var newTicket=new Ticket(req.body);
//   if(typeof(ticket["src"])!="string" || ticket["src"]==null || typeof(ticket["dest"])!="string" || ticket["dest"]==null
// typeof(ticket["name"])!="string" || ticket["name"]==null || Date.parse(ticket["doj"])==NaN || ticket["doj"]==null)
//     {
//           res.statusCode=400;
//           res.send("There was an error in input");
//     }
  newTicket.save((err)=>{
    if(err)
    res.send(err);
    res.send("new ticket sucessfully created");
  })
});
// router.post('/', function(req, res, next) {
//     var ticket=req.body;
//
// if(typeof(ticket["src"])!="string" || ticket["src"]==null){
//         res.statusCode=400;
//         res.end("");
//     }
//     else if(typeof(ticket["dest"])!="string" || ticket["dest"]==null){
//         res.statusCode=400;
//         res.end("");
//     }
//     else if(typeof(ticket["name"])!="string" || ticket["name"]==null){
//         res.statusCode=400;
//         res.end("");
//     }
//     else if(Date.parse(ticket["doj"])==NaN || ticket["doj"]==null){
//         res.statusCode=400;
//         res.end("");
//     }
//     else{
//         res.statusCode=201;
//         ticket.pnr=pnr;
//         pnrs_present.push(pnr);
//         pnr++;
//     //ids_present.push(ticket.id);
//     tickets_db_model.createTicket(ticket,function(error,result){
//             res.end(JSON.stringify(result[0]));
//    });
// }
//
//
//
// });

// router.put('/:id',function(req,res,next){
//     var update_json=req.body;
//     flag=0
//     var update_keys=Object.keys(req.body);
//
//     for(var i in update_keys){
//         if(flag!=1){
//       if(update_keys[i]=="src"){
//             if(update_json["firstName"]!=null && typeof(update_json["firstName"])!="string")
//             {
//                 res.statusCode=400;
//                 res.end("");
//                  flag=1;
//             }
//
//
//         }
//         else if(update_keys[i]=="dest"){
//             if(update_json["dest"]!=null && typeof(update_json["dest"])!="string")
//             {
//                 res.statusCode=400;
//                 res.end("");
//                  flag=1;
//             }
//
//
//         }
//         else if(update_keys[i]=="name"){
// if(typeof(update_json["name"])!="string")
//             {
//                 res.statusCode=400;
//                 res.end("");
//                  flag=1;
//             }
//
//
//         }
//         /*else if(update_keys[i]=="totalMarks"){
//             if(typeof(update_json["totalMarks"])=="string")
//             {
//                 res.statusCode=400;
//                 res.end("");
//                  flag=1;
//             }
//
//
//         }
//         */
//
//     }
//
//     }
//
//    if(flag==0){
//     tickets_db_model.UpdateTicket(parseInt(req.params.id),update_json,function(error,result){
//         console.log('update method route');
//             if(error){
//                 console.log(error)
//             }
//             res.statusCode=204;
//             res.end("");
//     });
// }
// });

router.put('/', function(req, res, next) {
    res.statusCode=404;
    res.send("Invalid response");

});

router.delete('/:id', function(req, res, next) {
  Ticket.deleteOne({_id:req.params.id},(err)=>{
    if(err)
    res.send(err);
    res.send("Ticket deleted sucessfully");
  });
});


router.delete('/',function(req,res,next){
    res.statusCode=404;
    res.end("");
});



module.exports=router//it is complsury(error made here)
