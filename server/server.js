const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai')

const config = new Configuration({
    apiKey: process.env.OPEN_API
})

const openai = new OpenAIApi(config)

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Server Started!',
        source: `${openai.basePath}`
    })
})

// POST REQUEST
app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["\"\"\""],
        })

    res.status(200).send({
        bot: response.data.choices[0].text
    })
    } catch (error) {
        res.status(500).json({
            error: `Something Went Wrong: ${error}`
        })
    }
})


app.listen('5000', () => {
    console.log(`Server Started At http://localhost:5000`)
})