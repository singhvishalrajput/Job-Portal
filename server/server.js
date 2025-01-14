import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebHooks } from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'


// Initialie Express
const app = express()


// connect to database
await connectDB();
await connectCloudinary();

// Middlewares
app.use(cors())
app.use(express.json())

// Routes

app.get('/', (req, res) =>{
    res.send('API WORKING.')
})
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

app.post('/webhooks', clerkWebHooks)
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
// Port
const PORT = process.env.PORT || 4005

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})