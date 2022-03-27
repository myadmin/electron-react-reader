/**
 * @desc 头像
 * @author pengdaokuan
 */
import React from 'react';
import AvatarImage from '@assets/avatar.jpeg';
import './index.less';

const Avatar = () => {
  return (
    <div styleName="box">
      <div styleName="avatar">
        <img src={AvatarImage} />
      </div>
    </div>
  );
}

export default Avatar;