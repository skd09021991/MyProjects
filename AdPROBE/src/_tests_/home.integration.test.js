import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Home from "./";
import Home from "../components/Home/";

Enzyme.configure({ adapter: new Adapter() });

//jest.mock("../../api/");

describe("Home container", () => {
  test("renders", () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.exists()).toBe(true);
  });

  test("should render Home component", () => {
    const wrapper = mount(<Home />);

    expect(wrapper.children(Home).length).toEqual(1);
  });

  test("should update Home state", () => {
    const wrapper = mount(<Home />);

    expect(wrapper.state().articles).toEqual([]);

    const { performHome } = wrapper.find(Home).props();

    return performHome().then(() => {
      expect(wrapper.state().articles).toHaveLength(10);
    });
  });

  test('submitting form ads item', () => {
    const wrapper = shallow(<SchedeluDemo {...props} />);   
     wrapper.find(FormComponent).props().onSubmit('New item');
   
    expect(wrapper.instance().handleSubmit())
       .toHaveBeenCalledWith('New Item');
});

it('should call mock function when button is clicked', () => {
    const tree = shallow(
      <Button name='button test' handleClick={showDemoSlider} />
    );
    tree.simulate('click');
    expect(showDemoSlider).toHaveBeenCalled();
  });

});