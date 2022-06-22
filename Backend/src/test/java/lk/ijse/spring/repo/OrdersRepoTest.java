package lk.ijse.spring.repo;

import lk.ijse.spring.config.WebAppConfig;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Orders;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {WebAppConfig.class})
@ExtendWith({SpringExtension.class})
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