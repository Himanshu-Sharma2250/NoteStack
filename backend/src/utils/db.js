import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

const connect_db = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("Database Connected")
        })
        .catch((error) => {
            console.log("Database Connection Failed")
            console.error(error)
            process.exit(1)
        })
}

export default connect_db;