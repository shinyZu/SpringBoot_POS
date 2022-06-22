package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.repo.OrdersRepo;
import lk.ijse.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo repo;

    @Autowired
    private OrdersRepo ordersRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return mapper.map(repo.findAll(), new TypeToken<List<CustomerDTO>>() {
        }.getType());
    }

    @Override
    public CustomerDTO searchCustomer(String id) {
        if (repo.existsById(id)) {
            return mapper.map(repo.findById(id), CustomerDTO.class);
        } else {
            throw new RuntimeException("No Customer with ID " + id);
        }
    }

    @Override
    public CustomerDTO searchCustomerByName(String name) {
        return mapper.map(repo.getCustomerByCustomerName(name), CustomerDTO.class);
    }

    @Override
    public String getLastCustomerID() {
        long count = repo.count();
        if (count == 0) { // first item to be added
            return "C00-000";
        }
        List<Customer> customers = repo.findAll(Sort.by(Sort.Direction.DESC, "customerId"));
        return customers.get(0).getCustomerId();
    }

    @Override
    public String getCustomerCount() {
        long count = repo.count();
        return String.valueOf(count);
    }

    @Override
    public String isDuplicateContact(String id, int contact) {
        System.out.println("contact : " + contact);
        List<Customer> all = repo.findAll();
        for (Customer customer : all) {
            if (customer.getCustomerContact() == contact) {
                if (customer.getCustomerId().equals(id)) {
                    return "Match";
                } else {
                    return "Duplicate";
                }
            }
        }
        return "Unique";
    }

    @Override
    public List<CustomerDTO> getIdsAndNames() {
        return mapper.map(repo.getCustomerIdAndCustomerName(), new TypeToken<List<CustomerDTO>>() {
        }.getType());
    }

    @Override
    public CustomerDTO saveCustomer(CustomerDTO dto) {
        if (!repo.existsById(dto.getCustomerId())) {
            return mapper.map(repo.save(mapper.map(dto, Customer.class)), CustomerDTO.class);
        } else {
            throw new RuntimeException("Customer Already Exists...");
        }
    }

    @Override
    public CustomerDTO updateCustomer(CustomerDTO dto) {
        if (repo.existsById(dto.getCustomerId())) {
            return mapper.map(repo.save(mapper.map(dto, Customer.class)), CustomerDTO.class);
        } else {
            throw new RuntimeException("No Such Customer..Please check the ID...");
        }
    }

    @Override
    public void deleteCustomer(String id) {
        if (repo.existsById(id)) {
//            List<Orders> orders = ordersRepo.getOrdersByCustomer(new Customer(id));
//            System.out.println(orders);
            repo.deleteById(id);

            /*if (orders.isEmpty()) {
                repo.deleteById(id);
            } else {
                throw new RuntimeException("All Orders placed by "+id+" will be Lost...");
            }*/

        } else {
            throw new RuntimeException("No Such Customer..Please check the Customer ID...");
        }
    }

    @Override
    public List<OrdersDTO> getOrdersByCustomer(String id) {
        if (repo.existsById(id)) {
            return mapper.map(ordersRepo.getOrdersByCustomer(new Customer(id)), new TypeToken<List<OrdersDTO>>() {
            }.getType());
        } else {
            throw new RuntimeException("No Such Customer..Please check the Customer ID...");
        }
    }
}
