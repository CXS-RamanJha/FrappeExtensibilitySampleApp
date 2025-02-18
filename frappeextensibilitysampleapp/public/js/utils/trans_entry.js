frappe.provide("ivend.confirm");
frappe.provide("frappe.ui");

//
frappe.ui.POSCommandsBuilder = class CustomPosCommandsBuilder extends frappe.ui.POSCommandsBuilder {
    /////////Transaction Start //////////////
    before_transaction_start() {
        console.log("Before Transaction Start");
    }
    indexeddb_remove_pos_invoice_obj() {
        this.before_transaction_start();
        super.indexeddb_remove_pos_invoice_obj();
        this.after_transaction_start();
    }
    after_transaction_start() {
        console.log("After Transaction Start");
    }
    /////////Item Events/////////////////////
    /**
     * Function to be executed before an item is inserted.
     *
     * @param {Array} item_list - The list of items to be inserted.
     * @param {Object} pos_invoice - The point of sale invoice object.
     * @param {boolean} redirect_to_profile - Flag indicating whether to redirect to profile.
     * @param {string} user_defined_gc_number - User-defined gift card number.
     * @param {number} weighted_qty - The weighted quantity of the item.
     */
    beforeItemInsert(item_list,
        pos_invoice,
        redirect_to_profile,
        user_defined_gc_number,
        weighted_qty) {
        console.log("Before Item Insert");
    }

    add_pos_invoice_item(
        item_list,
        pos_invoice,
        redirect_to_profile,
        user_defined_gc_number,
        weighted_qty = 1
    ) {
        this.beforeItemInsert(item_list, pos_invoice,
            redirect_to_profile, user_defined_gc_number, weighted_qty);
        frappe.msgprint("Custom add_pos_invoice_item function executed!");
        frappe.msgprint("Before Customer Change");
        super.add_pos_invoice_item(item_list, pos_invoice, redirect_to_profile, user_defined_gc_number, weighted_qty); // Call the original method
        this.afterItemInsert(item_list, pos_invoice, redirect_to_profile, user_defined_gc_number, weighted_qty);
    }
    /**
     * Function to be called after an item is inserted.
     *
     * @param {Array} item_list - The list of items.
     * @param {Object} pos_invoice - The POS invoice object.
     * @param {boolean} redirect_to_profile - Flag indicating whether to redirect to profile.
     * @param {string} user_defined_gc_number - User-defined GC number.
     * @param {number} weighted_qty - The weighted quantity.
     */
    afterItemInsert(item_list,
        pos_invoice,
        redirect_to_profile,
        user_defined_gc_number,
        weighted_qty) {
        console.log("after Item Insert");
    }
    /**
     * Function to be called before the total is calculated.
     *
     * @param {Array} item_list - The list of items.
     * @param {boolean} redirect_to_profile - Flag indicating whether to redirect to profile.
     */
    before_validate_add_pos_item(item_list, redirect_to_profile) {
        console.log("before validate add pos item");
    }
    /**
     * Function to be called after the total is calculated.
     *
     * @param {Array} item_list - The list of items.
     * @param {boolean} redirect_to_profile - Flag indicating whether to redirect to profile.
     */
    after_validate_add_pos_item(item_list, redirect_to_profile) {
        console.log("after validate add pos item");
    }
    /**
     * Function to be called when the total is calculated.
     *
     * @param {Array} item_list - The list of items.
     * @param {boolean} redirect_to_profile - Flag indicating whether to redirect to profile.
     */
    validate_add_pos_item(item_list, redirect_to_profile) {
        this.before_validate_add_pos_item(item_list, redirect_to_profile);
        console.log("Custom calculate_total function executed!");
        super.validate_add_pos_item(item_list, redirect_to_profile); // Call the original method
        this.after_validate_add_pos_item(item_list, redirect_to_profile);
    }
    before_edit_pos_invoice_item_row(pos_invoice, dg_id, dg_pos_command, new_value, update_data = true) {
        console.log("Before Edit POS Invoice Item Row");
    }
    async edit_pos_invoice_item_row(pos_invoice, dg_id, dg_pos_command, new_value, update_data = true) {
        this.before_edit_pos_invoice_item_row(pos_invoice, dg_id, dg_pos_command, new_value, update_data);
        super.edit_pos_invoice_item_row(pos_invoice, dg_id, dg_pos_command, new_value, update_data);
        this.after_edit_pos_invoice_item_row(pos_invoice, dg_id, dg_pos_command, new_value, update_data);
    }
    after_edit_pos_invoice_item_row(pos_invoice, dg_id, dg_pos_command, new_value, update_data = true) {
        console.log("After Edit POS Invoice Item Row");
    }
    before_handle_set_quantity_command(me, cur_frm, inputField, item_list) {
        console.log("Before Handle Set Quantity Command");
    }
    handle_set_quantity_command(me, cur_frm, inputField, item_list) {
        this.before_handle_set_quantity_command(me, cur_frm, inputField, item_list);
        super.handle_set_quantity_command(me, cur_frm, inputField, item_list);
        this.after_handle_set_quantity_command(me, cur_frm, inputField, item_list);
    }
    after_handle_set_quantity_command(me, cur_frm, inputField, item_list) {
        console.log("After Handle Set Quantity Command");
    }
    /**
     * Function to be called before the customer is changed.
     */
    
    beforeCustomerChange(){
      
        let selection = customer_search_grid.getSelection();
            if (selection.focused) {
                let selected_customer = customer_search_grid.getRowData(selection.focused.id);               
                frappe.msgprint(`Customer changing to ${selected_customer.customer_name}`);        
            }
        
       }
       
    /**
     * Function to be called after the customer is changed.
     */
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