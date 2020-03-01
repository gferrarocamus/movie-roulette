import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Empty, Form, Icon, Input, Select, Spin, Tooltip } from 'antd';
import { genres } from '../../data';
import './FilterForm.css';

const { Option } = Select;

const sampleCrew = [
  { name: "Name", id: 1 },
  { name: "Name", id: 2 },
  { name: "Name", id: 3 },
];

const Filter = forwardRef(({ form, onSubmit }, ref) => {
  useImperativeHandle(ref, () => ({
    form,
  }));
  const { getFieldDecorator } = form;
  const [castOptions, setCastOptions] = useState(sampleCrew);
  const [fetchingCast, setFetchingCast] = useState(false);
  const [lastCastPage, setLastCastPage] = useState(0);
  const [crewOptions, setCrewOptions] = useState(sampleCrew);
  const [fetchingCrew, setFetchingCrew] = useState(false);
  const [lastCrewPage, setLastCrewPage] = useState(0);

  const handleCastSearch = (value) => {
    if (value) {
      setFetchingCast(true);
      setLastCastPage(lastCastPage + 1);
      // fetch cast
      setCastOptions(sampleCrew);
      setFetchingCast(false);
    } else {
      setCastOptions(sampleCrew);
    }
  };

  const handleCrewSearch = (value) => {
    if (value) {
      setFetchingCrew(true);
      setLastCrewPage(lastCrewPage + 1);
      // fetch crew
      setCrewOptions(sampleCrew);
      setFetchingCrew(false);
    } else {
      setCrewOptions(sampleCrew);
    }
  };

  return (
    <div className="form-container">
      <Form
        labelCol={{ sm: { span: 4 } }}
        wrapperCol={{ sm: { span: 20 } }}
        layout="horizontal"
        size="small"
      >
        <Form.Item label={(
          <span>
            Cast&nbsp;
            <Tooltip title="Actors credited in the movie">
              <Icon type="question-circle" />
            </Tooltip>
          </span>
        )}
        >
          {getFieldDecorator('cast')(
            <Select
              allowClear
              mode="multiple"
              placeholder="Filter by actor..."
              optionLabelProp="label"
              optionFilterProp="children"
              onSearch={handleCastSearch}
              filterOption={(input, option) => (
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              )}
              notFoundContent={
                fetchingCast ? (
                  <Spin size="small" />
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            >
              {castOptions.map((o) => (
                <Option key={o.id} value={o.id} label={o.name}>{o.name}</Option>
              ))
              }
            </Select>,
          )}
        </Form.Item>
        <Form.Item label={(
          <span>
            Crew&nbsp;
            <Tooltip title="Technical crew credited in the movie">
              <Icon type="question-circle" />
            </Tooltip>
          </span>
        )}
        >
          {getFieldDecorator('crew')(
            <Select
              allowClear
              mode="multiple"
              placeholder="Filter by director, writer, producer..."
              optionLabelProp="label"
              optionFilterProp="children"
              onSearch={handleCrewSearch}
              filterOption={(input, option) => (
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              )}
              notFoundContent={
                fetchingCrew ? (
                  <Spin size="small" />
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            >
              {crewOptions.map((o) => (
                <Option key={o.id} value={o.id} label={o.name}>{o.name}</Option>
              ))
              }
            </Select>,
          )}
        </Form.Item>
        <Form.Item label={<span>Genre</span>}>
          {getFieldDecorator('genre')(
            <Select
              allowClear
              mode="multiple"
              placeholder="Filter by genre..."
              optionLabelProp="label"
              optionFilterProp="children"
              filterOption={(input, option) => (
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              )}
              notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            >
              {genres.map((o) => (
                <Option key={o.id} value={o.id} label={o.name}>{o.name}</Option>
              ))
              }
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Year">
          {getFieldDecorator('year', {
            rules: [
              {
                whitespace: true,
                type: 'number',
                transform: (value) => +value,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Runtime">
          {getFieldDecorator('runtime', {
            rules: [
              {
                whitespace: true,
                type: 'integer',
                min: 0,
                transform: (value) => +value,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Language">
          {getFieldDecorator('language', {
            rules: [
              {
                whitespace: true,
                type: 'integer',
                min: 0,
                transform: (value) => +value,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          wrapperCol={{ sm: { span: 20, offset: 4 } }}
          style={{ textAlign: 'right' }}
        >
          <Button
            shape="round"
            htmlType="submit"
            className="yellow"
          >
            Tell me what to watch
          </Button>
        </Form.Item>
        {/* certification, production company, adult, video, similar to */}
      </Form>
    </div>
  );
});

Filter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    getFieldValue: PropTypes.func,
  }).isRequired,
};

Filter.defaultProps = {};

export default Form.create()(Filter);
