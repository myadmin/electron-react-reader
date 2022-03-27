import React from 'react';
import { useHistory } from 'react-router';
import ROUTER from '@common/constants/router';
import MyButton from '@components/MyButton';
import './index.less';

const ResumeAction = () => {
  const history = useHistory();
  // 返回首页
  const onBack = () => history.push(ROUTER.root);
  // 导出PDF
  const onExport = () => { };

  return (
    <div styleName='actions'>
      <div styleName='back' onClick={onBack}>返回</div>
      <MyButton size='middle' className='export-btn' onClick={onExport}>导出PDF</MyButton>
    </div>
  )
}

export default ResumeAction;