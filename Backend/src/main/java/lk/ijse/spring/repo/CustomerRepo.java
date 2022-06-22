package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer, String> {

    @Query(value = "select u from Customer u")
    List<Customer> getAllCustomersWithJPQL();

    // @Query(value = "select c.customerId, c.customerName from Customer c")
    @Query(value = "select new Customer(c.customerId, c.customerName) from Customer c")
    List<Customer> getCustomerIdAndCustomerName();

    Customer getCustomerByCustomerName(String name);

}
