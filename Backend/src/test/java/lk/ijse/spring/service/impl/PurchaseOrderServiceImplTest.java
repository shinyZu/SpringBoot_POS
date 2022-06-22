package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.OrderDetailDTO;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.service.PurchaseOrderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class PurchaseOrderServiceImplTest {

    @Autowired
    PurchaseOrderService purchaseOrderService;

    @Test
    void getLastOrderID() {

    }

    @Test
    void getAllOrders() {
        List<OrdersDTO> allOrders = purchaseOrderService.getAllOrders();
        for (OrdersDTO order : allOrders) {
            System.out.println(order.toString());
        }
    }

    @Test
    void purchaseOrder() {
        List<OrderDetailDTO> detailDTOS = new ArrayList<>();
        detailDTOS.add(new OrderDetailDTO("OID-008", "I00-001", 3));
        detailDTOS.add(new OrderDetailDTO("OID-008", "I00-002", 4));

        // OrderDate -> LocalDate
        /*OrdersDTO ordersDTO = new OrdersDTO("OID-001", LocalDate.of(2022, 6,21), 400.00, 12,
                new CustomerDTO("C00-001"),
                detailDTOS
        );*/

        // OrderDate -> java.util.Date
        OrdersDTO ordersDTO = new OrdersDTO("OID-008", java.sql.Date.valueOf("2022-06-22"), 400.00, 12,
                new CustomerDTO("C00-003"),
//                "C00-003",
                detailDTOS
        );
        boolean b = purchaseOrderService.purchaseOrder(ordersDTO);
        System.out.println(b);
    }

    @Test
    void deleteOrder() {
        purchaseOrderService.deleteOrder("OID-003");
    }
}