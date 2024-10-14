// utils/ToastUtil.jsx
import store from '../Redux/store';  // Import your Redux store
import { showNotification, hideNotification } from '../Redux/Slices/NotificationSlices/NotificationSlice';

// Helper for success notifications
export const toastAlert = (text) => {
    store.dispatch(showNotification({ message: text, type: 'success' }));
    setTimeout(() => {
        store.dispatch(hideNotification());
    }, 100); // Reset after 1500 ms
};

// Helper for error notifications
export const toastError = (text) => {
    store.dispatch(showNotification({ message: text, type: 'error' }));
    setTimeout(() => {
        store.dispatch(hideNotification());
    }, 100); // Reset after 1500 ms
};
