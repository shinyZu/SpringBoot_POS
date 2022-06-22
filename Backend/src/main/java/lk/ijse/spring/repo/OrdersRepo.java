package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepo extends JpaRepository<Orders, String> {

    Orders getOrderByOrderId(String orderId);

    List<Orders> getOrdersByCustomer(Customer customer);
}
