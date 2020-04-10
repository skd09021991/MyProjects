import {
    configure,
    shallow,
    mount,
    ShallowWrapper,
    ReactWrapper,
    wrapper
} from 'enzyme';
import React from 'react';


import  Adapter from 'enzyme-adapter-react-16';
import About from '../components/About';
import Box from '../components/common/box'
import LazyProgressiveImageLoading from '../ExtraComponents/Lazy-Progressive-Image-Loading/src/LazyProgressiveImageLoading/LazyProgressiveImageLoading';



configure({
    adapter: new Adapter()
});
describe('react unit tests', () => {
     //Shallow Testing can be done by using Enzyme’s shallow. While Deep Testing can be done by using mount. 
     let wrapper;
     beforeEach( () =>{
         wrapper = shallow( <About/> );  
     });
     
    test('shallow tests', () => {
        let shallowWrapper= ShallowWrapper;       
         expect(() => {
            shallowWrapper = shallow(<About />);
        });
    });  
    
    test('full DOM tests', () => {    //Full DOM test of the about page
        let reactWrapper= ReactWrapper;        
        expect(() => {
            reactWrapper = mount(<About />);
        });
    });

  

    

    it('should render all <section>', () => {
        expect(wrapper.find('section')).toHaveLength(4);
    });

    it('should render all <div>', () => {
        let wrapper = shallow(<About />);
        expect(wrapper.find('div')).toHaveLength(27);
    });
     

    it('should render children <div>', () => {
        let wrapper = shallow(<About />);
        expect(wrapper.children('div')).toHaveLength(2);
    });
   
    it('should render all <img>', () => {
        let wrapper = shallow(<About />);
        expect(wrapper.find('img')).toHaveLength(1);
    });


    it('renders correctly', () => {  // for snapshot testing 
        expect(wrapper).toMatchSnapshot();
    });


    it('renders Child component', () => {    //this checks whether the child component is rendered properly or not
        const wrapper = shallow(<About />);
        expect(wrapper.containsMatchingElement(<Box />)).toEqual(true);
      });
   

      it('renders Child component', () => {    //this checks whether the child component is rendered properly or not
        const wrapper = shallow(<About />);
        expect(wrapper.containsMatchingElement(<LazyProgressiveImageLoading />)).toEqual(true);
      });

});





