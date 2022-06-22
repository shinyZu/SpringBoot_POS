package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Orders;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class OrdersRepoTest {

    @Autowired
    OrdersRepo ordersRepo;

    @Test
    void getOrderByOrderId() {
        Orders order = ordersRepo.getOrderByOrderId("OID-002");
        System.out.println(order);
    }

    @Test
    void getOrdersByCustomer() {
        List<Orders> orders = ordersRepo.getOrdersByCustomer(new Customer("C00-004"));
        System.out.println(orders.toString());
        for (Orders od : orders) {
            String customerName = od.getCustomer().getCustomerName();
            String orderId = od.getOrderId();
            System.out.println(customerName);
            System.out.println(orderId);
        }

//        System.out.println(od.toString());
    }
}