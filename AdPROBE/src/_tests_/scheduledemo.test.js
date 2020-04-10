import {
    configure,
    shallow,
    mount,
    ShallowWrScheduleDemoer,
    ReactWrScheduleDemoer,
    sinon,
    wrScheduleDemoer
} from 'enzyme';
import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import {TextField , Button } from '@material-ui/core/TextField';
import { createMount } from "@material-ui/core/test-utils";
import  Adapter from 'enzyme-adapter-react-16';
import ScheduleDemo from '../components/ScheduleDemo';
import {onSubmit} from '../components/ScheduleDemo'
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';



configure({
    adapter: new Adapter()
});
describe('react unit tests', () => {

    const fieldProps = {
        placeholder: "A placeholder",
        onChange: jest.fn()
      };


    const Composition = props => {
        return <ScheduleDemo {...fieldProps} />;
      };
     //Shallow Testing can be done by using Enzyme’s shallow. While Deep Testing can be done by using mount. 


     let wrScheduleDemoer;
     beforeEach( () =>{
         wrScheduleDemoer = shallow( <ScheduleDemo/> );  
     });
     
     test('shallow tests', () => {
        let shallowWrScheduleDemoer= ShallowWrScheduleDemoer;       
         expect(() => {
            shallowWrScheduleDemoer = shallow(<ScheduleDemo />);
        });
      });  
    
     test('full DOM tests', () => {    //Full DOM test of the ScheduleDemo page
        let reactWrScheduleDemoer= ReactWrScheduleDemoer;        
        expect(() => {
            reactWrScheduleDemoer = mount(<ScheduleDemo />);
        });
    });


    it('should render all <div>', () => {
        let wrScheduleDemoer = shallow(<ScheduleDemo />);
        expect(wrScheduleDemoer.find('div')).toHaveLength(10);
    });
     



    it('renders correctly', () => {  // for snapshot testing 
        expect(wrScheduleDemoer).toMatchSnapshot();
    });
    
 
    
});

describe('<ScheduleDemo /> component in which we used material-ui', () => {
      let mount;

      beforeAll(() => {
        mount = createShallow(); 
      });

      it('should tests TextField ', () => {
        const wrapper = mount(<ScheduleDemo />);
        
      });

});

describe("ScheduleDemo component in which textfield are there , it checks whether it is taking placeholder or not", () => {
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

  test('Shows error message when TextField is empty.', () => {
    const wrapper = mount(<ScheduleDemo {...fieldProps} />);
    expect(wrapper.find(TextField).props().value).to.equal('');
  });


  it("renders a <TextField/> component with expected props", () => {
    const wrapper = mount(<ScheduleDemo {...fieldProps} />);
    expect(wrapper.props().placeholder).toEqual("A placeholder");
    expect(wrapper.props().onChange).toBeDefined();
  });



  it("should trigger onChange on <ScheduleDemo/> on key press", () => {
    const wrapper = mount(<ScheduleDemo {...fieldProps} />);
    wrapper.find("input").simulate("change");
    expect(fieldProps.onChange).toHaveBeenCalled();
  });


  it('check if form displays', () => {
    const { getByTestId } = render(<ScheduleDemo />);
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




