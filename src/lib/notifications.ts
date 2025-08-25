import { toast, ToastOptions } from "react-toastify";

// Default toast configuration
const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  toastId: "unique-toast", // Add a toastId to prevent duplicates
};

export const notifySuccess = (msg: string) => {
  setTimeout(() => {
    toast.success(msg, {
      ...toastConfig,
      toastId: `success-${msg}`, // Create unique ID based on message
    });
  }, 0);
};

export const notifyError = (msg: string) => {
  setTimeout(() => {
    toast.error(msg, {
      ...toastConfig,
      toastId: `error-${msg}`, // Create unique ID based on message
    });
  }, 0);
};

export const notifyInfo = (msg: string) => {
  setTimeout(() => {
    toast.info(msg, {
      ...toastConfig,
      toastId: `info-${msg}`, // Create unique ID based on message
    });
  }, 0);
};