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
import Footer from '../components/Footer';



configure({
    adapter: new Adapter()
});
describe('react unit tests', () => {
     //Shallow Testing can be done by using Enzyme’s shallow. While Deep Testing can be done by using mount. 
     let wrapper;
     beforeEach( () =>{
         wrapper = shallow( <Footer/> );  
     });
     
    test('shallow tests', () => {
        let shallowWrapper= ShallowWrapper;       
         expect(() => {
            shallowWrapper = shallow(<Footer />);
        });
    });  
    
    test('full DOM tests', () => {    //Full DOM test of the Footer page
        let reactWrapper= ReactWrapper;        
        expect(() => {
            reactWrapper = mount(<Footer />);
        });
    });

  

    


    it('should render all <div>', () => {
        let wrapper = shallow(<Footer />);
        expect(wrapper.find('div')).toHaveLength(15);
    });
  


    it('renders correctly', () => {  // for snapshot testing 
        expect(wrapper).toMatchSnapshot();
    });



});





