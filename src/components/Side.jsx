import Step from "./step"

function Side(props) {
    return (
        <>
            <div className='side'>
                <div id='side-txt'>
                    <div className='step-container'>
                        <Step number='1' text='YOUR INFO' isSelected={props.selected == 1} />
                        <Step number='2' text='SELECT PLAN' isSelected={props.selected == 2} />
                        <Step number='3' text='ADD-ONS' isSelected={props.selected == 3} />
                        <Step number='4' text='SUMMARY' isSelected={props.selected == 4} />
                    </div>
                </div>
                <img id='side-img' src='/src/assets/bg-sidebar-desktop.svg' alt="sidebar" />
            </div>
        </>
    )
}

export default Side