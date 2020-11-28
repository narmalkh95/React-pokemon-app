import {message} from "antd";

export const showMessage = (type, content, duration = 3) => {
    message[type](content, duration)
};

export const messageType = {
    success: 'success',
    error: 'error',
    info: 'info',
    warning: 'warning',
    warn: 'warn',
    loading: 'loading'
};

export const defaultErrorMsg = 'Something went wrong...';

export const handleBottomScroll = (func) => {
    const scrollTop = (document.documentElement
        && document.documentElement.scrollTop)
        || document.body.scrollTop;
    const scrollHeight = (document.documentElement
        && document.documentElement.scrollHeight)
        || document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 50 >= scrollHeight){
        func();
    }
};