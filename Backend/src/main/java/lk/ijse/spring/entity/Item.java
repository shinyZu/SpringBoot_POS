package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Item {
    @Id
    private String itemCode;
    private String description;
    private double unitPrice;
    private int qtyOnHand;

    public Item(String itemCode, String description) {
        this.itemCode = itemCode;
        this.description = description;
    }

    /*@OneToMany(mappedBy = "item")
    private List<OrderDetail> orderDetails = new ArrayList<>();*/
}
