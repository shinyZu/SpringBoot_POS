package lk.ijse.spring.controller;

import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.service.PurchaseOrderService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/pos/orders")
public class PurchaseOrderController {

    @Autowired
    PurchaseOrderService purchaseOrderService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllOrders() {
        return new ResponseUtil(200, "OK", purchaseOrderService.getAllOrders());
    }

    @GetMapping(path = "lastID", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getLastOrderID() {
        return new ResponseUtil(200, "Last OrderID", purchaseOrderService.getLastOrderID());
    }

    @GetMapping(path = "getCount", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getOrderCount() {
        return new ResponseUtil(200, "Order Count", purchaseOrderService.getOrderCount());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil purchaseOrder(@RequestBody OrdersDTO dto) {
        return new ResponseUtil(201, "Order Placed Successfully...!", purchaseOrderService.purchaseOrder(dto));
    }

    @DeleteMapping(params = {"orderId"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteOrder(@RequestParam("orderId") String orderId) {
        purchaseOrderService.deleteOrder(orderId);
        return new ResponseUtil(200, "Order Deleted Successfully..!", null);
    }
}
