import React from 'react';
 
function Pricing() {
    return (  
        <div className="container ">
            <div className='row'>
                <div className="col-4 "> 
                    <h1 className="mb-5 fs-2">Unbeatable Pricing</h1>
                    <p>we pioneered concept of discount broking and price and transperancy in india.Flat fees and no hidden charges.</p>
                    <a href="" style={{textDecoration:"none"}} > See pricing</a>
                </div>
                <div className="col-2"></div> {/* this is the empty space between them! */}
                <div className="col-6">
                    <div className="row  text-center">
                        <div className='col p-4 border'>
                            <h1 className='mb-5'>₹0</h1>
                        
                            <p>Free equity delivery and direct mutual funds </p>
                        </div>
                        <div className="col p-4 border ">
                            <h1 className="mb-5">₹20</h1>
                            <p> Intraday and F&O</p>
                            <br></br>
                            </div >
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Pricing;