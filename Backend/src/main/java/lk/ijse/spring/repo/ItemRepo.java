package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepo extends JpaRepository<Item, String> {
    @Query(value = "select new Item(i.itemCode, i.description) from Item i")
    List<Item> getItemCodeAndDescription();

    Item getItemByDescription(String description);
}
