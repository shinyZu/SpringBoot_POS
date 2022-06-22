package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CustomerDTO {
    private String customerId;
    private String customerName;
    private String customerAddress;
    private int customerContact;

    public CustomerDTO(String customerId) {
        this.customerId = customerId;
    }
}
