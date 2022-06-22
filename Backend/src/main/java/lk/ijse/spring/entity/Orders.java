package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Orders {
    @Id
    private String orderId;

//    @Temporal(TemporalType.DATE) // without --> 2022-06-21 00:00:00.0
    private Date orderDate;
//    private LocalDate orderDate;

    private double orderCost;

    @Column(columnDefinition = "double default '0.0'")
    private int discount;

//    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH}/*, fetch = FetchType.EAGER*/)
//    @ManyToOne(cascade = CascadeType.REMOVE)
    @ManyToOne
    @JoinColumn(name = "customerID", referencedColumnName = "customerId")
    private Customer customer;

    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails = new ArrayList<>();
}
