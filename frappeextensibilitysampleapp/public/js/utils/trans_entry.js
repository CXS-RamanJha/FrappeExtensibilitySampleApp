frappe.provide("ivend.confirm");
frappe.provide("frappe.ui");

//
frappe.ui.POSCommandsBuilder = class CustomPosCommandsBuilder extends frappe.ui.POSCommandsBuilder {

    async add_pos_invoice_item(
        item_list,
        pos_invoice,
        redirect_to_profile,
        user_defined_gc_number,
        weighted_qty = 1
    ) {
        frappe.msgprint("Custom add_pos_invoice_item function executed!");
        alert("Before Customer Change");
        super.add_pos_invoice_item(item_list, pos_invoice, redirect_to_profile, user_defined_gc_number, weighted_qty); // Call the original method
    }
    validate_add_pos_item(item_list, redirect_to_profile) {
        console.log("Custom calculate_total function executed!");
        super.validate_add_pos_item(item_list, redirect_to_profile); // Call the original method
    }

    beforeCustomerChange(){
      
        let selection = customer_search_grid.getSelection();
            if (selection.focused) {
                let selected_customer = customer_search_grid.getRowData(selection.focused.id);               
                frappe.msgprint(`Customer changing to ${selected_customer.customer_name}`);        
            }
        
       }

       afterCustomerChange(){
      
        let selection = customer_search_grid.getSelection();
            if (selection.focused) {
                let selected_customer = customer_search_grid.getRowData(selection.focused.id);               
                frappe.msgprint(`Customer changed to ${selected_customer.customer_name}}`);  
                debugger
                var item_list= [cur_frm.doc.items[0].name];
                frappe.ui.POSCommandsBuilder.remove_item("POS Invoice Item", item_list);
            }      
              
       }
}