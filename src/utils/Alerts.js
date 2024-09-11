import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

export const ToastModal = (
    title = 'Success',
    textBody = 'Congrats! this is toast notification success',
    type = 'SUCCESS'
) => {
    Toast.show({
        type: ALERT_TYPE[type],
        title: title,
        textBody: textBody,
    })
}

export const DialogModal = (
    title = 'Success',
    textBody = 'Congrats! this is toast notification success',
    type = 'SUCCESS'
) => {
    Dialog.show({
        type: ALERT_TYPE[type],
        title: title,
        textBody: textBody,
    })
}