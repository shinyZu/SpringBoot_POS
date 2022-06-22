package lk.ijse.spring.service.impl;

import lk.ijse.spring.config.WebAppConfig;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Orders;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CustomerService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {WebAppConfig.class})
@ExtendWith({SpringExtension.class})
class CustomerServiceImplTest {

    @Autowired
    CustomerService customerService;

    /*@Autowired
    CustomerRepo customerRepo;*/

    @Test
    void getAllCustomers() {
        List<CustomerDTO> allCustomers = customerService.getAllCustomers();
        for (CustomerDTO cus : allCustomers) {
            System.out.println(cus.toString());
        }
    }

    @Test
    void getLastCustomerID() {
        /*List<Customer> list = customerRepo.findAll(Sort.by(Sort.Direction.DESC, "customerId"));
        System.out.println(list);
        System.out.println(list.get(0).getCustomerId());*/

        String lastCustomerID = customerService.getLastCustomerID();
        System.out.println(lastCustomerID);

    }

    @Test
    void isDuplicateContact() {
        String status = customerService.isDuplicateContact("C00-007", 716455457);
        System.out.println("status : "+status);
    }

    /*@Test
    void updateCustomer() {
        CustomerDTO dto = customerService.updateCustomer(new CustomerDTO("C00-009", "Supuni", "Badulla", 716455459));
        System.out.println(dto);
    }
*/
//    @Test
//    void deleteCustomer() {
//        customerService.deleteCustomer("C00-010");
//        getAllCustomers();
//    }


    @Test
    void getCustomerCount() {
        String customerCount = customerService.getCustomerCount();
        System.out.println(customerCount);
    }

    @Test
    void getIdsAndNames() {
        List<CustomerDTO> idsAndNames = customerService.getIdsAndNames();
        idsAndNames.forEach(c->{
            System.out.println(c.toString());
        });
    }

    @Test
    void saveCustomer() {
        CustomerDTO c1 = new CustomerDTO("C00-001","Kamal","Galle",716455451);
        CustomerDTO c2 = new CustomerDTO("C00-002","Nimal","Panadura",716455452);
        CustomerDTO c3 = new CustomerDTO("C00-003","Bimal","Matara",716455453);
        customerService.saveCustomer(c1);
        customerService.saveCustomer(c2);
        customerService.saveCustomer(c3);
    }

    @Test
    void updateCustomer() {
        CustomerDTO c1 = new CustomerDTO("C00-001","Dasun","Galle",716455451);
        CustomerDTO c2 = new CustomerDTO("C00-002","Kamal","Panadura",716455452);
        CustomerDTO c3 = new CustomerDTO("C00-003","Ramal","Kaluthara",716455453);
        customerService.updateCustomer(c1);
        customerService.updateCustomer(c2);
        customerService.updateCustomer(c3);
    }

    @Test
    void deleteCustomer() {
        customerService.deleteCustomer("C00-003");
    }

    @Test
    void getOrdersByCustomer() {
        List<OrdersDTO> orders = customerService.getOrdersByCustomer("C00-003");
        for (OrdersDTO order : orders) {
            System.out.println(order.getOrderId());
        }
    }
}