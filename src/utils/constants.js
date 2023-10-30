export const HOST=process.env.SERVER_URL;

export const API_URL=`${HOST}/api`;

export const AUTH_ROUTES=`${API_URL}/auth`;
export const LOGIN_ROUTE=`${AUTH_ROUTES}/login`;
export const VERIFY_AUTH_ROUTE=`${AUTH_ROUTES}/verify`;
export const SET_USER_INFO=`${AUTH_ROUTES}/set-user-info`;
export const SIGNUP_ROUTE=`${AUTH_ROUTES}/add-teller`;
export const GET_USERS_ROUTE=`${AUTH_ROUTES}/get-users`;
export const UPDATE_USERS_ROUTE=`${AUTH_ROUTES}/update`;
export const DELETE_USERS_ROUTE=`${AUTH_ROUTES}/delete`;
export const CHANGE_PASSWORD_ROUTE=`${AUTH_ROUTES}/change-password`;




export const SALES_ROUTES=`${API_URL}/sales`;
export const SUBMIT_SALE_ROUTE=`${SALES_ROUTES}/submit-sale`;
export const GET_GOODS_ROUTE=`${SALES_ROUTES}/get-goods`;
export const GET_SALES_ROUTE=`${SALES_ROUTES}/get-sales`;
export const SALES_FILTER_ROUTE=`${SALES_ROUTES}/filter`;
export const MAKE_PAYMENT_ROUTE=`${SALES_ROUTES}/pay`;
export const GET_ITEMS_ROUTE=`${SALES_ROUTES}/get-items`;
export const ITEMS_FILTER_ROUTE=`${SALES_ROUTES}/items-filter`;
export const DELETE_SALE_ROUTE=`${SALES_ROUTES}/delete`;



export const GOODS_ROUTES=`${API_URL}/goods`;
export const ADD_GOODS_ROUTE=`${GOODS_ROUTES}/add-goods`;
export const ADD_CATEGORY_ROUTE=`${GOODS_ROUTES}/add-category`;
export const GET_CATEGORY_ROUTE=`${GOODS_ROUTES}/get-category`;
export const UPDATE_GOODS_ROUTE=`${GOODS_ROUTES}/update`;
export const DELETE_GOODS_ROUTE=`${GOODS_ROUTES}/delete`;

