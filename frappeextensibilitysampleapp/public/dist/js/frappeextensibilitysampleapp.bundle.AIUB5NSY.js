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
    before_handle_set_quantity_command(me, cur_frm2, inputField, item_list) {
      console.log("Before Handle Set Quantity Command");
    }
    handle_set_quantity_command(me, cur_frm2, inputField, item_list) {
      this.before_handle_set_quantity_command(me, cur_frm2, inputField, item_list);
      super.handle_set_quantity_command(me, cur_frm2, inputField, item_list);
      this.after_handle_set_quantity_command(me, cur_frm2, inputField, item_list);
    }
    after_handle_set_quantity_command(me, cur_frm2, inputField, item_list) {
      console.log("After Handle Set Quantity Command");
    }
    before_void_item(pos_invoice) {
      console.log("Before Void Item");
    }
    void_item(pos_invoice) {
      this.before_void_item(pos_invoice);
      var item_list = [this.pos_interface.selected_item_row["name"]];
      cur_frm.doc.items.forEach(function(item) {
        if (item.custom_cross_sell_reference == item.name) {
          item_list.push(item.name);
        }
      });
      this.remove_reasons();
      this.remove_transaction_item_attributes();
      this.remove_item("POS Invoice Item", item_list);
      this.after_void_item(pos_invoice);
    }
    after_void_item(pos_invoice) {
      console.log("After Void Item");
    }
    confirm_customer_change(mes, successbalback, failcallback) {
      return new Promise((resolve) => {
        frappe.confirm(
          __("Manager override?"),
          () => resolve(true),
          () => resolve(false)
        );
      });
    }
    async beforeCustomerChange() {
      return new Promise(async (resolve) => {
        if (!frappe.pos_interface_builder.manager_login || frappe.pos_interface_builder.manager_login == void 0) {
          await frappe.pos_interface_builder.show_popup("manager_override");
          if (frappe.pos_interface_builder.manager_login) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    }
    afterCustomerChange() {
      let selection = customer_search_grid.getSelection();
      if (selection.focused) {
        let selected_customer = customer_search_grid.getRowData(selection.focused.id);
        frappe.msgprint(`Customer changed to ${selected_customer.customer_name}}`);
      }
    }
    async add_pos_invoice_customer(customer, pos_invoice, customer_name) {
      this.beforeCustomerChange();
      super.add_pos_invoice_customer(customer, pos_invoice, customer_name);
    }
    async changePrice() {
      var row_name = cur_frm.doc.items[0].name;
      try {
        debugger;
        await this.edit_pos_invoice_item_row(this.pos_invoice_name, row_name, "Price Override", "1.00", true);
      } catch (error) {
        console.error("Error in changePrice:", error);
      }
    }
    on_button_click(cmd) {
      super.on_button_click(cmd);
    }
    async changeCustomer() {
      try {
        await frappe.pos_interface_builder.pos_commands.add_pos_invoice_customer(
          "C0019",
          cur_frm.doc.name,
          "C0019"
        ).then(() => {
          frappe.msgprint({ message: "{{ _('Customer Changed on POS.', '', 'iVendNext') }}", indicator: "green" });
        });
      } catch (error) {
        frappe.msgprint({ message: error, indicator: "red" });
      }
    }
    async changeLineDiscount() {
      var row_name = cur_frm.doc.items[0].name;
      try {
        debugger;
        await this.edit_pos_invoice_item_row(this.pos_invoice_name, row_name, "Line Discount Percent", "1.00", true);
      } catch (error) {
        console.error("Error in changePrice:", error);
      }
    }
    async changeLineDiscountAmount() {
      var row_name = cur_frm.doc.items[0].name;
      try {
        debugger;
        await this.edit_pos_invoice_item_row(this.pos_invoice_name, row_name, "Line Discount Amount", "1.00", true);
      } catch (error) {
        console.error("Error in changePrice:", error);
      }
    }
    async changeSaleDiscount() {
      var row_name = cur_frm.doc.items[0].name;
      try {
        await this.edit_pos_invoice_doc(this.pos_invoice_name, "Total Discount Percent", "1.00", true);
      } catch (error) {
        console.error("Error in changePrice:", error);
      }
    }
    async changePOSMode() {
      await this.select_transaction_mode(
        "Transaction Mode - Item Return",
        this.pos_invoice_name,
        null,
        null
      );
    }
    async SuspendTransaction() {
      this.suspend_pos_invoice();
      this.end_manager_session();
    }
    async recall_transaction() {
      this.recall_suspended_transaction(["RET-PSINV-2025-00168"]);
    }
    _complete_transaction(profile_id, pos_invoice_name, quick_cash) {
      super._complete_transaction(profile_id, pos_invoice_name, quick_cash);
    }
    SetSaleAttribute() {
      var attribute_idx = cur_frm.doc.custom_pos_invoice_sale_attribute.findIndex(
        (x) => x.sale_attribute == "SaleAttribute1"
      );
      cur_frm.doc.custom_pos_invoice_sale_attribute[attribute_idx]["attribute_value"] = "Avn";
      attribute_idx = cur_frm.doc.custom_pos_invoice_sale_attribute.findIndex(
        (x) => x.sale_attribute == "SaleAttribute2"
      );
      cur_frm.doc.custom_pos_invoice_sale_attribute[attribute_idx]["attribute_value"] = "Avn";
    }
    GetSaleAttribute() {
      var attribute_idx = cur_frm.doc.custom_pos_invoice_sale_attribute.findIndex(
        (x) => x.sale_attribute == "SaleAttribute1"
      );
      console.log(cur_frm.doc.custom_pos_invoice_sale_attribute[attribute_idx]["attribute_value"]);
    }
    SetLineAttribute() {
      var attribute_idx = cur_frm.doc.custom_pos_invoice_transaction_item_attribute.findIndex(
        (x) => x.transaction_item_attribute == "ItemAttribute1"
      );
      if (attribute_idx < 0) {
        var row_name = cur_frm.doc.items[0];
        cur_frm.doc.custom_pos_invoice_transaction_item_attribute.push({
          transaction_item_attribute: "ItemAttribute1",
          attribute_value: "Avnish Verma",
          item_ref: row_name["item_code"],
          item_id_ref: row_name["name"],
          row_no_ref: row_name["idx"],
          docstatus: 0,
          doctype: "POS Invoice Transaction Item Attribute",
          name: frappe.utils.get_random(10),
          parentfield: "custom_pos_invoice_transaction_item_attribute",
          parenttype: "POS Invoice"
        });
      } else
        cur_frm.doc.custom_pos_invoice_transaction_item_attribute[attribute_idx]["attribute_value"] = "Avn";
    }
  };

  // ../frappeextensibilitysampleapp/frappeextensibilitysampleapp/public/js/utils/custom_pos_transaction_customer.js
  frappe.provide("frappe.ui");
  var CustomPOSCommandsBuilder = class extends frappe.ui.POSCommandsBuilder {
  };
  frappe.ui.POSCommandsBuilder = CustomPOSCommandsBuilder;
})();
//# sourceMappingURL=frappeextensibilitysampleapp.bundle.AIUB5NSY.js.map
