import React from 'react';

function Stats() {
    return (  
        <div className="container mt-5 p-5">
            <div className="row p-5">
                <div className="col -6   p-5">
                    <h1 className='fs-2'> Trust with Confidence</h1>
                    <br></br>
                    <h2 className="fs-4">Customer-first always</h2>
                    <p className='text-muted'>That why 1.3+ crore customer trust zerodha with  3.5 lakh crore worth of equity investments</p>
                    <h2 className="fs-4">No spam or gimmicks</h2>
                    <p  className='text-muted'>No gimmicks,spam ,"gamification" ,or annoying push notification . High quality apps but that use at your pace,the way you like. </p>
                    <h2 className="fs-4">The zerodha Universe</h2>
                    <p className='text-muted'>Not just an app, but whole ecosystem.Our investment in 30+ fintech startups offer you tailored services specific to your needs. </p>                
                    <h2 className="fs-4">Do better with money </h2>
                    <p className='text-muted'>with initiatives Nudge and kill Switch,we dont just faciliate transactions ,but actively help you do better with money. </p>                
                </div>
                <div className="col-6 p-5">
                    <img src="media/images/ecosystem.png" alt="ecosystem" style={{ width:"90%"}}/>
                    <div className='text-center'>
                        <a href='' className="mx-5" style={{textDecoration:"none"}}> Explore our products 🡢</a>   {/*mx is  margin x under x axis*/}
                        <a href='' style={{textDecoration:"none"}}>Try Kite demo  🡢</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;
