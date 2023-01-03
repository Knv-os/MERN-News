import mongoose from 'mongoose'

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('conectado'))
    .catch((error) => console.log(error))
}

export default connectDatabase

