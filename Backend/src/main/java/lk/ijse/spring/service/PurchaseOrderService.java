package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.OrdersDTO;

import java.util.List;

public interface PurchaseOrderService {

    String getLastOrderID();

    List<OrdersDTO> getAllOrders();

    boolean purchaseOrder(OrdersDTO dto);

    String getOrderCount();

    void deleteOrder(String orderId);
}
