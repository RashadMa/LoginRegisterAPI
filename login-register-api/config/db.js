const { default: mongoose } = require("mongoose");

const db = {
  connect: async () => {
    try {
      await mongoose
        .connect(
          "mongodb+srv://rashadkhm:011220007298rR@cluster0.tbjmxpd.mongodb.net/"
        )
        .catch((err) => {
          console.log("Error", err);
        });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.log("Mongoose Error", error);
    }
  },
};

module.exports = {
  db,
};
