package lk.ijse.spring.controller;

import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.service.ItemService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/pos/item")
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllItems() {
        return new ResponseUtil(200, "OK", itemService.getAllItems());
    }

    @GetMapping(path = "{itemCode}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchItem(@PathVariable String itemCode) {
        return new ResponseUtil(200, "Search Done", itemService.searchItem(itemCode));
    }

    @GetMapping(params = {"description"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchItemByDescription(@RequestParam String description) {
        return new ResponseUtil(200, "Search Done By Description", itemService.searchItemByDescription(description));
    }

    @GetMapping(path = "lastCode", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getLastItemCode() {
        return new ResponseUtil(200, "Last Code", itemService.getLastItemCode());
    }

    @GetMapping(path = "getCount", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getItemCount() {
        return new ResponseUtil(200, "Item Count", itemService.getItemCount());
    }

    @GetMapping(path = "code_description", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCodesAndDescriptions() {
        return new ResponseUtil(200, "All Codes & Descriptions", itemService.getCodesAndDescriptions());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveItem(@ModelAttribute ItemDTO dto) {
        return new ResponseUtil(201, "Item Saved Successfully..!", itemService.saveItem(dto));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateItem(@RequestBody ItemDTO dto) {
        return new ResponseUtil(200, "Item Updated Successfully..!", itemService.updateItem(dto));
    }

    @DeleteMapping(params = {"itemCode"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteItem(@RequestParam("itemCode") String itemCode) {
        itemService.deleteItem(itemCode);
        return new ResponseUtil(200, "Item Deleted Successfully..!", null);
    }
}
