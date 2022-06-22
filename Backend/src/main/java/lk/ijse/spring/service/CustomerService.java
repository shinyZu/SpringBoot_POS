package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.entity.Orders;

import java.util.List;

public interface CustomerService {
    List<CustomerDTO> getAllCustomers();

    CustomerDTO searchCustomer(String id);

    CustomerDTO searchCustomerByName(String name);

    String getLastCustomerID();

    String getCustomerCount();

    String isDuplicateContact(String id, int contact);

    List<CustomerDTO> getIdsAndNames();

    CustomerDTO saveCustomer(CustomerDTO dto);

    CustomerDTO updateCustomer(CustomerDTO dto);

    void deleteCustomer(String id);

    List<OrdersDTO> getOrdersByCustomer(String id);
}
