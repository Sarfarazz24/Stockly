import React from "react";

function Hero() {
  return (
    <div className="container mb-5">
      <div className="row  text-center  ">
        {" "}
        {/*it will occupy entire row! */}
        <img
          src="media/images/homeHero.png"
          alt="Hero image"
          className="mb-5"
        ></img>
        <h1 className="mt-5 ">Invest in Everything!</h1>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, ETFs,
          bonds, and more.
        </p>
        <button
          className="p-3  btn  fs-5 mb-5"
          style={{ width: "25%", margin: " auto", background: "blue" }}
          class="align-center"
        >
          Sign up for free!
        </button>
      </div>
    </div>
  );
}

export default Hero;
