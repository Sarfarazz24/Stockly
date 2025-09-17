import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-5 text-center mt-5 border-top">
        <div className="col-8 ">
          <a href="" style={{ textDecoration: "none" }}>
            <h3 className="fs-4 mb-4">Brokerage Calculator</h3>
          </a>
          <ul
            style={{ textAlign: "left", lineHeight: "2.5" }}
            className="text-muted "
          >
            <li>
              Call & Trade and RMS auto-squareoff. Additional charges of $50 +
              GST per order
            </li>
            <li>Digital contract notes will be sent via e-mail </li>
            <li>
              Physical copies of contract notes,if required shall be charge $20
              per contract node. Courier charges may apply
            </li>
            <li>
              if the account is in debit balance , any order placed will be
              charged $40 per executed order instead of $20 per executed order
            </li>
          </ul>
        </div>
        <div className="col-4">
          <a href="" style={{ textDecoration: "nones" }}>
            <h3 className="fs-4">List of charges</h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
