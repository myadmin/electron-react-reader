import React from 'react';
import MyScrollBox from '@components/MyScrollBox';
import * as UseTemplateList from './UseTemplate';
import './index.less';

const ResumeContent = () => {
  const HEADER_ACTION_HEIGHT = 92;
  const height = document.body.clientHeight;

  return (
    <MyScrollBox maxHeight={height - HEADER_ACTION_HEIGHT}>
      <UseTemplateList.TemplateOne />
    </MyScrollBox>
  )
}

export default ResumeContent;