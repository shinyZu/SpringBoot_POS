package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/pos/customer")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCustomers() {
        return new ResponseUtil(200, "OK", customerService.getAllCustomers());
    }

    @GetMapping(path = "{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchCustomer(@PathVariable String id) {
        return new ResponseUtil(200, "Search Done", customerService.searchCustomer(id));
    }

    @GetMapping(params = {"name"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchCustomerByName(@RequestParam String name) {
        return new ResponseUtil(200, "Search Done By Name", customerService.searchCustomerByName(name));
    }

    @GetMapping(path = "lastID", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getLastCustomerID() {
        return new ResponseUtil(200, "Last ID", customerService.getLastCustomerID());
    }

    @GetMapping(path = "getCount", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCustomerCount() {
        return new ResponseUtil(200, "Customer Count", customerService.getCustomerCount());
    }

    @GetMapping(path = "{id}/{contact}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil checkIfDuplicateContact(@PathVariable String id, @PathVariable int contact) {
        return new ResponseUtil(200, customerService.isDuplicateContact(id,contact), null);
    }

    @GetMapping(path = "id_name",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getIdsAndNames(){
        return new ResponseUtil(200,"All IDs & Names", customerService.getIdsAndNames());
    }

    @GetMapping(path = "get_orders/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCustomerOrders(@PathVariable("id") String id) {
        if (!customerService.getOrdersByCustomer(id).isEmpty()){
            return new ResponseUtil(200, "All Orders placed by "+id+" will be Lost...", customerService.getOrdersByCustomer(id));
        }
        return new ResponseUtil(200, "No Orders Yet", customerService.getOrdersByCustomer(id)); // safe to delete
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveCustomer(@ModelAttribute CustomerDTO dto) {
        return new ResponseUtil(201, "Customer Saved Successfully..!", customerService.saveCustomer(dto));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO dto) {
        return new ResponseUtil(200, "Customer Updated Successfully..!", customerService.updateCustomer(dto));
    }

    @DeleteMapping(params = {"id"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteCustomer(@RequestParam("id") String id) {
        customerService.deleteCustomer(id);
        return new ResponseUtil(200, "Customer Deleted Successfully..!", null);
    }
}
