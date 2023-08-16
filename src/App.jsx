import { useState } from 'react'
import './App.css'
import Side from './components/Side'

function App() {

  const [selected, setSelected] = useState(2)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [number, setNumber] = useState()
  const [invalidName, setInvalidName] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidNumber, setInvalidNumber] = useState(false)
  const [plan, setPlan] = useState(false)

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

  const monthlyStyle = (plan) => ({
    color: plan ? '' : '#022959',
    transition: 'color 0.3s'
  })
  const yearlyStyle = (plan) => ({
    color: !plan ? '' : '#022959',
    transition: 'color 0.3s'
  })

  const backStyle = (selected) => ({
    opacity: selected==1 ? '0' : '',
    cursor: selected==1 ? 'default' : ''
  })

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
              {selected==1 ?
              <>
                <p id='title'>Personal info</p>
                <p id='subtitle'>Please provide your name, email address and phone number.</p>
              </>
              : selected==2 ? 
              <>
                <p id='title'>Select your plan</p>
                <p id='subtitle'>You have the option of monthly or yearly billing.</p>
              </>
              : selected==3 ?
              <>
                <p id='title'>Pick add-ons</p>
                <p id='subtitle'>Add-ons help enhance your gaming experience.</p>
              </>
              :
              <>
                <p id='title'>Finishing up</p>
                <p id='subtitle'>Double-check everything looks OK before confirming.</p>
              </>
              }
            </div>
            {selected==1 ?
            <>
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
            </>
            : selected==2 ?
            <div id='plan-container'>
              <div id='buttons'>
                <label className='plan-btn-label'>
                  <input type="radio" name='plan'/>
                  <span className='plan-btn'>
                    <img src="/src/assets/icon-arcade.svg" alt="arcade" />
                    <span>
                      <p>Arcade</p>
                      {plan ?
                      <p>$90/yr</p>
                      :
                      <p>$9/mo</p>
                      }
                    </span>
                  </span>
                </label>
                <label className='plan-btn-label'>
                  <input type="radio" name='plan'/>
                  <span className='plan-btn'>
                    <img src="/src/assets/icon-advanced.svg" alt="advanced" />
                    <span>
                      <p>Advanced</p>
                      {plan ?
                      <p>$120/yr</p>
                      :
                      <p>$12/mo</p>
                      }
                    </span>
                  </span>
                </label>
                <label className='plan-btn-label'>
                  <input type="radio" name='plan'/>
                  <span className='plan-btn'>
                    <img src="/src/assets/icon-pro.svg" alt="pro" />
                    <span>
                      <p>Pro</p>
                      {plan ?
                      <p>$150/yr</p>
                      :
                      <p>$15/mo</p>
                      }
                    </span>
                  </span>
                </label>
              </div>
              <div id='switch-container'>
                <p style={monthlyStyle(plan)}>Monthly</p>
                <label className='switch'>
                  <input type="checkbox" onClick={() => setPlan(!plan)}/>
                  <span id='slider'></span>
                </label>
                <p style={yearlyStyle(plan)}>Yearly</p>
              </div>
            </div>
            : selected==3 ?
            <>
            </>
            :
            <>
            </>}
            <div id='submit-btn-container'>
              <button id='back-btn' onClick={() => {setSelected(selected-1)}} style={backStyle(selected)}>Go Back</button>
              <button id='submit-btn' onClick={() => nextStep()}>Next Step</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
