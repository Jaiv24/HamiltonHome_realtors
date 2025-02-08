const express = require('express');
const app = express();

const data = 
[
  {address: "224 EAST 25TH ST",
   postal_code: "L8V 3A5",
   city: "Hamilton",
   community: "Mountain",
   province: "Ontario",
   price: 779900,
   bedrooms: 4,
   bathrooms: 3,
   img: "224east.jpeg",
   description: "Beautiful 100% Turn-Key 1.5 Storey Home On East Mountain Feat 3+1 Beds, 3 Baths, In-Law Suite W/ Duplex Conversion Potential, Ample Storage Space, Detached Garage, Up To 5 Car Parking, & Waterproofed Bsmt."
  }, 

  {address: "183 Kitty Murray Lane",
   postal_code: "L9K 1H7",
   city: "Hamilton",
   community: "Ancaster",
   province: "Ontario",
   price: 1050000,
   bedrooms: 4,
   bathrooms: 4,
   img: "183kitty.jpeg",
   description: "Steps to Meadowlands,schools, parks and easy access to 403/LINC. 2 Storey, 3+1 bedrm,3.5 baths with large backyard. Hardwood stairs and hardwood floors in all principal and bed rooms, no carpet! "
  },   

  {address: "20 ERINGATE Court",
   postal_code: "L8J 3Y4",
   city: "Hamilton",
   community: "Stoney Creek",
   province: "Ontario",
   price: 1925000,
   bedrooms: 4,
   bathrooms: 4,
   img: "20eringate.jpeg",
   description: "Built by award winning Zeina Homes. All brick on the sides and rear. Modern open concept main floor has 9ft ceiling, oak staircase with iron spindles, hardwood floors on main level and upper hallways, oversized windows, large kitchen with custom extended height cabinets, granite counters, large island, stainless steel appliances and porcelain tiles."
  },     

  {address: "11 Cloverhill Avenue",
   postal_code: "L8J 3Y4",
   city: "Hamilton",
   community: "Dundas",
   province: "Ontario",
   price: 899900,
   bedrooms: 3,
   bathrooms: 3,
   img: "11cloverhill.jpeg",
   description: "Fabulous home and property in sought after Dundas neighborhood. Superb location on a quiet cul de sac just a short walk to downtown Dundas's shops, restaurants and amenities."
  },   

  {address: "257 PARKSIDE Drive Unit# 8",
   postal_code: "L8B 0W5",
   city: "Hamilton",
   community: "Waterdown",
   province: "Ontario",
   price: 799900,
   bedrooms: 2,
   bathrooms: 3,
   img: "257parkside.jpeg",
   description: "This condo townhome boasts two huge bedrooms, both with 4-piece ensuite bathrooms. The laundry is also on the bedroom level with custom California Closet built-ins around it. The main floor is stunning! Open concept living/dining room and kitchen with a breakfast bar."
  },   

];

app.get('/search', function(req,res) {

  res.sendFile(__dirname + "/search.html")

});

app.get('/community_search', function(req,res){

  res.json(data.filter( (house) => house.community == req.query.community));

});

app.get('/price_search', function(req,res) {

  res.json(data.filter( (house) => (house.price <= req.query.max && 
                                    house.price >= req.query.min) ));

});

app.get('/bed_search', function(req,res) {

  res.json(data.filter( (house) => (house.bedrooms >= req.query.bedrooms )));

});

app.get('/bathroom_search', function(req,res) {

  res.json(data.filter( (house) => (house.bathrooms >= req.query.bathrooms )));

});

app.get('/all', function(req,res) {

  res.json(data);

});

// Send back a static file
// Use a regular expression to detect "any other route"
// Define the route last such that other routes would
// be detected and handled as such first.
app.get(/^(.+)$/, function(req,res){
  console.log("static file request: " + req.params[0]);
  res.sendFile(__dirname + req.params[0]);
});

var server = app.listen(3000, function()
{
  console.log("App listening....");
});
