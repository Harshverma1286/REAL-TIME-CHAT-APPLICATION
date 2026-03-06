import 'dotenv/config'

import { server } from './src/db/socket.js'
import app from './app.js'

import connectdb from './src/db/db.js'

connectdb().then(() => {

    server.on("request", app)

    server.listen(process.env.PORT || 5001, () => {
        console.log(`Server running on port ${process.env.PORT || 5001}`)
    })

}).catch((err) => {
    console.log("DB connection error:", err)
})