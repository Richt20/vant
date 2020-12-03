import Search from '..';
import { mount } from '@vue/test-utils';

test('should emit update:modelValue event when input value changed', () => {
  const onUpdateModelValue = jest.fn();
  const wrapper = mount(Search, {
    props: {
      'onUpdate:modelValue': onUpdateModelValue,
    },
  });

  const input = wrapper.find('input');
  input.element.value = '1';
  input.trigger('input');

  expect(onUpdateModelValue).toHaveBeenCalledTimes(1);
  expect(onUpdateModelValue).toHaveBeenCalledWith('1');
});

test('should emit cancel event when cancel button click is clicked', () => {
  const wrapper = mount(Search, {
    props: {
      value: 'test',
      showAction: true,
    },
  });

  const cancel = wrapper.find('.van-search__action');
  cancel.trigger('click');

  expect(wrapper.emitted('cancel').length).toEqual(1);
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual('');
});

test('should not emit cancel event when using action slot', () => {
  const wrapper = mount(Search, {
    props: {
      value: 'test',
      showAction: true,
    },
    slots: {
      action: () => 'Custom Action',
    },
  });

  const cancel = wrapper.find('.van-search__action');
  cancel.trigger('click');

  expect(wrapper.emitted('cancel')).toBeFalsy();
});

test('should emit search event when enter key is pressed', () => {
  const wrapper = mount(Search);

  const input = wrapper.find('input');
  input.trigger('keypress.enter');
  input.trigger('keypress.a');

  expect(wrapper.emitted('search').length).toEqual(1);
});

test('should render label slot correctly', () => {
  const wrapper = mount(Search, {
    slots: {
      label: () => 'Custom Label',
    },
  });

  expect(wrapper.find('.van-search__label').html()).toMatchSnapshot();
});

test('should render left slot correctly', () => {
  const wrapper = mount(Search, {
    slots: {
      left: () => 'Custom Left Content',
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('should render left icon when using left-icon prop', () => {
  const wrapper = mount(Search, {
    props: {
      leftIcon: 'setting-o',
    },
  });

  expect(wrapper.find('.van-field__left-icon').html()).toMatchSnapshot();
});

test('should render right icon when using right-icon prop', () => {
  const wrapper = mount(Search, {
    props: {
      rightIcon: 'setting-o',
    },
  });

  expect(wrapper.find('.van-field__right-icon').html()).toMatchSnapshot();
});

test('should render right-icon slot correctly', () => {
  const wrapper = mount(Search, {
    slots: {
      'right-icon': () => 'Custom Right Icon',
    },
  });

  expect(wrapper.find('.van-field__right-icon').html()).toMatchSnapshot();
});

test('should render action text when using action-text prop', () => {
  const wrapper = mount(Search, {
    props: {
      actionText: 'Custom Text',
      showAction: true,
    },
  });

  expect(wrapper.find('.van-search__action').html()).toMatchSnapshot();
});
