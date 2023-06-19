import f from 'fastify';
import jwtRoutes from './routes/authRoutes.js'
import connection from './utils/database.js';
import userRoutes from './routes/userRoutes.js';
export const fastify = f();
  
fastify.register(jwtRoutes)
fastify.register(userRoutes)
fastify.register(connection)

fastify.listen({port:3000}, ()=>{
    console.log("Server running at port 3000")
})

