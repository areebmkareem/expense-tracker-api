import mongoose from "mongoose"

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/expense-tracker", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('✅ DB Connected.');
  })
  .catch((error) => console.log('🚨' + error));


  export default mongoose