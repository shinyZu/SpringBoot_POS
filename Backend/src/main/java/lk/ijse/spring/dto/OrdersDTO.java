package lk.ijse.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class OrdersDTO {

    private String orderId;

    @JsonFormat(pattern = "yyyy-MM-dd") //1655749800000
    private Date orderDate;
    // private LocalDate orderDate;

    private double orderCost;
    private int discount;

    private CustomerDTO customer;
    private List<OrderDetailDTO> orderDetails;
}
