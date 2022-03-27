import React from 'react';
import ResumeAction from './ResumeAction';
import ResumeContent from './ResumeContent';
import ResumeToolbar from './ResumeToolbar';
import './index.less';

const Resume = () => {
  return (
    <div styleName='container'>
      <div styleName='header'><ResumeAction /></div>
      <div styleName='content'><ResumeContent /></div>
      <div styleName='toolbar'><ResumeToolbar /></div>
    </div>
  )
}

export default Resume;