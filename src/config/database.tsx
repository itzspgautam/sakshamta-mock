const mongoose = require("mongoose");

const DbConnect = async () => {
  try {
    console.log(process.env.DB_URI);
    await mongoose.connect(process.env.DB_URI, {
      w: "majority",
    });
    console.log("Database connected.");
  } catch (error: any) {
    console.error(error.message);
  }
};

export default DbConnect;
