import React from 'react';

function Awards(){
    return ( 
        <div className='container mt-5 '>
            <div className="row">
            <div className="col-6   mb-6" ><img src="media/images/largestBroker.svg"/></div>
            <div className="col-6  ">
                <h1 >Largest Stock Broker in India!</h1>
                <p className="p-2">2+ millions zerodha clients contribute to over 15% of all retail order volumes in india daily by trading and investin in :</p>
                <div className='row mt-5'>
                    <div className="col -6">
                        <ul >
                        <li><p>Future and options</p></li>
                        <li><p>Commodity derivatives</p></li>
                        <li><p>Currency derivatives</p></li>
                </ul>

                    </div>
                    <div className='col-6'>
                        <ul >
                        <li><p>Stock and ipos</p></li>
                        <li><p>Direct Mutual funds</p></li>
                        <li><p>Bonds and Growth</p></li>
                    </ul>
                    </div>
                </div>
                <img   src="media/images/pressLogos.png" style={{width:"90%"}} />  
              </div>
            </div>
        </div>
    );
}

export default Awards;