const mongoose = require("mongoose");

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      w: "majority",
    });
  } catch (error: any) {
    console.error(error.message);
  }
};

export default DbConnect;
