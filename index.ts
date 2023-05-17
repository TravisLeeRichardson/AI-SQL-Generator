import express, {Application, Request, Response} from 'express'
import cors from "cors"
import {Configuration, OpenAIApi} from "openai"
import * as dotenv from "dotenv"
dotenv.config()

const PORT: number = 8000

const app: Application = express() //allow us to work with express
app.use(cors())
app.use(express.json()) //helps us pass JSON from frontend to backend
const API_KEY: string = process.env.API_KEY!
console.log(API_KEY);
//const API_KEY: string = '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'

const configuration = new Configuration({
    apiKey: API_KEY
})

const openai = new OpenAIApi(configuration)
app.post("/completions", async (req: Request, res: Response) => {
    try {
        console.log("message being requested is", req.body.message)
        const completion = await openai.createChatCompletion({
            //model: "gpt-4",
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: "Create a SQL request to" + req.body.message
                }
            ]
        })
        console.log(completion.data.choices[0].message)
        res.send(completion.data.choices[0].message)

    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`))