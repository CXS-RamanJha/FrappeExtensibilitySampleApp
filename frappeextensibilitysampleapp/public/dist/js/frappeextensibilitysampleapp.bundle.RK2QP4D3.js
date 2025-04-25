(() => {
  // ../frappeextensibilitysampleapp/frappeextensibilitysampleapp/public/js/utils/custom_pos_commands_.js
  frappe.provide("ivend.confirm");
  frappe.provide("frappe.ui");

  // ../frappeextensibilitysampleapp/frappeextensibilitysampleapp/public/js/utils/trans_entry.js
  frappe.provide("ivend.confirm");
  frappe.provide("frappe.ui");
  frappe.ui.POSCommandsBuilder = class CustomPosCommandsBuilder extends frappe.ui.POSCommandsBuilder {
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
    beforeItemInsert(item_list, pos_invoice, redirect_to_profile, user_defined_gc_number, weighted_qty) {
      console.log("Before Item Insert");
    }
    add_pos_invoice_item(item_list, pos_invoice, redirect_to_profile, user_defined_gc_number, weighted_qty = 1) {
      this.beforeItemInsert(
        item_list,
        pos_invoice,
        redirect_to_profile,
        user_defined_gc_number,
        weighted_qty
      );
      frappe.msgprint("Custom add_pos_invoice_item function executed!");
      frappe.msgprint("Before Customer Change");
      super.add_pos_invoice_item(item_list, pos_invoice, redirect_to_profile, user_defined_gc_number, weighted_qty);
      this.afterItemInsert(item_list, pos_invoice, redirect_to_profile, user_defined_gc_number, weighted_qty);
    }
    afterItemInsert(item_list, pos_invoice, redirect_to_profile, user_defined_gc_number, weighted_qty) {
      console.log("after Item Insert");
    }
    before_validate_add_pos_item(item_list, redirect_to_profile) {
      console.log("before validate add pos item");
    }
    after_validate_add_pos_item(item_list, redirect_to_profile) {
      console.log("after validate add pos item");
    }
    validate_add_pos_item(item_list, redirect_to_profile) {
      this.before_validate_add_pos_item(item_list, redirect_to_profile);
      console.log("Custom calculate_total function executed!");
      super.validate_add_pos_item(item_list, redirect_to_profile);
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
    before_void_item(pos_invoice) {
      console.log("Before Void Item");
    }
    void_item(pos_invoice) {
      this.before_void_item(pos_invoice);
      super.void_item(pos_invoice);
      this.after_void_item(pos_invoice);
    }
    after_void_item(pos_invoice) {
      console.log("After Void Item");
    }
    beforeCustomerChange() {
      let selection = customer_search_grid.getSelection();
      if (selection.focused) {
        let selected_customer = customer_search_grid.getRowData(selection.focused.id);
        var item_list = [{ item_code: "GD-001" }];
        this.validate_add_pos_item(item_list, false);
        frappe.msgprint(`Customer changing to ${selected_customer.customer_name}`);
      }
    }
    afterCustomerChange() {
      let selection = customer_search_grid.getSelection();
      if (selection.focused) {
        let selected_customer = customer_search_grid.getRowData(selection.focused.id);
        frappe.msgprint(`Customer changed to ${selected_customer.customer_name}}`);
        var item_list = [this.pos_interface.selected_item_row["name"]];
        this.remove_item("POS Invoice Item", item_list);
      }
    }
  };

  // ../frappeextensibilitysampleapp/frappeextensibilitysampleapp/public/js/utils/custom_pos_transaction_customer.js
  frappe.provide("frappe.ui");
  var CustomPOSCommandsBuilder = class extends frappe.ui.POSCommandsBuilder {
    add_pos_invoice_customer(customer, pos_invoice, customer_name) {
      debugger;
      frappe.msgprint("Custom logic before calling parent method...");
      super.add_pos_invoice_customer(customer, pos_invoice, customer_name);
      frappe.msgprint("Custom logic after calling parent method...");
    }
    add_new_customer(interface_profile, pos_invoice_name) {
      frappe.msgprint("Overriding add_new_customer method...");
      super.add_new_customer(interface_profile, pos_invoice_name);
    }
  };
  frappe.ui.POSCommandsBuilder = CustomPOSCommandsBuilder;

  // ../frappeextensibilitysampleapp/frappeextensibilitysampleapp/public/js/utils/pos_complete_transaction.js
  frappe.provide("ivend.confirm");
  frappe.provide("frappe.ui");
  frappe.ui.POSCommandsBuilder = class extends frappe.ui.POSCommandsBuilder {
    _complete_transaction(profile_id, pos_invoice_name, quick_cash) {
    }
  };
})();
//# sourceMappingURL=frappeextensibilitysampleapp.bundle.RK2QP4D3.js.map
