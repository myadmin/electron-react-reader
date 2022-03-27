import React from 'react';
import fileAction from '@common/utils/file';
import { getAppPath } from '@common/utils/appPath';

const Resume = () => {
  getAppPath().then((rootPath: string) => {
    console.log(`应用程序的目录为：${rootPath}`);
    console.log('文件读取，内容数据为：', __dirname);
    fileAction.read(`${rootPath}app/renderer/container/resume/index.tsx`).then((data) => {
      console.log(data);
    });
  });

  return (
    <div>Resume</div>
  )
}

export default Resume;