(() => {
  // ../frappeextensibilitysampleapp/frappeextensibilitysampleapp/public/js/utils/custom_pos_commands_.js
  frappe.provide("ivend.confirm");
  frappe.provide("frappe.ui");

  // ../frappeextensibilitysampleapp/frappeextensibilitysampleapp/public/js/utils/trans_entry.js
  frappe.provide("ivend.confirm");
  frappe.provide("frappe.ui");
  frappe.ui.POSCommandsBuilder = class CustomPosCommandsBuilder extends frappe.ui.POSCommandsBuilder {
    async add_pos_invoice_item(item_list, pos_invoice, redirect_to_profile, user_defined_gc_number, weighted_qty = 1) {
      frappe.msgprint("Custom add_pos_invoice_item function executed!");
      alert("Before Customer Change");
      super.add_pos_invoice_item(item_list, pos_invoice, redirect_to_profile, user_defined_gc_number, weighted_qty);
    }
    validate_add_pos_item(item_list, redirect_to_profile) {
      console.log("Custom calculate_total function executed!");
      super.validate_add_pos_item(item_list, redirect_to_profile);
    }
    beforeCustomerChange() {
      let selection = customer_search_grid.getSelection();
      if (selection.focused) {
        let selected_customer = customer_search_grid.getRowData(selection.focused.id);
        frappe.msgprint(`Customer changing to ${selected_customer.customer_name}`);
      }
    }
    afterCustomerChange() {
      let selection = customer_search_grid.getSelection();
      if (selection.focused) {
        let selected_customer = customer_search_grid.getRowData(selection.focused.id);
        frappe.msgprint(`Customer changed to ${selected_customer.customer_name}}`);
        debugger;
        var item_list = [cur_frm.doc.items[0].name];
        frappe.ui.POSCommandsBuilder.remove_item("POS Invoice Item", item_list);
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
})();
//# sourceMappingURL=frappeextensibilitysampleapp.bundle.CNV3KEYX.js.map
