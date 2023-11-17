const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP }=require('express-graphql')
const { buildSchema }=require('graphql')
const mongoose = require('mongoose')
const Event = require('./models/event')

const app = express()


app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: Float!
            title:String!
            description:String!
            price:Float!
            date: String!
        }
        input EventInput {
            title:String!
            description:String!
            price:Float!
            date:String!
        } 
        type RootQuery {
            events:[Event!]!
        }
        type RootMutation{
            createEvent(EventInput:EventInput):Event
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),      
    rootValue:{
        events: () => {
            return events
        },
          createEvent:  (args) =>{
            const event = new Event({
                _id:Math.random(),
                title:args.EventInput.title,
                description:args.EventInput.description,
                price:+args.EventInput.price,
                date:new Date(args.EventInput.date)
            })
            return event.save().then(result=>{
                console.log(event)
                return {...result._doc}
            })
            .catch(err=>{
                console.log(err)
                throw err
            })
    },
    graphiql:true
}}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.l1nzbvq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(
    ()=>{app.listen(4000)
        console.log('Hier gehts rein aber die API wird nicht angezeigt')
    })
.catch(err=>{
    console.log(err)
})


