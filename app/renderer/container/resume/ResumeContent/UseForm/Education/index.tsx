import React from 'react';
import { useSelector } from 'react-redux';
import MyModal from '@components/MyModal';
import MyInput from '@components/MyInput';
import './index.less';

interface IProps {
    onClose: () => void;
}

const Education = ({ onClose }: IProps) => {
    const base: TSResume.Base = useSelector((state: Record<string, any>) => state?.resumeModel?.base);

    return (
        <MyModal.Dialog title='教育信息' showFooter={false} config={{ cancelBtn: { callback: onClose } }}>
            <div styleName='form'>
                <div styleName='flex'>
                    <div styleName="left">
                        <span styleName="require">*</span>学 校 ：
                    </div>
                    <div styleName="right">
                        <MyInput onChange={(e) => { }} value={base?.school || ''} placeholder="请输入贵校" allowClear={true} />
                    </div>
                </div>
                <div styleName="flex">
                    <div styleName="left">
                        <span styleName="require">*</span>专 业 ：
                    </div>
                    <div styleName="right">
                        <MyInput onChange={(e) => { }} value={base?.major || ''} placeholder="请输入专业" allowClear={true} />
                    </div>
                </div>
                <div styleName="flex">
                    <div styleName="left">
                        <span styleName="require">*</span>学 位 ：
                    </div>
                    <div styleName="right">
                        <MyInput
                            onChange={(e) => { }}
                            value={base?.degree || ''}
                            placeholder="学士？硕士？博士？"
                            allowClear={true}
                        />
                    </div>
                </div>
                <div styleName="flex">
                    <div styleName="left">
                        <span styleName="require">*</span>学 年 ：
                    </div>
                    <div styleName="right">
                        <MyInput
                            onChange={(e) => {
                                const nextTime = {
                                    ...base?.onSchoolTime,
                                    beginTime: e.target.value,
                                };
                            }}
                            value={base?.onSchoolTime?.beginTime || ''}
                            placeholder="2015.09.01"
                            allowClear={true}
                            style={{ width: 300 }}
                        />
                        <span styleName="line">-</span>
                        <MyInput
                            onChange={(e) => {
                                const nextTime = {
                                    ...base?.onSchoolTime,
                                    endTime: e.target.value,
                                };
                            }}
                            value={base?.onSchoolTime?.endTime || ''}
                            placeholder="2015.06.30"
                            style={{ width: 300 }}
                            allowClear={true}
                        />
                    </div>
                </div>
            </div>
        </MyModal.Dialog>
    )
}

export default Education;