import jwt from '@fastify/jwt';
import fp from 'fastify-plugin';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import studentModel from '../model/userSchema.js';
dotenv.config()

const jwtRoutes = fp((fastify, opts,done)=>{
    fastify.register(jwt, {
        secret:process.env.SECRET
    })

    fastify.decorate("authenticate", async function(request, reply) {
        try {
          await request.jwtVerify()
        } catch (err) {
          reply.send(err)
        }
      })

    fastify.post('/login', async(req,reply)=>{
        try{
            const email = req.body.email;
            const password= req.body.password;
            const user = await studentModel.findOne({email});

            if(!user){
                reply.send("User not found");
                return
            }
            const isValidatPassword = await bcrypt.compare(password, user.password);
            if(!isValidatPassword){
                reply.status(404).send("Password not matched")
                return;
            }
            let payload = {id: user.id}
            const token = await fastify.jwt.sign(payload);
            reply.send({token})

        }catch(err){
            reply.send(err.message);
        }
    })

    fastify.post('/signup',async(req,reply)=>{
        try{
            let name  = req.body.name;
            let email =  req.body.email;
            let password= req.body.password
            let id =  req.body.id;
            const hashedPassword = await bcrypt.hash(password, 10);

            const data = new studentModel({
                name,
                email,
                password:hashedPassword,
                id
            });
            
            await data.save();
            
            let payload = {id: req.body.id}
            const token = await fastify.jwt.sign(payload);
            reply.send({token})
        }catch(err){
            reply.send(err.message)
        }
    })
    done()
    })

    

export default jwtRoutes