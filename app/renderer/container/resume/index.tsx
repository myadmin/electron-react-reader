import React from 'react';
import MyScrollBox from '@components/MyScrollBox';

const Resume = () => {
  const HEADER_HEIGHT = 60;
  const height = document.body.clientHeight;

  return (
    <div styleName='container'>
      <MyScrollBox maxHeight={height - HEADER_HEIGHT}>
        <Template.TemplateOne />
      </MyScrollBox>
    </div>
  )
}

export default Resume;