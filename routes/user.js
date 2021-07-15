const router = require("express").Router();
const Product = require("../modal/Product");
const User = require("../modal/User");

router.post("/addUser", (req, res) => {
  console.log("Add user Api", req.body);

  const name = req.body.name;
  const email = req.body.email;
  const id = req.body.id;
  const country = req.body.country;

  const user = new User({
    name: name,
    email: email,
    id: id,
    country: country,
  });

  user
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.status(404).send(err));
});

router.post("/addProducts", (req, res) => {
  console.log("Add Product Api");

  const name = req.body.name;
  const userid = req.body.userid;
  const color = req.body.color;

  const product = new Product({
    name: name,
    userid: userid,
    color: color,
  });

  product
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.status(404).send(err));
});

router.post("/getParticularResult", async (req, res) => {
  console.log("particular API", req.body);
  const country = req.body.country;

  /*
  const temp = await User.find({ country: country });
  let arr = [];
  temp.forEach((i) => arr.push(i.id));

  console.log(arr);

  Product.find({ userid: { $in: arr } })
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
*/

  //Joining 2 tables using lookup
  //

  Product.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userid",
        foreignField: "id",
        as: "Common",
      },
    },
    { $match: { Common: { $elemMatch: { country: country } } } },
  ])
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

module.exports = router;

/*

users{
id: number
name: string
country: string
}

products{
userId: number(refrences from id of users)
productName: string
color: string
size: string
}
vo vo products dikhane h jin k user India se h (Or any specific country)

*/
