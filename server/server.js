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
        prompt: "\"\"\"\nUtil exposes the following:\nutil.openai() -> authenticates & returns the openai module, which has the following functions:\nopenai.Completion.create(\n    prompt=\"<my prompt>\", # The prompt to start completing from\n    max_tokens=123, # The max number of tokens to generate\n    temperature=1.0 # A measure of randomness\n    echo=True, # Whether to return the prompt in addition to the generated completion\n)\n\"\"\"\nimport util\n\"\"\"\nCreate an OpenAI completion starting from the prompt \"Once upon an AI\", no more than 5 tokens. Does not include the prompt.\n\"\"\"\n",
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