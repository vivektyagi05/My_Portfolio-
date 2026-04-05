const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const OpenAI = require("openai")

dotenv.config()

const app = express()

app.use(cors({
origin:"*"
}))

app.use(express.json())

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

/* TEST ROUTE */

app.get("/",(req,res)=>{
res.send("AI server working")
})

/* CHAT ROUTE */

app.post("/chat", async (req,res)=>{

const message = req.body.message

try{

const completion = await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[
{
role:"system",
content:"You are Vivek Tyagi's portfolio AI assistant."
},
{
role:"user",
content:message
}
]

})

res.json({
reply:completion.choices[0].message.content
})

}catch(error){

console.log(error)

res.status(500).json({
reply:"AI server error"
})

}

})

app.listen(3000,()=>{
console.log("AI server running on http://localhost:3000")
})