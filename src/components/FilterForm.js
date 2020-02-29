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
      <Form layout="vertical"></Form>
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
