import fp from 'fastify-plugin';
import dotenv from 'dotenv';
import studentModel from '../model/userSchema.js';
dotenv.config()

const userRoutes = fp((fastify, opts,done)=>{

      fastify.get('/helo',{onRequest: [fastify.authenticate]}, async(req,reply)=>{
        reply.send(req.user)
    })

    fastify.get('/get',{onRequest: [fastify.authenticate]},async(req,reply)=>{
        try{
            let id =req.user.id;
            let data = await studentModel.findOne({id:id})
            reply.status(200).send(data)
        }catch(err){
            console.log(err.message)
        }
    })
    done()
    })

export default userRoutes;