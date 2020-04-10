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
import Contact from '../components/Contact';



configure({
    adapter: new Adapter()
});
describe('react unit tests', () => {
     //Shallow Testing can be done by using Enzyme’s shallow. While Deep Testing can be done by using mount. 
     let wrapper;
     beforeEach( () =>{
         wrapper = shallow( <Contact/> );  
     });
     
    test('shallow tests', () => {
        let shallowWrapper= ShallowWrapper;       
         expect(() => {
            shallowWrapper = shallow(<Contact />);
        });
    });  
    
    test('full DOM tests', () => {    //Full DOM test of the Contact page
        let reactWrapper= ReactWrapper;        
        expect(() => {
            reactWrapper = mount(<Contact />);
        });
    });


    it('should render all <section>', () => {
        expect(wrapper.find('section')).toHaveLength(4);
    });

    it('should render all <div>', () => {
        let wrapper = shallow(<Contact />);
        expect(wrapper.find('div')).toHaveLength(31);
    });
     

    it('should render children <div>', () => {
        let wrapper = shallow(<Contact />);
        expect(wrapper.children('div')).toHaveLength(1);
    });
  
    it('renders correctly', () => {  // for snapshot testing 
        expect(wrapper).toMatchSnapshot();
    });


});

describe('<Contact />', () => {
    let mount;

    beforeAll(() => {
      mount = createShallow(); 
    });

    it('should tests TextField ', () => {
      const wrapper = mount(<Contact />);
      
    });
  
});

describe("Contact", () => {
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
      const wrapper = mount(<Contact {...fieldProps} />);
      expect(wrapper.props().placeholder).toEqual("A placeholder");
      expect(wrapper.props().onChange).toBeDefined();
    });


    it("should trigger onChange on <Contact/> on key press", () => {
      const wrapper = mount(<Contact {...fieldProps} />);
      wrapper.find("input").simulate("change");
      expect(fieldProps.onChange).toHaveBeenCalled();
    });

    it('check if form displays', () => {
        const { getByTestId } = render(<Contact />);
        const form = getByTestId('form');
        const output = getByTestId('output');
        const label = getByTestId('label');
        const nameInput = getByTestId('nameInput');
        const submit = getByTestId('submit');
      
        expect(form).toBeInTheDocument();
        expect(output).toBeEmpty('');
        expect(label).toHaveTextContent('Enter Name');
        expect(nameInput).toHaveValue('');
        expect(submit).toBeInTheDocument();
      });
  });



