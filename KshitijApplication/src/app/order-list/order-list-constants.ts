export const environment = {
    baseUrl: 'http://localhost:9000/',
}

export const Constant_API = {

    //COMMUNICATION LOG
    CREATE_LOG_DTO: 'createCommunicationLogByDto',
    CREATE_LOG_DTO_WITH_PARENT: 'createCommunicationLogByDtoWithParent',
    LIST_ALL_LOG_BY_ORDER_ID_BETWEEN: 'listAllLogByOrderIdBetween',
    LIST_ALL_LOG_BY_ORDER_ID: 'listAllLogByOrderId',
    LIST_ALL_LOGS_ON_DATE: 'listAllLogsOnDate',
    LIST_ALL_LOGS: 'communicationLog/getAllLogs',



    //CUSTOMER
    LIST_NEW_CUSTOMER_NOT_IN_TALLY: 'customer/ListNewCustomerListNotinTally',
    CHANGE_TALLY_PUSHED_CUSTOMER_STATUS: 'customer/changeTallyPushedStatus',
    CREATE_CUSTOMER: 'customer/create',
    LIST_ALL_CUSTOMERS: 'customer/getAllCustomers',
    LIST_ALL_CUSTOMER_LIST_ONLY: 'customer/getAllCustomersOnly',
    GET_BY_CUSTOMER_ID: 'customer/getByCustomerId',
    GET_BY_CUSTOMER_ID_PK: 'customer/getById',
    UPDATE_CUSTOMER: 'customer/update',

    //ORDER
    CREATE_ORDER: 'Order/createOrder',
    GET_ORDER_ENTITY_BY_ID: 'Order/getOrderEntityById',
    GET_ORDER_RESPONSE_BY_ID: 'Order/getOrderResponseById',
    GET_ORDER_RESPONSE_WITH_LOG_BY_ID: 'Order/getOrderResponseWithLogById',
    LIST_ALL_ORDER_ENTITY: 'Order/listAllOrderEntity',
    LIST_ALL_ORDER_RESPONSE: 'Order/listAllOrderResponse',
    SET_ORDER_PRODUCT_STATUS: 'Order/setOrderProductStatus',

    LIST_ALL_CUSTOMER_CATEGORIES: 'getAllUserCategory',
    LIST_ALL_ORDERS_BETWEEN_DATE_RANGE: 'Order/listAllOrdersBetweenDateRange',
    LIST_ALL_ORDERS_OF_CUSTOMER: 'Order/listAllOrdersOfCustomer',
    LIST_ALL_ORDERS_OF_PRIORITY: 'Order/listAllOrdersOfPriority',
    LIST_ALL_ORDERS_ON_RANGE: 'Order/listAllOrdersOnRange',
    LIST_NEW_ORDERS_NOT_IN_TALLY: 'Order/listNewOrdersListNotInTally',
    UPDATE_ORDER: 'Order/updateOrder',
    CHANGE_TALLY_PUSHED_ORDER_STATUS: 'Order/changeTallyPushedStatus',
    SINGLE_XML_DOWNLOAD: 'tally/createSingleVoucher',
    MULTIPLE_XML_DOWNLOAD: 'tally/createMultipleVouchers',

    LIST_ORDERS_OF_SALES_ID: 'Order/getOrderByCustomerId',
    LIST_ORDERPRODUCTS_OF_MANUFACTURING: 'Order/getOrderByCategoryType',
    LIST_ALL_ORDERPRODUCTS_NOT_COMPLETED: 'Order/listAllOrderProductsNotCompleted',
    LIST_ALL_ORDERPRODUCTS_NOT_COMPLETED_AND_BY_CATEGORY: 'Order/listAllOrdersNotCompletedByCategoryType',
    LIST_ALL_ORDERPRODUCTS_BY_STATUS_AND_BY_CATEGORY: 'Order/listAllOrdersByStatusAndByCategoryType',
    LIST_ALL_STATUS: 'Order/getAllStatus',


    //PRODUCTS
    CREATE_OR_UPDATE_PRODUCT: 'product/create',
    LIST_ALL_PRODUCTS: 'product/getAllProducts',
    GET_PRODUCT_BY_ID: 'product/getById',
    LIST_PRODUCTS_BY_CATEGORY: 'product/listAllProductsByCategory'

};