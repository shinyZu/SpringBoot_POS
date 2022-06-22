package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.OrderDetailDTO;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.entity.OrderDetail;
import lk.ijse.spring.entity.Orders;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.repo.OrdersRepo;
import lk.ijse.spring.service.PurchaseOrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    @Autowired
    ItemRepo itemRepo;


    @Autowired
    OrdersRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public String getLastOrderID() {
        long count = repo.count();
        if (count == 0) { // if no orders placed yet
            return "OID-000";
        }
        List<Orders> orders = repo.findAll(Sort.by(Sort.Direction.DESC, "orderId"));
        return orders.get(0).getOrderId();
    }

    @Override
    public List<OrdersDTO> getAllOrders() {
        return mapper.map(repo.findAll(), new TypeToken<List<OrdersDTO>>() {
        }.getType());
    }

    @Override
    public boolean purchaseOrder(OrdersDTO dto) {
        System.out.println("before save-----------------"+dto.toString());
        if (!repo.existsById(dto.getOrderId())) {
            OrdersDTO ordersDTO = mapper.map(repo.save(mapper.map(dto, Orders.class)), OrdersDTO.class);
            System.out.println("after save-----------------"+ordersDTO.toString());

            for (OrderDetail orderDetail : mapper.map(dto,Orders.class).getOrderDetails()) {
                Item item = itemRepo.findById(orderDetail.getItemCode()).get();
                item.setQtyOnHand(item.getQtyOnHand() - orderDetail.getOrderQty());
                itemRepo.save(item);
            }

           /* if (dto.getOrderDetails().size() < 1){
                throw new RuntimeException("Empty Order...Try Again...");
            }*/
            return true;
        } else {
            throw new RuntimeException("Error Occurred while Purchasing Order...Try Again...");
        }
    }

    @Override
    public String getOrderCount() {
        return String.valueOf(repo.count());
    }

    @Override
    public void deleteOrder(String orderId) {
        if (repo.existsById(orderId)) {
            repo.deleteById(orderId);
        } else {
            throw new RuntimeException("No Such Order..Please check the Order ID...");
        }
    }
}
