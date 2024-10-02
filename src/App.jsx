import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  const generatePassword = useCallback(()=>{
    let pass = ''
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if(numberAllowed) chars += '0123456789'
    if(charAllowed) chars += '!@#$%^&*()_+'

    for(let i= 1; i<length; i++){
      const char = Math.floor(Math.random() * chars.length + 1)
      pass += chars[char]
    }
    setPassword(pass)
  },[length, numberAllowed, charAllowed])

  const copyPassword = ()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])
  

  return (
    <>
    <div className='h-screen w-full flex justify-center items-center' >
      <div className='h-1/2 w-3/4 flex flex-col justify-center items-center rounded-lg bg-slate-300'>
        <h1 className='my-3 text-2xl'>Password Generator</h1>
        <div className='flex flex-row w-1/2 justify-center items-center'>
          <input className='rounded-sm w-full' type="text" value={password} placeholder=' password' readOnly ref={passwordRef} />
          <button className='bg-green-500 rounded-md px-3 mx-3' onClick={copyPassword}>Copy</button>
        </div>
        <div className='flex flex-col gap-2 m-3'>
          <div>
            <input type="range" min={6} max={20} value={length} onChange={(e) => setLength(e.target.value)}/>
            <label htmlFor="length">Length : {length}</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked={numberAllowed} onChange={() => setNumberAllowed((prev)=> !prev)} />
            <label htmlFor="number">Numbers</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked={charAllowed} onChange={() => setCharAllowed((prev)=> !prev)} />
            <label htmlFor="characters">Characters</label>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
