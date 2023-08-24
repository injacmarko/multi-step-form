import { useEffect, useState } from 'react'
import './App.css'
import Side from './components/Side'

function App() {

  const [selected, setSelected] = useState(4)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [number, setNumber] = useState()
  const [invalidName, setInvalidName] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidNumber, setInvalidNumber] = useState(false)
  const [plan, setPlan] = useState(false)
  const [addon1, setAddon1] = useState(false)
  const [addon2, setAddon2] = useState(false)
  const [addon3, setAddon3] = useState(false)
  const [subscription, setSubscription] = useState('Advanced')
  const [planSum, setPlanSum] = useState(0)
  const [addon1Sum, setAddon1Sum] = useState(0)
  const [addon2Sum, setAddon2Sum] = useState(0)
  const [addon3Sum, setAddon3Sum] = useState(0)

  useEffect(() => {
    plan ? subscription=='Arcade' ? setPlanSum(90) : subscription=='Advanced' ? setPlanSum(120) : setPlanSum(150) : subscription=='Arcade' ? setPlanSum(9) : subscription=='Advanced' ? setPlanSum(12) : setPlanSum(15)
  }, [subscription])
  useEffect(() => {
    plan ? addon1 ? setAddon1Sum(10) : setAddon1Sum(0) : addon1 ? setAddon1Sum(1) : setAddon1Sum(0)
  }, [addon1])
  useEffect(() => {
    plan ? addon2 ? setAddon2Sum(20) : setAddon2Sum(0) : addon2 ? setAddon2Sum(2) : setAddon2Sum(0)
  }, [addon2])
  useEffect(() => {
    plan ? addon3 ? setAddon3Sum(20) : setAddon3Sum(0) : addon3 ? setAddon3Sum(2) : setAddon3Sum(0)
  }, [addon3])

  function nextStep() {
    if (selected==1) {
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
    setSelected(selected+1)
  }

  const addon1Style = (x) => ({
    border: x ? '1px solid #022959' : '',
    backgroundColor: x ? '#f9f8fe' : ''
  })
  const addon2Style = (x) => ({
    border: x ? '1px solid #022959' : '',
    backgroundColor: x ? '#f9f8fe' : ''
  })
  const addon3Style = (x) => ({
    border: x ? '1px solid #022959' : '',
    backgroundColor: x ? '#f9f8fe' : ''
  })

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
                  <input type="radio" name='plan' onClick={() => setSubscription('Arcade')}/>
                  <span className='plan-btn'>
                    <img src="/src/assets/icon-arcade.svg" alt="arcade" />
                    <span>
                      <p>Arcade</p>
                      {plan ? <p>$90/yr</p> : <p>$9/mo</p>}
                    </span>
                  </span>
                </label>
                <label className='plan-btn-label'>
                  <input type="radio" name='plan'  onClick={() => setSubscription('Advanced')}/>
                  <span className='plan-btn'>
                    <img src="/src/assets/icon-advanced.svg" alt="advanced" />
                    <span>
                      <p>Advanced</p>
                      {plan ? <p>$120/yr</p> : <p>$12/mo</p>}
                    </span>
                  </span>
                </label>
                <label className='plan-btn-label'>
                  <input type="radio" name='plan' onClick={() => setSubscription('Pro')}/>
                  <span className='plan-btn'>
                    <img src="/src/assets/icon-pro.svg" alt="pro" />
                    <span>
                      <p>Pro</p>
                      {plan ? <p>$150/yr</p> : <p>$15/mo</p>}
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
              <div id='addons'>
                <label className='addon-label'>
                  <span className='addon' style={addon1Style(addon1)}>
                    <span className='addon-half'>
                      <input type="checkbox" name="addons" onClick={() => setAddon1(!addon1)}/>
                      <span className='addon-txt'>
                        <p>Online service</p>
                        <p>Access to multiplayer games</p>
                      </span>
                    </span>
                    {plan ? <p>+$10/yr</p> : <p>+$1/mo</p>}
                  </span>
                </label>
                <label className='addon-label'>
                  <span className='addon' style={addon2Style(addon2)}>
                    <span className='addon-half'>
                      <input type="checkbox" name="addons" onClick={() => setAddon2(!addon2)}/>
                      <span className='addon-txt'>
                        <p>Larger storage</p>
                        <p>Extra 1TB of cloud save</p>
                      </span>
                    </span>
                    {plan ? <p>+$20/yr</p> : <p>+$2/mo</p>}
                  </span>
                </label>
                <label className='addon-label'>
                  <span className='addon' style={addon3Style(addon3)}>
                    <span className='addon-half'>
                      <input type="checkbox" name="addons" onClick={() => setAddon3(!addon3)}/>
                      <span className='addon-txt'>
                        <p>Customizable profile</p>
                        <p>Custom theme on your profile</p>
                      </span>
                    </span>
                    {plan ? <p>+$20/yr</p> : <p>+$2/mo</p>}
                  </span>
                </label>
              </div>
            </>
            :
            <>
              <div id='summary'>
                  <div id='subscription'>
                    <div id='upper'>
                      {plan ? <p>{subscription} (Yearly)</p> : <p>{subscription} (Monthly)</p>}
                      {plan ?
                      subscription=='Arcade' ? <p>$90/yr</p> : subscription=='Advanced' ? <p>$120/yr</p> : <p>$150/yr</p>
                      :
                      subscription=='Arcade' ? <p>$9/mo</p> : subscription=='Advanced' ? <p>$12/mo</p> : <p>$15/mo</p>}
                    </div>
                    <div id='line'></div>
                    <div id='addon1'>
                      {addon1 ? <p>Online service</p> : <></>}
                      {addon1 ? plan ? <p>+$10/yr</p> : <p>+$1/mo</p> : <></>}
                    </div>
                    <div id='addon2'>
                      {addon2 ? <p>Larger storage</p> : <></>}
                      {addon2 ? plan ? <p>+$20/yr</p> : <p>+$2/mo</p> : <></>}
                    </div>
                    <div id='addon3'>
                      {addon3 ? <p>Customizable profile</p> : <></>}
                      {addon3 ? plan ? <p>+$20/yr</p> : <p>+$2/mo</p> : <></>}
                    </div>
                  </div>
                  <div id='total'>
                    <p>Total</p>
                    {plan ? <p>${planSum + addon1Sum + addon2Sum + addon3Sum}/yr</p> : <p>${planSum + addon1Sum + addon2Sum + addon3Sum}/mo</p>}
                  </div>
              </div>
            </>}
            <div id='submit-btn-container'>
              <button id='back-btn' onClick={() => {setSelected(selected-1)}} style={backStyle(selected)}>Go Back</button>
              {selected!=4 ? <button id='submit-btn' onClick={() => nextStep()}>Next Step</button> : <button id='confirm-btn'>Confirm</button>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
