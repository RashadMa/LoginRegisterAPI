const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const { db } = require("./config/db");
const { userRoutes } = require("./routes/userRoutes");
const { uploadRoutes } = require("./routes/uploadRoutes");
const { v4: uuidv4 } = require("uuid");
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(fileUpload());

app.post("/api/upload", (req, res) => {
  let extName = path.extname(req.files.profileImg.name);
  if (extName == ".jpeg" || extName == ".jpg" || extName == ".png") {
    req.files.profileImg.mv(__dirname + "/images/" + uuidv4() + extName);
    res.send("OK");
  } else {
    res.status(500).send("Ext error");
  }
});

app.use('/api/upload', uploadRoutes)
db.connect();
app.use(express.json());
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(8080, () => {
  console.log("Server is running...");
});
