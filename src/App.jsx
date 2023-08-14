import { useState } from 'react'
import './App.css'
import Side from './components/Side'

function App() {

  const [selected, setSelected] = useState(1)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [number, setNumber] = useState()
  const [invalidName, setInvalidName] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidNumber, setInvalidNumber] = useState(false)

  function nextStep() {
    name=='' || name==null ? setInvalidName(true) : setInvalidName(false)
    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    !emailRegEx.test(email) ? setInvalidEmail(true) : setInvalidEmail(false)
    const numberRegEx = /\+\d+/
    !numberRegEx.test(number) ? setInvalidNumber(true) : setInvalidNumber(false)

    document.activeElement.blur()

    if (number != null && number !='' && emailRegEx.test(email) && numberRegEx.test(number)) {
      setSelected(selected+1)
    }
  }

  const nameInputStyle = (invalidName) => ({
    border: invalidName ? '1px solid red' : '1px solid rgb(191, 191, 191)'
  })
  const emailInputStyle = (invalidEmail) => ({
    border: invalidEmail ? '1px solid red' : '1px solid rgb(191, 191, 191)'
  })
  const numberInputStyle = (invalidNumber) => ({
    border: invalidNumber ? '1px solid red' : '1px solid rgb(191, 191, 191)'
  })

  return (
    <>
      <div className='container'>
        <div className='form'>
          <Side selected={selected}></Side>
          <div className='content'>
            <div id='upper-content'>
              <p id='title'>Personal info</p>
              <p id='subtitle'>Please provide your name, email address and phone number.</p>
            </div>
            <div id='inputs'>
              <span className='input'>
                <span className='input-labels'>
                  <p className='label'>Name</p>
                  {invalidName ? <p className='label-error'>This field is required</p> : <></>}
                </span>
                <input type="text" style={nameInputStyle(invalidName)} spellCheck='false' onChange={e => setName(e.target.value)} placeholder='e.g. Peter Parker' autoFocus onKeyDown={e => {
                  if (e.key == 'Enter') {
                    nextStep()
                  }}}/>
              </span>
              <span className='input'>
                <span className='input-labels'>
                  <p className='label'>Email Address</p>
                  {invalidEmail ? <p className='label-error'>This field is required</p> : <></>}
                </span>
                <input type="email" style={emailInputStyle(invalidEmail)} spellCheck='false' placeholder='e.g. spiderman@gmail.com' onChange={e => setEmail(e.target.value)} onKeyDown={e => {
                  if (e.key == 'Enter') {
                    nextStep()
                  }}}/>
              </span>
              <span className='input'>
                <span className='input-labels'>
                  <p className='label'>Phone Number</p>
                  {invalidNumber ? <p className='label-error'>This field is required</p> : <></>}
                </span>
                <input type="tel" style={numberInputStyle(invalidNumber)} spellCheck='false' placeholder='e.g. +1 234 567 890' onChange={e => setNumber(e.target.value)} onKeyDown={e => {
                  if (e.key == 'Enter') {
                    nextStep()
                  }}}/>
              </span>
            </div>
            <div id='submit-btn-container'>
              <button id='submit-btn' onClick={() => nextStep()}>Next Step</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
