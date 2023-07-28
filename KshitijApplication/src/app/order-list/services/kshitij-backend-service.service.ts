import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant_API, environment } from '../order-list-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KshitijBackendServiceService {


  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private http: HttpClient) { }

  //products
  createOrUpdateProduct(payload: any) {
    return this.http.post(`${environment.baseUrl}${Constant_API.CREATE_OR_UPDATE_PRODUCT}`, payload);
  }

  listAllProducts() {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_PRODUCTS}`);
  }

  listAllProductsById(id: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.GET_PRODUCT_BY_ID}${'?id='}${id}`);
  }

  listAllProductsByCategory(category: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_PRODUCTS}${'?categoryType='}${category}`);
  }


  //communication log
  createLogDto(payload: any) {
    return this.http.post(`${environment.baseUrl}${Constant_API.CREATE_LOG_DTO}`, payload);
  }
  createLogDtoWithParent(payload: any) {
    return this.http.post(`${environment.baseUrl}${Constant_API.CREATE_LOG_DTO_WITH_PARENT}`, payload);
  }
  listAllLogs() {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_LOGS}`);
  }
  listAllLogsByOrderId(orderId: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_LOG_BY_ORDER_ID}${'?orderId='}${orderId}`);
  }
  getLogDtoBetween(startDate: any, endDate: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_LOG_BY_ORDER_ID_BETWEEN}${'?startDate='}${startDate}${'&endDate='}${endDate}`);
  }
  getLogDtoonDate(date: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_LOGS_ON_DATE}${'?date='}${date}`);
  }



  //customer
  createCustomer(payload: any) {
    return this.http.post(`${environment.baseUrl}${Constant_API.CREATE_CUSTOMER}`, payload);
  }
  updateCustomer(payload: any) {
    return this.http.put(`${environment.baseUrl}${Constant_API.UPDATE_CUSTOMER}`, payload);
  }
  getCustomerById(id: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.GET_BY_CUSTOMER_ID}${'?id='}${id}`);
  }
  getCustomerByIdPk(id: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.GET_BY_CUSTOMER_ID_PK}${'?id='}${id}`);
  }
  listAllCustomers() {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_CUSTOMERS}`);
  }
  listAllCustomersNotinTally() {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_NEW_CUSTOMER_NOT_IN_TALLY}`);
  }
  listAllCustomersOnly() {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_CUSTOMER_LIST_ONLY}`);
  }
  changeCustomerTallyStatus(id: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.CHANGE_TALLY_PUSHED_CUSTOMER_STATUS}${'?id='}${id}`);
  }



  //order
  createOrder(payload: any) {
    return this.http.post(`${environment.baseUrl}${Constant_API.CREATE_ORDER}`, payload);
  }
  changeOrderProductStatus(orderId: any, status: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.SET_ORDER_PRODUCT_STATUS}${'?orderId='}${orderId}${'&status='}${status}`);
  }

  updateOrder(payload: any) {
    return this.http.post(`${environment.baseUrl}${Constant_API.UPDATE_ORDER}`, payload);
  }

  getOrderEntityById(id: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.GET_ORDER_ENTITY_BY_ID}${'?id='}${id}`);
  }
  getOrderResponseById(id: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.GET_ORDER_RESPONSE_BY_ID}${'?id='}${id}`);
  }
  getOrderResponseByIdWithLogs(id: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.GET_ORDER_RESPONSE_WITH_LOG_BY_ID}${'?id='}${id}`);
  }
  listAllOrdersResponse() {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_ORDER_RESPONSE}`);
  }

  listOrderOfSalesUser(username: String) {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ORDERS_OF_SALES_ID}${'?customerId='}${username}`);
  }

  listOrderProductsOfManufacturingCategory(categoryType: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ORDERPRODUCTS_OF_MANUFACTURING}${'?categoryType='}${categoryType}`);
  }
  listOrderProductsNotCompleted() {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_ORDERPRODUCTS_NOT_COMPLETED}`);
  }
  listOrderProductsNotCompletedAndByCategoryType(categoryType: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_ORDERPRODUCTS_NOT_COMPLETED_AND_BY_CATEGORY}${'?categoryType='}${categoryType}`);
  }
  listOrderProductsByStatusAndCategoryType(status: any, categoryType: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_ORDERPRODUCTS_NOT_COMPLETED}${'status='}${status}${'&categoryType='}${categoryType}`);
  }
  listAllStatus() {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_STATUS}`);
  }

  listAllUserCatgeories() {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_CUSTOMER_CATEGORIES}`);
  }

  listAllOrdersEntity() {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_ORDER_ENTITY}`);
  }
  listAllOrdersofCustomer(customerId: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_ORDERS_OF_CUSTOMER}${'?id='}${customerId}`);
  }
  listAllOrdersOfPriority(priority: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_ORDERS_OF_PRIORITY}${'?priority='}${priority}`);
  }
  listAllOrdersNotInTally() {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_NEW_ORDERS_NOT_IN_TALLY}`);
  }
  listAllOrdersOnDate(date: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_ORDERS_ON_RANGE}${'?date='}${date}`);
  }
  listAllOrdersBetween(startDate: any, endDate: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.LIST_ALL_ORDERS_BETWEEN_DATE_RANGE}${'?startDate='}${startDate}${'&endDate='}${endDate}`);
  }
  changeOrderTallyStatus(id: any) {
    return this.http.get(`${environment.baseUrl}${Constant_API.CHANGE_TALLY_PUSHED_ORDER_STATUS}${'?id='}${id}`);
  }



  downloadFile1(): Observable<any> {
    const id: any[] = [];
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${environment.baseUrl}${Constant_API.MULTIPLE_XML_DOWNLOAD}`, id, {
      headers: headers,
      responseType: 'blob',
      observe: 'response'
    });
  }


  downloadSingleVoucher(id: any): Observable<any> {
    const id2: any[] = [];
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${environment.baseUrl}${Constant_API.SINGLE_XML_DOWNLOAD}${'?Id='}${id}`, id2, {
      headers: headers,
      responseType: 'blob',
      observe: 'response'
    });
  }

  downloadFile2(): Observable<any> {
    const id: any[] = [];
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:9000/tally/createVouchers1', id, {
      headers: headers,
      responseType: 'blob',
      observe: 'response'
    });
  }


}