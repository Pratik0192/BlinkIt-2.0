import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import connectDB from "./config/connectDB.js"
import userRouter from "./route/userRoute.js"
import categoryRouter from "./route/categoryRoute.js"
import uploadRouter from "./route/uploadRouter.js"
import subCategoryRouter from "./route/subCategoryRoute.js"

const app = express()
app.use(cors({
  credentials : true,
  origin : process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
  crossOriginResourcePolicy : false
}))

const PORT = 8080 || process.env.PORT

app.get("/", (request, response) => {
  response.json({
    message: "server is running" + PORT
  })
})

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter)
app.use('/api/file', uploadRouter)
app.use('/api/subcategory', subCategoryRouter)
 
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running", PORT);
  })
})