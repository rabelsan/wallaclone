import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import { Select } from 'antd';
import { withNamespaces } from 'react-i18next';
import {getTags} from '../../store/selectors';
import {loadTags} from '../../store/actions';

const { Option } = Select;
function TagsSelect ({findTags, onChange, list, defaultValue, t}) {
  
  useEffect( 
    () => { findTags(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []
  );

  return (
    <Select
      allowClear
      disabled={!list}
      mode="multiple"
      placeholder={t("Select tags")}
      defaultValue={defaultValue}
      onChange={onChange}
      style={{ width: '100%' }}
    >
      {list && list.map(tag => <Option key={tag}>{tag}</Option>)}
    </Select>
  );
}

TagsSelect.propTypes = {
  onChange: T.func.isRequired,
  list: T.arrayOf(T.string).isRequired,
  value: T.arrayOf(T.string),
  tagsList: T.arrayOf(T.string),
};

export default connect(getTags, dispatch => ({
  findTags: () => dispatch(loadTags()),
}))(withNamespaces()(TagsSelect));

