package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.entity.OrderDetail;
import lk.ijse.spring.entity.Orders;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.repo.OrderDetailRepo;
import lk.ijse.spring.service.ItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {
    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private OrderDetailRepo orderDetailRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<ItemDTO> getAllItems() {
        return mapper.map(itemRepo.findAll(), new TypeToken<List<ItemDTO>>() {
        }.getType());
    }

    @Override
    public ItemDTO searchItem(String itemCode) {
        if (itemRepo.existsById(itemCode)) {
            return mapper.map(itemRepo.findById(itemCode), ItemDTO.class);
        } else {
            throw new RuntimeException("No Item with Code " + itemCode);
        }
    }

    @Override
    public ItemDTO searchItemByDescription(String description) {
        return mapper.map(itemRepo.getItemByDescription(description),ItemDTO.class);
    }

    @Override
    public String getLastItemCode() {
        long count = itemRepo.count();
        System.out.println("count---------- "+count);
        if (count == 0) { // first item to be added
            return "I00-000";
        }
        List<Item> items = itemRepo.findAll(Sort.by(Sort.Direction.DESC, "itemCode"));
        return items.get(0).getItemCode();
    }

    @Override
    public String getItemCount() {
        return String.valueOf(itemRepo.count());
    }

    @Override
    public List<ItemDTO> getCodesAndDescriptions() {
        return mapper.map(itemRepo.getItemCodeAndDescription(), new TypeToken<List<ItemDTO>>(){}.getType());
    }

    @Override
    public ItemDTO saveItem(ItemDTO dto) {
        if (!itemRepo.existsById(dto.getItemCode())) {
            return mapper.map(itemRepo.save(mapper.map(dto, Item.class)), ItemDTO.class);
        } else {
            throw new RuntimeException("Item Already Exists...");
        }
    }

    @Override
    public ItemDTO updateItem(ItemDTO dto) {
        if (itemRepo.existsById(dto.getItemCode())) {
            return mapper.map(itemRepo.save(mapper.map(dto, Item.class)), ItemDTO.class);
        } else {
            throw new RuntimeException("No Such Item..Please check the Item Code...");
        }
    }

    @Override
    public void deleteItem(String itemCode) {
//        if (repo.existsById(itemCode)) {
//            repo.deleteById(itemCode);
//        } else {
//            throw new RuntimeException("No Such Item..Please check the Item Code...");
//        }

        if (itemRepo.existsById(itemCode)) {
            List<OrderDetail> details = orderDetailRepo.getOrderDetailsByItemCode(itemCode);
            if (details.isEmpty()) {
                itemRepo.deleteById(itemCode);
            } else {
                throw new RuntimeException("Item "+itemCode+" is been placed by Orders...Hence cannot delete this Item");
            }

        } else {
            throw new RuntimeException("No Such Customer..Please check the Customer ID...");
        }
    }
}
