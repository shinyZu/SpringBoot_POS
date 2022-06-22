package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
@IdClass(OrderItem_PK.class)
public class OrderDetail {
    /*@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderDetailId;*/

    @Id
    private String orderId;

    @Id
    private String itemCode;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "orderId", referencedColumnName = "orderId", insertable = false, updatable = false)
    private Orders orders;

    @ManyToOne
    @JoinColumn(name = "itemCode", referencedColumnName = "itemCode", insertable = false, updatable = false)
    private Item items;

    private int orderQty;

    /**
     *  insertable and updatable are used to
     * inform the persistence provider whether the column is to be used in the SQL
     * INSERT or SQL UPDATE statements respectively.
     * It appears the intent is for these to be mutually exclusive but insertable=false only seems to work when
     * defined with updatable=false.*/

}
