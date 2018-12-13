var User = require('./model/user.js')
var Poster = require('./model/poster.js')
var fileSystem = require('fs');


module.exports = function (app) {
  app.get('/', function (req, res) {
    console.log(__dirname)
    res.sendFile( __dirname + "/src/" + "admin.html" );
 })
 
//sua cua hang
 app.get('/editStore', function(req, res) {
  res.render('pages/editStore.ejs');
});
app.post('/editStore',function(req,res){
  console.log(req.body.poster)
    var body=req.body.poster;
    Poster.findByIdAndUpdate(body.IDStore, { $set: {
       urlImage: body.Urlstore,
       ImgName:body.NameStore,
       address:body.AddrStore,
       kinhdo:body.AddrKD,
        vido:body.AddrVD,
       contents:body.ConStore }},
        { new: true }, function (err, tank) {
      if (err) return handleError(err)
      res.send(tank)
    });
})

//them cua hang
app.get('/addStore', function(req, res) {
  res.render('pages/addStore.ejs');
});
app.post('/addStore',function(req,res){
  console.log(req.body.poster)
    var body=req.body.poster;
   var Post = new Poster({
    urlImage: body.Urlstore,
    ImgName:body.NameStore,
    address:body.AddrStore,
    kinhdo:body.AddrKD,
    vido:body.AddrVD,
    contents:body.ConStore
   })
   Post.save(function (err, results) {
    console.log(results);
  res.json({results}) })
});
//xoa cua hang
app.get('/removeStore',function(req, res) {
  res.render('pages/removeStore.ejs'); 
})

app.post('/removeStore', function(req,res){
  console.log(req.body.poster)
    var body=req.body.poster;

    Poster.deleteOne({_id: body.IDStore}, function (err,res) {
      if (err) throw err;
      console.log('delete success: record');
      
  });
  res.send("OK");
})

//add Food
app.get('/addFood',function(req, res) {
  res.render('pages/addMenu.ejs'); 
})
app.post('/addMenu',function(req,res){
  console.log(req.body.poster)
  var body = req.body.poster;

  var MoreConTen = { "ImgFood" : body.Urlstore,
  "ImgNameFood": body.NameFood,
  "Price":body.Price}
  Poster.findOneAndUpdate( {_id: body.IDStore},
    {$push:
      { 
    MoreContents: MoreConTen
      }
    },
  {safe: true, upsert: true},
  function(err, doc) {
    res.json(doc)
  })
})

//delete menu
app.get('/removeFood',function(req,res){
  res.render('pages/deleteMenu.ejs')
})
app.post('/deleteMenu',function(req,res){
  console.log(req.body.poster)
  var body = req.body.poster

  Poster.update({_id: body.IDStore},
    {$pull:{
    MoreContents: {
      _id: body.IDMenu
    }
  }},{ multi: true }
  ,function(err,model) {
    if(err){
       console.log(err);
       return res.send(err);
     }
     return res.json(model);
    }
  )

})

//edit Menu
app.get('/editFood',function(req,res){
  res.render('pages/editMenu.ejs')
})
app.post('/editMenu',function(req,res){
  console.log(req.body.poster)
  var body = req.body.poster

  // var updates = {"MoreContents.$.ImgFood": body.UrlFood,
  // "MoreContents.$.ImgNameFood": body.NameFood,
  // "MoreContents.$.Price":body.Price}
  Poster.updateOne({_id: body.IDStore, "MoreContents._id": body.IDMenu},
  {
    $set:{
      "MoreContents.$.ImgFood": body.UrlFood,
      "MoreContents.$.ImgNameFood": body.NameFood,
      "MoreContents.$.Price":body.Price 
    }
  },
  function(err,model) {
    if(err){
       console.log(err);
       return res.send(err);
     }
     return res.json(model);
    }
  )//end Poster 
})
  // app.post("/edit_admin", function (req, res) {
  //   console.log(req.body.user)
  //   var body=req.body.user;
  //   User.findByIdAndUpdate(body.iduser, { $set: { urlimages: body.file,imagesname:body.namefood,address:body.addressfood,contents:body.contents }}, { new: true }, function (err, tank) {
  //     if (err) return handleError(err);
  //     res.send(tank);
  //   });
  // })

//read
app.get('/read',function(req,res){
  Poster.find({}, function (err, users) {
    res.json({"result": users});
});
})
// find
app.post('/find',function(req,res){
  console.log(req.body.poster)
  var body = req.body.poster

  Poster.findOne({_id: req.body.idfind},function(error, user){
    res.json({"result": user});
  })

  
})
//demo
app.get('/aaa',function(req,res){
  res.send("asdas")
})
}//end modul