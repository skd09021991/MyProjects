import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import About from '../components/About';
import Career from '../components/Career';
import Contact from '../components/Contact';
import Home from '../components/Home';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ScheduleDemo from '../components/ScheduleDemo';




configure({ adapter : new Adapter() });

describe('App component', () => {
    test('should shallow correctly', () => {
        expect(shallow(
          <About />
        ))
    })
    test('should shallow correctly', () => {
        expect(shallow(
          <Career />
        ))
    })
    test('should shallow correctly', () => {
        expect(shallow(
          <Contact />
        ))
    })
    test('should shallow correctly', () => {
        expect(shallow(
          <Home />
        ))
    })
    test('should shallow correctly', () => {
        expect(shallow(
          <Footer/>
        ))
    })
    test('should shallow correctly', () => {
        expect(shallow(
          <Header/>
        ))
    })
    test('should shallow correctly', () => {
        expect(shallow(
          <ScheduleDemo/>
        ))
    })
  })