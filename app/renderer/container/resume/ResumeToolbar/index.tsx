import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MyScrollBox from '@components/MyScrollBox';
import RESUME_TOOLBAR_LIST from '@common/constants/resume';
import Messager, { MESSAGE_EVENT_NAME_MAPS } from '@common/messager';
import { onAddToolbar, onDeleteToolbar } from './utils';
import './index.less';

const ResumeToolbar = () => {
    const dispatch = useDispatch();
    const height = document.body.clientHeight;

    // 定义已添加模块与未添加模块
    const [addToolbarList, setAddToolbarList] = useState<TSResume.SliderItem[]>([]);
    const [unAddToolbarList, setUnAddToolbarList] = useState<TSResume.SliderItem[]>([]);

    const changeResumeToolbarKeys = useCallback((moduleKeys: string[]) => {
        if (moduleKeys.length > 0) {
            dispatch({
                type: 'templateModel/setStore',
                payload: {
                    key: 'resumeToolbarKeys',
                    values: moduleKeys,
                },
            });
        }
    }, []);

    useEffect(() => {
        if (RESUME_TOOLBAR_LIST.length > 0) {
            let _addToolbarList: TSResume.SliderItem[] = [];
            let _unAddToolbarList: TSResume.SliderItem[] = [];
            RESUME_TOOLBAR_LIST.forEach((s: TSResume.SliderItem) => {
                if (s.require) _addToolbarList.push(s);
                if (!s.require) _unAddToolbarList.push(s);
            });
            changeResumeToolbarKeys(_addToolbarList.map((s) => s.key));
            setAddToolbarList(_addToolbarList);
            setUnAddToolbarList(_unAddToolbarList);
        }
    }, []);

    // 点击添加模块
    const onAddSliderAction = useCallback((moduleToolbar: TSResume.SliderItem) => {
        console.log('moduleToolbar', moduleToolbar);
        const nextAddSliderList = onAddToolbar(addToolbarList, moduleToolbar);
        console.log('nextAddSliderList', nextAddSliderList);
        // setAddToolbarList(nextAddSliderList);
        // const nextUnAddSliderList = onDeleteToolbar(unAddToolbarList, moduleToolbar);
        // setUnAddToolbarList(nextUnAddSliderList);
        // changeResumeToolbarKeys(nextAddSliderList.map((s) => s.key));
    }, []);

    // 点击删除模块
    const onDeleteSliderAction = useCallback((moduleSlider: TSResume.SliderItem) => {
        const nextAddSliderList = onDeleteToolbar(addToolbarList, moduleSlider);
        setAddToolbarList(nextAddSliderList);
        const nextUnAddSliderList = onAddToolbar(unAddToolbarList, moduleSlider);
        setUnAddToolbarList(nextUnAddSliderList);
        changeResumeToolbarKeys(nextAddSliderList.map((s) => s.key));
    }, []);

    return (
        <div styleName='slider'>
            <MyScrollBox maxHeight={height - 180}>
                {!!addToolbarList.length && (
                    <div styleName='module'>
                        <div styleName="title">
                            <span styleName="line" />
                            已添加模块
                        </div>
                        <div styleName='content'>
                            {addToolbarList.map((toolbar: TSResume.SliderItem) => {
                                return (
                                    <div styleName='box' key={toolbar.key} onClick={() => {
                                        Messager.send(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, {
                                            form_name: toolbar.key
                                        });
                                    }}>
                                        <div styleName='info'>
                                            <i styleName='icon' />
                                            <div styleName='text'>
                                                <div styleName='name'>{toolbar.name}</div>
                                                <div styleName='summary'>{toolbar.summary}</div>
                                            </div>
                                            {toolbar.require && <div styleName="tips">必选项</div>}
                                            {!toolbar.require && (
                                                <div styleName='action'>
                                                    <i styleName='edit' onClick={(e: React.MouseEvent) => { }} />
                                                    <i styleName='delete' onClick={(e: React.MouseEvent) => {
                                                        e.stopPropagation && e.stopPropagation();
                                                        onDeleteSliderAction(toolbar);
                                                    }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
                {!!unAddToolbarList.length && (
                    <div styleName='module'>
                        <div styleName="title un-first">
                            <span styleName="line" />
                            未添加模块
                        </div>
                        <div styleName='content'>
                            {unAddToolbarList.map((toolbar: TSResume.SliderItem) => {
                                return (
                                    <div styleName='box' key={toolbar.key} onClick={() => onAddSliderAction(toolbar)}>
                                        <div styleName='info'>
                                            <i styleName='icon' />
                                            <div styleName='text'>
                                                <div styleName='name'>{toolbar.name}</div>
                                                <div styleName='summary'>{toolbar.summary}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </MyScrollBox>
        </div>
    )
}

export default ResumeToolbar;