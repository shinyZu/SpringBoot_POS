package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;

import java.util.List;

public interface ItemService {
    List<ItemDTO> getAllItems();

    ItemDTO searchItem(String itemCode);

    ItemDTO searchItemByDescription(String description);

    String getLastItemCode();

    String getItemCount();

    List<ItemDTO> getCodesAndDescriptions();

    ItemDTO saveItem(ItemDTO dto);

    ItemDTO updateItem(ItemDTO dto);

    void deleteItem(String itemCode);
}
