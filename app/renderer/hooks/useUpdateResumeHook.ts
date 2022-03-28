import { useSelector, useDispatch } from 'react-redux';

/**
 * @description 修改个人信息(base)
 */
const useUpdatePersonalHook = () => {
    const dispatch = useDispatch();
    const base: TSResume.Base = useSelector((state: Record<string, any>) => state?.resumeModel?.base);

    return <T>(stateKey: string, stateValue: T) => {
        dispatch({
            type: 'resumeModel/setStore',
            payload: {
                key: 'base',
                values: {
                    ...base,
                    [stateKey]: stateValue
                }
            }
        });
    };
};

/**
 * @description 更新简历信息，修改redux简历新的唯一方法
 * @param {string[]} stateKey 关键key
 * @param {string} stateValue
 */
const useUpdateResumeHook = () => {
    const updatePersonalHook = useUpdatePersonalHook();

    return <T>(stateKey: string, stateValue: T) => {
        const keys = stateKey.split('/') || [];
        if (keys[0] && keys[0] === 'base') {
            updatePersonalHook(keys[1], stateValue);
        }
    };
};

export default useUpdateResumeHook;