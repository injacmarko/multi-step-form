function Step(props) {

    const pStyle = (x) => ({
        color: x ? '#493fff' : ''
    })
    const divStyle = (x) => ({
        backgroundColor: x ? '#bfe1fc' : ''
    })

    return(
        <div className="step">
            <div className='number-circle' style={divStyle(props.isSelected)}>
                <p style={pStyle(props.isSelected)}>{props.number}</p>
            </div>
            <div className='step-txt'>
               <p className='p1'>STEP {props.number}</p>
               <p className='p2'>{props.text}</p>
            </div>
        </div>
    )
}

export default Step