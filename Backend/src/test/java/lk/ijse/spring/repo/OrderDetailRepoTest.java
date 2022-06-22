package lk.ijse.spring.repo;

import lk.ijse.spring.entity.OrderDetail;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class OrderDetailRepoTest {

    @Autowired
    OrderDetailRepo orderDetailRepo;

    @Test
    void getOrderDetailsByItemCode() {
        List<OrderDetail> details = orderDetailRepo.getOrderDetailsByItemCode("I00-002");
        for (OrderDetail detail : details) {
            System.out.println(detail.getItemCode());
            System.out.println(detail.getOrderId());
        }
    }
}