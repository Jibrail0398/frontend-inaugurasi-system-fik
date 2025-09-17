/**
 * User login
 * @param {{nim: string, password: string}} credentials
 * @param {boolean} remember
 * @returns {Promise<boolean>}
 */
export const login = ({ nim, password }, remember) => {
    return true;
};

/**
 * User logout
 * @returns {Promise<boolean>}
 */
export const logout = () => {
    return true;
};
