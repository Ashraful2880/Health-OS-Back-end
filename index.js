const express = require("express");
const { MongoClient } = require("mongodb");
const SSLCommerzPayment = require("sslcommerz");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//<------------- Database Code Here ---------->

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eb0xvvp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    //<------------ Database All Collections ------------->
    const database = client.db(`${process.env.DB_NAME}`);
    const Products = database.collection(`${process.env.PRODUCT_COLLECTION}`);
    const blogs = database.collection(`${process.env.BLOG_COLLECTION}`);
    const customers = database.collection(`${process.env.CUSTOMER_COLLECTION}`);
    const users = database.collection(`${process.env.USER_COLLECTION}`);
    const Orders = database.collection(`${process.env.ORDER_COLLECTION}`);

    //<------------ Get All Products ------------->

    app.get("/products", async (req, res) => {
      const FindProducts = await Products.find({}).toArray();
      res.send(FindProducts);
    });

    //<------------ Get Single Product By ID ------------->

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const singleProduct = await Products.findOne(query);
      res.json(singleProduct);
    });

    //<------------ Edit Single Products ------------->

    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const updateReq = req.body;
      const result = await Products.updateOne(
        query,
        {
          $set: {
            rating: updateReq.rating,
            name: updateReq.name,
            price: updateReq.price,
            offerPrice: updateReq.offerPrice,
            category: updateReq.category,
            slug: updateReq.slug,
            SKU: updateReq.SKU,
            productImage: updateReq.productImage,
          },
        },
        { upsert: true }
      );
      res.json(result);
    });

    //<------------ Delete Single Products ------------->

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const remove = await Products.deleteOne(query);
      res.json(remove);
    });

    //<------------ Post a New Product ------------->

    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      const result = await Products.insertOne(newProduct);
      res.json(result);
    });

    // Get All Orders

    app.get("/orders", async (req, res) => {
      const allOrders = await Orders.find({}).toArray();
      res.send(allOrders);
    });

    // Approved An Order

    app.put("/order/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const orderStatus = req.body;
      const result = await Orders.updateOne(
        query,
        {
          $set: { status: orderStatus.status },
        },
        { upsert: true }
      );
      res.json(result);
    });

    // Get All Customers

    app.get("/customers", async (req, res) => {
      const allCustomers = await customers.find({}).toArray();
      res.send(allCustomers);
    });

    //<------------ Get Single Customer By ID ------------->

    app.get("/customer/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const singleCustomer = await customers.findOne(query);
      res.json(singleCustomer);
    });

    // Post New Customer

    app.post("/customers", async (req, res) => {
      const newCustomer = req.body;
      const result = await customers.insertOne(newCustomer);
      res.send(newCustomer);
    });

    //<------------ Delete a Customer ------------->

    app.delete("/customer/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const remove = await customers.deleteOne(query);
      res.json(remove);
    });

    // Get All Users

    app.get("/users", async (req, res) => {
      const allUsers = await users.find({}).toArray();
      res.send(allUsers);
    });

    //<------------ Get All Products Category ------------->

    app.get("/productsCategory", async (req, res) => {
      const allProducts = await Products.find({}).toArray();
      res.send(allProducts);
    });

    //<------------ Get All Products by Category ------------->

    app.get("/findProducts", async (req, res) => {
      const search = req.query.category;
      const products = await Products.find({}).toArray();
      const findProducts = products?.filter((value) =>
        value?.category?.includes(search)
      );
      res.send(findProducts);
    });

    //<--------- Get Featured Products ---------->

    app.get("/featuredProduct", async (req, res) => {
      const featuredData = req.query;
      const result = await Products.find({
        slug: featuredData.featured,
      }).toArray();
      res.send(result);
    });

    //<--------- Get Top trending Products ---------->

    app.get("/topTrending", async (req, res) => {
      const trendingData = req.query;
      const result = await Products.find({
        slug: trendingData.trending,
      }).toArray();
      res.send(result);
    });

    //<--------- Get Best Selling Products ---------->

    app.get("/bestSelling", async (req, res) => {
      const sellingData = req.query;
      const result = await Products.find({
        slug: sellingData.bestSellar,
      }).toArray();
      res.send(result);
    });

    //<--------- Get New Arrival Products ---------->

    app.get("/newArrival", async (req, res) => {
      const newArrivalData = req.query;
      const result = await Products.find({
        slug: newArrivalData.newArrival,
      }).toArray();
      res.send(result);
    });

    //<------------ Get All Blogs ------------->

    app.get("/blogs", async (req, res) => {
      const AllBlogs = await blogs.find({}).toArray();
      res.send(AllBlogs);
    });

    //<------------ Find Products Information For Cart ------------->

    app.get("/addToCart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const showOrder = await Products.findOne(query);
      res.json(showOrder);
    });

    // Initialize Payment
    /* 
    app.post("/init", async (req, res) => {
      const productInfo = {
        currency: "BDT",
        paymentStatus: "pending",
        tran_id: uuidv4(),
        success_url: "https://safe-bastion-76919.herokuapp.com/success",
        fail_url: "https://safe-bastion-76919.herokuapp.com/failure",
        cancel_url: "https://safe-bastion-76919.herokuapp.com/cancel",
        ipn_url: "https://safe-bastion-76919.herokuapp.com/ipn",
        product_name: req.body.product_name,
        product_category: "test",
        product_profile: req.body.product_profile,
        product_image: req.body.product_image,
        productDetails: req.body.productDetails,
        total_amount: req.body.total_amount,
        cus_name: req.body.cus_name,
        cus_email: req.body.cus_email,
        cus_add1: req.body.cus_add1,
        cus_street: req.body.cus_street,
        cus_city: req.body.city,
        cus_state: req.body.cus_state,
        cus_postcode: req.body.cus_postcode,
        cus_country: req.body.cus_country,
        cus_phone: req.body.cus_phone,
        shipping_method: "Courier",
        ship_name: req.body.cus_name,
        ship_add1: req.body.cus_add1,
        ship_add2: req.body.cus_add1,
        ship_city: req.body.cus_city,
        ship_state: req.body.cus_state,
        ship_postcode: req.body.cus_postcode,
        ship_country: req.body.cus_country,
        multi_card_name: "mastercard",
        value_a: "ref001_A",
        value_b: "ref002_B",
        value_c: "ref003_C",
        value_d: "ref004_D",
      }; */

    // Insert order info
    /*       const result = await OrderCollections.insertOne(productInfo);

      const sslcommer = new SSLCommerzPayment(
        process.env.STORE_ID,
        process.env.STORE_PASSWORD,
        false
      );
      sslcommer.init(productInfo).then((data) => {
        const info = { ...productInfo, ...data };
        if (info.GatewayPageURL) {
          res.json(info.GatewayPageURL);
        } else {
          return res.status(400).json({
            message: "SSL session was not successful",
          });
        }
      });
    }); */

    //<----------- Success, Fail, Cancel And APN API Here ---------->

    /*   app.post("/success", async (req, res) => {
      const order = await OrderCollections.updateOne(
        { tran_id: req.body.tran_id },
        {
          $set: {
            val_id: req.body.val_id,
          },
        }
      );
      res.redirect(
        `https://first-deal-shop.netlify.app/success/${req.body.tran_id}`
      );
    });

    app.post("/failure", async (req, res) => {
      const order = await OrderCollections.deleteOne({
        tran_id: req.body.tran_id,
      });
      res.redirect(`https://first-deal-shop.netlify.app/placeOrder`);
    });

    app.post("/cancel", async (req, res) => {
      const order = await OrderCollections.deleteOne({
        tran_id: req.body.tran_id,
      });
      res.redirect(`https://first-deal-shop.netlify.app/`);
    });
    app.post("/ipn", (req, res) => {
      res.send(req.body);
    });
    //<---------- Ger Payment Complete Details -------->
    app.get("/orders/:tran_id", async (req, res) => {
      const id = req.params.tran_id;
      const order = await OrderCollections.findOne({ tran_id: id });
      res.json(order);
    }); */

    //<---------- Validate Transaction By User clicking Success Button -------->
    /* app.post("/validate", async (req, res) => {
      const order = await OrderCollections.findOne({
        tran_id: req.body.tran_id,
      });
      if (order.val_id === req.body.val_id) {
        const update = await OrderCollections.updateOne(
          { tran_id: req.body.tran_id },
          {
            $set: { paymentStatus: "Successful" },
          }
        );
        res.send(update.modifiedCount > 0);
      } else {
        res.send("Payment Not Confirmed, Discarted Order");
      }
    }); */
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Health OS Server");
});

app.listen(port, () => {
  console.log("Running Server Port is", port);
});
