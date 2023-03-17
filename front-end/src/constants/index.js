// import 'dotenv/config';

// const { REACT_APP_BASE_URL, REACT_APP_LOGIN_URL } = process.env;

// Error messages
export const ERROR_INVALID_TOKEN = 'Invalid token';

// HTTP Status
export const HTTP_OK = 200;
export const HTTP_CREATED = 201;
export const HTTP_DELETED = 204;
export const HTTP_UPDATED = 201;

// Numbers
export const NUM_PASSWORD_MIN_LENGTH = 5;
export const NUM_TENTH_CARD = 10;

// localStorage Keys
export const LS_KEY_USER = 'user';
export const LS_KEY_CART = 'cart';

// Paths
export const PATH_ADMIN = 'admin';
export const PATH_CHECKOUT = 'checkout';
export const PATH_CUSTOMER = 'customer';
export const PATH_LOGIN = 'login';
export const PATH_MANAGE = 'manage';
// export const PATH_LOGIN = REACT_APP_LOGIN_URL;
export const PATH_ORDERS = 'orders';
export const PATH_PRODUCTS = 'products';
export const PATH_REGISTER = 'register';
export const PATH_SELLER = 'seller';
export const PATH_SALES = 'sales';

// regEx
export const REGEX_EMAIL = /\S+@\S+\.\S+/;

// Roles
export const ROLE_ADMIN = 'administrator';
export const ROLE_CUSTOMER = 'customer';
export const ROLE_SELLER = 'seller';

// Delivery Status
export const DELIVERY_PENDING = 'Pendente';
export const DELIVERY_PREPARING = 'Preparando';
export const DELIVERY_IN_TRANSIT = 'Em Trânsito';
export const DELIVERY_DELIVERED = 'Entregue';

// URLs
// export const URL_BASE = REACT_APP_BASE_URL;
export const URL_BASE = 'http://localhost:3001';

// Data-testids
// PREFIXES
export const COMMON_LOGIN = 'common_login__';
export const COMMON_REGISTER = 'common_register__';

export const CUSTOMER_PRODUCTS = 'customer_products__';
export const CUSTOMER_CHECKOUT = 'customer_checkout__';
export const CUSTOMER_ORDERS = 'customer_orders__';
export const CUSTOMER_ORDER_DETAILS = 'customer_order_details__';

export const SELLER_ORDERS = 'seller_orders__';
export const SELLER_ORDER_DETAILS = 'seller_order_details__';

export const ADMIN_MANAGE = 'admin_manage__';

// SUFFIXES
export const INPUT_EMAIL = 'input-email';
export const INPUT_PASSWORD = 'input-password';
export const INPUT_NAME = 'input-name';

export const BUTTON_LOGIN = 'button-login';
export const BUTTON_REGISTER = 'button-register';

export const ELM_INVALID_EMAIL = 'element-invalid-email';
export const ELM_INVALID_REGISTER = 'element-invalid_register';
export const ELM_NAV_PRODUCTS = 'element-navbar-link-products';
export const ELM_NAV_ORDERS = 'element-navbar-link-orders';
export const ELM_NAV_USERNAME = 'element-navbar-user-full-name';
export const ELM_NAV_LOGOUT = 'element-navbar-link-logout';
export const ELM_CARD_TITLE = 'element-card-title';
export const ELM_CARD_PRICE = 'element-card-price';
export const ELM_CARD_ADDRESS = 'element-card-address';

export const IMG_CARD = 'img-card-bg-image';
export const BUTTON_ADD_ITEM = 'button-card-add-item';
export const BUTTON_RM_ITEM = 'button-card-rm-item';
export const INPUT_CARD_QUANTITY = 'input-card-quantity';
export const BUTTON_CART = 'button-cart';

export const CHECKOUT_BOTTOM_VALUE = 'checkout-bottom-value';
export const ELM_TABLE_NUMBER = 'element-order-table-item-number';
export const ELM_TABLE_NAME = 'element-order-table-name';
export const ELM_TABLE_QUANTITY = 'element-order-table-quantity';
export const ELM_TABLE_UNIT_PRICE = 'element-order-table-unit-price';
export const ELM_TABLE_SUBTOTAL = 'element-order-table-sub-total';
export const ELM_TABLE_REMOVE = 'element-order-table-remove';
export const ELM_TABLE_TOTAL_PRICE = 'element-order-total-price';

export const SELECT_SELLER = 'select-seller';
export const INPUT_ADDRESS = 'input-address';
export const INPUT_ADDRESS_NUMBER = 'input-address-number';
export const BUTTON_SUBMIT_ORDER = 'button-submit-order';

export const ELM_ORDER_ID = 'element-order-id';
export const ELM_DELIVERY_STATUS = 'element-delivery-status';
export const ELM_ORDER_DATE = 'element-order-date';
export const ELM_DETAILS_ORDER_ID = 'element-order-details-label-order-id';
export const ELM_DETAILS_SELLER_NAME = 'element-order-details-label-seller-name';
export const ELM_DETAILS_ORDER_DATE = 'element-order-details-label-order-date';
export const ELM_DETAILS_DELIVERY_STATUS = 'element-order-details-label-delivery-status';

export const BUTTON_DELIVERY_CHECK = 'button-delivery-check';
export const BUTTON_PREPARING_CHECK = 'button-preparing-check';
export const BUTTON_DISPATCH_CHECK = 'button-dispatch-check';

export const SELECT_ROLE = 'select-role';

export const ELM_USER_NUMBER = 'element-user-table-item-number';
export const ELM_USER_NAME = 'element-user-table-name';
export const ELM_USER_EMAIL = 'element-user-table-email';
export const ELM_USER_ROLE = 'element-user-table-role';
export const ELM_USER_REMOVE = 'element-user-table-remove';
