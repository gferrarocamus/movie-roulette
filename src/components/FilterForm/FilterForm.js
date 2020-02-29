import React, { forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import { Modal, Input, Checkbox } from 'antd';
import Form from 'antd/lib/form/Form';

const Filter = forwardRef(({ title, visible, form, onCancel, onSubmit }, ref) => {
  useImperativeHandle(ref, () => ({
    form,
  }));
  const { getFieldDecorator, getFieldValue } = form;
  return (
    <Modal
      visible={visible}
      title={title}
      okText="Filter"
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                whitespace: true,
                max: 100,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Last Name">
          {getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                whitespace: true,
                max: 100,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Code">
          {getFieldDecorator('code', {
            rules: [
              {
                required: true,
                whitespace: true,
                max: 100,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="XYZ">
          {getFieldDecorator('xyz', {
            rules: [{}],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="File">
          {getFieldDecorator('file', {
            initialValue: getFieldValue('name'),
          })(<Input />)}
        </Form.Item>
        {getFieldDecorator('checkbox-group', {
          initialValue: ['popular'],
        })(
          <Checkbox.Group>
            <Form.Item label="Populat">
              <Checkbox value="popular" checked />
            </Form.Item>
            <Form.Item label="Trending">
              <Checkbox value="trending" />
            </Form.Item>
          </Checkbox.Group>,
        )}
        <Form.Item label="Budget">
          {getFieldDecorator('budget', {
            rules: [
              {
                required: true,
                whitespace: true,
                type: 'number',
                transform: (value) => +value,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Number">
          {getFieldDecorator('number', {
            rules: [
              {
                required: true,
                whitespace: true,
                type: 'integer',
                min: 0,
                transform: (value) => +value,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Comment">
          {getFieldDecorator('comment')(
            <Input.TextArea autoSize={{ minRows: 2 }} />,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
});

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    getFieldValue: PropTypes.func,
  }).isRequired,
};

Filter.defaultProps = {};

export default Form.create()(Filter);
