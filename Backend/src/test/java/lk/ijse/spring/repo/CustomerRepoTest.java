package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Customer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class CustomerRepoTest {

    @Autowired
    CustomerRepo customerRepo;

    @Test
    void getAllCustomersWithJPQL() {
        List<Customer> allCustomers = customerRepo.getAllCustomersWithJPQL();
        for (Customer customer : allCustomers) {
            System.out.println(customer.toString());
        }
    }

    @Test
    void getCustomerIdAndCustomerName() {
        List<Customer> all = customerRepo.getCustomerIdAndCustomerName();
        for (Customer customer : all) {
            System.out.println(customer.toString());
        }
    }
}