
export const ERR_CONNECTION_FAILED = "CONNECTION_FAILED";
export const ERR_CONNECTION_FAILED_HANDLED = "CONNECTION_FAILED_HANDLED";
export const clearConnectionError = () => {
    return {
        type: ERR_CONNECTION_FAILED_HANDLED
    }
};
