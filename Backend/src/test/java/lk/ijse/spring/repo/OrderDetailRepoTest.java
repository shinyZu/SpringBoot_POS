package lk.ijse.spring.repo;

import lk.ijse.spring.config.WebAppConfig;
import lk.ijse.spring.entity.OrderDetail;
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