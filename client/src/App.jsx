import React from 'react'
import './App.css'

const App = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <main>
            <h1>GPT</h1>
            <form onSubmit={handleSubmit}>
                <textarea name="input" id="input" cols="1" rows="1" placeholder='Enter Your Query'></textarea>
                <button type="submit">
                    ➡ 
                </button>
            </form>
        </main>
    )
}

export default App