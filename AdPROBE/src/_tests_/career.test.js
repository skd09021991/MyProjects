import {
    configure,
    shallow,
    mount,
    ShallowWrapper,
    ReactWrapper,
    
    wrapper
} from 'enzyme';
import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { createMount } from "@material-ui/core/test-utils";
import  Adapter from 'enzyme-adapter-react-16';
import Career from '../components/Career';

import LazyProgressiveImageLoading from '../ExtraComponents/Lazy-Progressive-Image-Loading/src/LazyProgressiveImageLoading/LazyProgressiveImageLoading';



configure({
    adapter: new Adapter()
});
describe('react unit tests', () => {
     //Shallow Testing can be done by using Enzyme’s shallow. While Deep Testing can be done by using mount. 
     let wrapper;
     beforeEach( () =>{
         wrapper = shallow( <Career/> );  
     });
     
    test('shallow tests', () => {
        let shallowWrapper= ShallowWrapper;       
         expect(() => {
            shallowWrapper = shallow(<Career />);
        });
    });  
    
    test('full DOM tests', () => {    //Full DOM test of the Career page
        let reactWrapper= ReactWrapper;        
        expect(() => {
            reactWrapper = mount(<Career />);
        });
    });

  
    it('should render all <section>', () => {
        expect(wrapper.find('section')).toHaveLength(4);
    });

    it('should render all <div>', () => {
        let wrapper = shallow(<Career />);
        expect(wrapper.find('div')).toHaveLength(59);
    });
     

    it('should render children <div>', () => {
        let wrapper = shallow(<Career />);
        expect(wrapper.children('div')).toHaveLength(2);
    });
   
    it('should render all <img>', () => {
        let wrapper = shallow(<Career />);
        expect(wrapper.find('img')).toHaveLength(13);
    });


    it('renders correctly', () => {  // for snapshot testing 
        expect(wrapper).toMatchSnapshot();
    });


    it('renders Child component', () => {    //this checks whether the child component is rendered properly or not
        const wrapper = shallow(<Career />);
        expect(wrapper.containsMatchingElement(<LazyProgressiveImageLoading />)).toEqual(true);
      });

});

describe('<Career />', () => {
    let mount;

    beforeAll(() => {
      mount = createShallow(); 
    });

    it('should tests TextField ', () => {
      const wrapper = mount(<Career />);
      
    });

});


describe("Career", () => {
    let mount;
    const fieldProps = {
      placeholder: "A placeholder",
      onChange: jest.fn()
    };
    beforeEach(() => {
      mount = createMount();
    });
  
    afterEach(() => {
      mount.cleanUp();
    });
  
    it("renders a <TextField/> component with expected props", () => {
      const wrapper = mount(<Career {...fieldProps} />);
      expect(wrapper.props().placeholder).toEqual("A placeholder");
      expect(wrapper.props().onChange).toBeDefined();
    });
    it("should trigger onChange on <Career/> on key press", () => {
      const wrapper = mount(<Career {...fieldProps} />);
      wrapper.find("input").simulate("change");
      expect(fieldProps.onChange).toHaveBeenCalled();
    });
  });


