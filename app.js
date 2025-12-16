const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


let posts = [
  

  {
    id: Date.now() + 1,
    title: "The Joy of Exploring New Horizons",
    content: "Traveling opens your eyes to the beauty and diversity of the world. Every journey, whether to a nearby town or a distant country, brings new experiences, flavors, and stories. The memories you collect while wandering become a permanent part of who you are.",
    date: new Date().toLocaleString()
  },
  {
    id: Date.now() + 2,
    title: "Adventures That Stay With You",
    content: "There’s something magical about stepping into the unknown. The mountains you climb, the streets you stroll, and the people you meet leave a lasting impression. Travel reminds us that while destinations change, the experiences and lessons we gain remain forever.",
    date: new Date().toLocaleString()
  }
];



// Home Page
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// Create Post Form
app.get("/create", (req, res) => {
  res.render("create");
});

// Handle Post Submit
app.post("/create", (req, res) => {
  const post = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
    date: new Date().toLocaleString()
  };
  posts.unshift(post);
  res.redirect("/");
});

// Single Post Page
app.get("/post/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.send("Post not found");
  res.render("post", { post, posts });
});

// About Page
app.get("/about", (req, res) => {
  res.render("about");
});



app.listen(3000, () => console.log("Server running at http://localhost:3000"));