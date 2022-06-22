package lk.ijse.spring.service.impl;

import lk.ijse.spring.config.WebAppConfig;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.service.ItemService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {WebAppConfig.class})
@ExtendWith({SpringExtension.class})
//@Transactional
class ItemServiceImplTest {

    @Autowired
    ItemService itemService;

    @Test
    void getLastItemCode() {
        assertEquals("C00-000",itemService.getLastItemCode());
//        String lastItemCode = itemService.getLastItemCode();
//        System.out.println(lastItemCode);
    }

    @Test
    void updateItem() {
        List<ItemDTO> allItems = itemService.getAllItems();
        for (ItemDTO item : allItems) {
            System.out.println(item.toString());
        }
        ItemDTO dto = itemService.updateItem(new ItemDTO("I00-001", "Lux Soap", 10, 150));
        System.out.println(dto.toString());
    }

    @Test
    void saveItem() {
        ItemDTO item1 = new ItemDTO("I00-001", "Lux Soap", 10, 150);
        ItemDTO item2 = new ItemDTO("I00-002", "Sunlight", 20, 120);
        ItemDTO item3 = new ItemDTO("I00-003", "Red Rice", 56.34, 50);
        ItemDTO item4 = new ItemDTO("I00-004", "Toothpaste", 30, 80);
        itemService.saveItem(item1);
        itemService.saveItem(item2);
        itemService.saveItem(item3);
        itemService.saveItem(item4);
    }

    @Test
    void deleteItem() {
        itemService.deleteItem("I00-004");
    }
}