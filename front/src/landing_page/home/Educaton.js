import React from 'react';


function Education(){
    return (
        <div className='container mt-5'>
            <div className="row">
                <div className='col-6'>
                    <img   src='media/images/education.svg'  style={{width:"75%"}} />
                </div>
                <div className="col-6">
                    <h1 className="mt-5 fs-2">Free and open market education</h1>
                    <p>varsity the largest online stock market education book in the world covering everything from basics to advance trading.</p>
                    <br></br>
                    <a  href="" style={{textDecoration:"none"}}> varsity 🡢</a>
                    <br></br>
                    <p>Trading Q&A the most active trading and investment community in india for all your market related queries </p>
                    <br></br>
                    <a  href="" style={{textDecoration:"none"}}>TradingQ&A 🡢</a>

                </div>
            </div>
        </div>
    );
}


export default Education;