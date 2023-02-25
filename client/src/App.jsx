import React, { useState } from 'react'
import './App.css'

const App = () => {

    const [ input, setInput ] = useState('')
    const [response, setResponse] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setInput('')

    const res = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            prompt: input
        })
    })

    if(res.ok){
        const data = await res.json()
        
        setResponse(data.bot)
    } else{
        const err = await res.text()

        alert(`Something Went Wrong: ${err}`)
    }

    setIsVisible(true)
}

    const handleKey = (e) => {
        if(e.key === 'ENTER'){
            console.log(`object`)
        }
    }   

    return (
        <main>
            <h1>GPT</h1>
            
            {
                isVisible ? (
                    <div className='human'>
                        <span className="icon">
                            😃 
                        </span>

                        <p className="user-text">{response}</p>
                    </div>
                ) : null
            }

            <form onSubmit={handleSubmit}>
                <input type={'text'} onKeyUp={handleKey} value={input} onChange={(e) => setInput(e.target.value)} name="input" id="input" placeholder='Enter Your Query'></input>
                <button type="submit"> ➡ </button>
            </form>
        </main>
    )
}

export default App