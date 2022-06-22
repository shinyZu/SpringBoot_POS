package lk.ijse.spring.repo;

import lk.ijse.spring.config.JPAConfig;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.entity.Customer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {JPAConfig.class})
@ExtendWith(SpringExtension.class)
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