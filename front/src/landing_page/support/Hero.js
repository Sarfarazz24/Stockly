import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className=" p-5" id="supportWrapper">
        <h4>Support Portal</h4>
        <a href="">Track Tickets</a>
      </div>
      <div className="row p-5 m-3">
        <div className="col-6 p-5" id="hero">
          <h1 className="fs-3">
            Search for an answer or browse help topics to create a ticket{" "}
          </h1>
          <input
            type="text"
            id="inputHero"
            placeholder="Eg:how do i activate F&O, why is my order getting rejected."
          />
          <br />
          <a href="">Track account opening</a>
          <a href="">Track segment activation</a>
          <a href="">intraday</a>
          <a href="">margins</a>
          <a href="">kite user manual</a>
        </div>
        <div className="col-6 p-3">
          <h1 className="fs-4">Featured</h1>
          <ol style={{ lineHeight: "2.5" }}>
            <li>
              <a href="">1.Current Takeovers and Delisting-January 2024</a>
            </li>
            <li>
              <a href="">Latest intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
