import React, { useEffect, useState } from 'react';
import MyScrollBox from '@components/MyScrollBox';
import Messager, { MESSAGE_EVENT_NAME_MAPS } from '@common/messager';
import { RESUME_TOOLBAR_MAPS } from '@common/constants/resume';
import * as UseTemplateList from './UseTemplate';
import PersonalForm from './UseForm/Personal';
import EducationForm from './UseForm/Education';
import './index.less';

const ResumeContent = () => {
    const HEADER_ACTION_HEIGHT = 92;
    const height = document.body.clientHeight;

    const [formName, setFormName] = useState('');
    const [showFormModal, setShowFormModal] = useState(false);

    const onReceive = (e: Record<string, any>) => {
        Messager.receive(e, (data: Record<string, any>) => {
            console.log(`发布订阅，传值为：`, data);
            setShowFormModal(true);
            setFormName(data?.form_name);
        });
    }

    useEffect(() => {
        document.addEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
        return () => {
            document.removeEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
        }
    }, []);

    const onClose = () => {
        setShowFormModal(false);
        setFormName('');
    };

    return (
        <MyScrollBox maxHeight={height - HEADER_ACTION_HEIGHT}>
            <UseTemplateList.TemplateOne />
            {showFormModal && (
                <>
                    {formName === RESUME_TOOLBAR_MAPS.personal && <PersonalForm onClose={onClose} />}
                    {formName === RESUME_TOOLBAR_MAPS.education && <EducationForm onClose={onClose} />}
                </>
            )}
        </MyScrollBox>
    )
}

export default ResumeContent;