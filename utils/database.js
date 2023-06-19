import mongoose from 'mongoose';

async function connection(){
try {
    await mongoose.connect('mongodb+srv://magesh:magesh@demo.emaooaz.mongodb.net/college');
    console.log("Mongodb connected")
  } catch (e) {
    console.error(e);
  }
}

export default connection;