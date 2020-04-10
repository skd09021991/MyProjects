import {
    configure,
    shallow,
    mount,
    ShallowWrapper,
    ReactWrapper,
    wrapper
} from 'enzyme';
import React from 'react';
import Dialog from '@material-ui/core';

import  Adapter from 'enzyme-adapter-react-16';
import Home from '../components/Home';
import Box from '../components/common/box'
import LazyProgressiveImageLoading from '../ExtraComponents/Lazy-Progressive-Image-Loading/src/LazyProgressiveImageLoading/LazyProgressiveImageLoading';
import ScheduleDemo from '../components/ScheduleDemo';
import { createMount } from "@material-ui/core/test-utils";
import TextField from "@material-ui/core/TextField";


configure({
    adapter: new Adapter()
});
describe('react unit tests', () => {


    const fieldProps = {
        placeholder: "A placeholder",
        onChange: jest.fn()
      };
      const Composition = props => {
        return <Home {...fieldProps} />;
      };


     //Shallow Testing can be done by using Enzyme’s shallow. While Deep Testing can be done by using mount. 
     let wrapper;
     beforeEach( () =>{
         wrapper = shallow( <Home/> );  
     });
     
    test('shallow tests', () => {
        let shallowWrapper= ShallowWrapper;       
         expect(() => {
            shallowWrapper = shallow(<Home />);
        });
    });  
    
    test('full DOM tests', () => {    //Full DOM test of the Homepage
        let reactWrapper= ReactWrapper;        
        expect(() => {
            reactWrapper = mount(<Home />);
        });
    });

     test("renders" , () => {
         const wrapper = shallow(<ScheduleDemo />);
         expect(wrapper.exists()).toBe(true);
     })

    

    it('should render all <section>', () => {
        expect(wrapper.find('section')).toHaveLength(3);
    });

    it('should render all <div>', () => {
        let wrapper = shallow(<Home/>);
        expect(wrapper.find('div')).toHaveLength(44);
    });
     

    it('should render children <div>', () => {
        let wrapper = shallow(<Home/>);
        expect(wrapper.children('div')).toHaveLength(1);
    });
   
    it('should render all <img>', () => {
        let wrapper = shallow(<Home/>);
        expect(wrapper.find('img')).toHaveLength(1);
    });


    it('renders correctly', () => {  // for snapshot testing 
        expect(wrapper).toMatchSnapshot();
    });


    it('renders Child component', () => {    //this checks whether the child component is rendered properly or not
        const wrapper = shallow(<Home/>);
        expect(wrapper.containsMatchingElement(<Box />)).toEqual(true);
      });



    it('renders Child component', () => {    //this checks whether the child component is rendered properly or not
        const wrapper = shallow(<Home/>);
        expect(wrapper.containsMatchingElement(<Dialog />)).toEqual(true);
      });
   

   

     it('renders Child component', () => {    //this checks whether the child component is rendered properly or not
        const wrapper = shallow(<Home/>);
        expect(wrapper.containsMatchingElement(<LazyProgressiveImageLoading />)).toEqual(true);
      });
      

    
});




