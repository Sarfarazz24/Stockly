import React from React;
import {render,screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; // it helps to delay the check if there is any delay of data from db
import Hero from "../landing_page/home/Hero";

// test suite --> we can write multiple testcases in it
describe('Hero Component',()=>{

    test('renders hero image',()=>{
        render(<Hero/>);
        const heroImage=screen.getByAltText("Hero image"); // selecting the image having alt="hero image"
        expect(heroImage).toBeInTheDocument(); // defines what iam expecting and specify it
        expect(heroImage).toHaveAttribute('src',"media/images/homeHero.png")
    })
})
