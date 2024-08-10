import React, { useEffect }from 'react';

const Timer = (props) => {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('타이머 진행중....');
        }, 1000);
        
        // clean-up
        return () => {
            clearInterval(timer);
        }
    }, [])
    return(
        <div>
            {/* <span>타이머 시작.</span> */}
        </div>
    )
}

export default Timer;