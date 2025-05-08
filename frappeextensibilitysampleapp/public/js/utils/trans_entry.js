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
    before_void_item(pos_invoice) {
        console.log("Before Void Item");
    }
    void_item(pos_invoice) {
        this.before_void_item(pos_invoice);
        var item_list = [this.pos_interface.selected_item_row["name"]];
        //if (me.pos_interface.selected_item_row.custom_is_cross_sell_item) {
        cur_frm.doc.items.forEach(function (item) {
            if (
                item.custom_cross_sell_reference == item.name
            ) {
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
    /**
     * Function to be called before the customer is changed.
     */
    confirm_customer_change(mes, successbalback, failcallback) {
        return new Promise((resolve) => {
            frappe.confirm(
                __('Manager override?'),
                () => resolve(true),   // User clicked Yes
                () => resolve(false)   // User clicked No
            );
        });
    }
    // async beforeCustomerChange() {
    //     confirm_customer_change("Manager override?", function(){})
    //     let selection = customer_search_grid.getSelection();
    //     this.pos_interface.show_popup("manager_override");
    //     debugger;
    //     //this.void_item(this.pos_invoice_name)
    //     // setTimeout(async () => {//ChangePrice
    //     //     if (selection.focused) {
    //     //         // let selected_customer = customer_search_grid.getRowData(selection.focused.id);
    //     //         // var item_list = [{ item_code: 'GD-001' }];
    //     //         // this.validate_add_pos_item(item_list, false);
    //     //         await this.changePrice();
    //     frappe.msgprint(`Customer changing to ${selected_customer.customer_name}`);
    //     //     }
    //     // }, 500);
    //     // setTimeout(async () => {//Change Customer
    //     //     if (selection.focused) {
    //     //         // let selected_customer = customer_search_grid.getRowData(selection.focused.id);
    //     //         // var item_list = [{ item_code: 'GD-001' }];
    //     //         // this.validate_add_pos_item(item_list, false);
    //     //         await this.changeCustomer();
    //     //         // frappe.msgprint(`Customer changing to ${selected_customer.customer_name}`);
    //     //     }
    //     // }, 500);
    //     setTimeout(async () => {
    //         if (selection.focused) {
    //             // await this.changeLineDiscount();//Change Line Discount percentage
    //             //await this.changeLineDiscountAmount();//Change LineDiscount amount
    //             //await this.changeSaleDiscount();    //Change sale Discount percentage
    //             // await this.changePOSMode();
    //             // await this.SuspendTransaction();
    //             //await this.recall_transaction();
    //         }
    //     }, 200);
    // }
    async beforeCustomerChange() {
        let selection = customer_search_grid.getSelection();
        if (selection.focused) {

            let selected_customer = customer_search_grid.getRowData(selection.focused.id);
            var item_list = [{ item_code: 'GD-001' }];
            this.validate_add_pos_item(item_list, false);
            frappe.msgprint(`Customer changing to ${selected_customer.customer_name}`);

            // Insert into UDT 
            insertDataIntoUDT();
            // Get from UDT 
            getDataFromUDT();

        }
        return new Promise(async (resolve) => {
            if (!frappe.pos_interface_builder.manager_login || frappe.pos_interface_builder.manager_login == undefined) {
                await frappe.pos_interface_builder.show_popup('manager_override')
                if (frappe.pos_interface_builder.manager_login) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });

    }


    /**
     * Function to be called after the customer is changed.
     */
    afterCustomerChange() {
        let selection = customer_search_grid.getSelection();
        if (selection.focused) {
            let selected_customer = customer_search_grid.getRowData(selection.focused.id);
            frappe.msgprint(`Customer changed to ${selected_customer.customer_name}}`);
            // var item_list = [this.pos_interface.selected_item_row["name"]];

            // this.remove_item("POS Invoice Item", item_list);
        }
    }
    async add_pos_invoice_customer(customer, pos_invoice, customer_name) {
        this.beforeCustomerChange();
        super.add_pos_invoice_customer(customer, pos_invoice, customer_name);
        //this.afterCustomerChange();
    }
    async changePrice() {
        var row_name = cur_frm.doc.items[0].name;
        try {
            debugger
            await this.edit_pos_invoice_item_row(this.pos_invoice_name, row_name, "Price Override", "1.00", true);
            // await this.concurrent_edit_pos_invoice_item_row(
            //     this.pos_invoice_name,
            //     row_name,
            //     "Price Override",
            //     '1.00');
        } catch (error) {
            console.error("Error in changePrice:", error);
        }
    }
    on_button_click(cmd) {
        // debugger;
        super.on_button_click(cmd);
        // this.pos_interface.show_popup("transaction_item_attribute");
        // this.SetLineAttribute();
        // this.GetSaleAttribute();

        // this.SetSaleAttribute();
    }
    async changeCustomer() {
        try {
            await frappe.pos_interface_builder.pos_commands.add_pos_invoice_customer(
                'C0019',
                cur_frm.doc.name,
                'C0019'
            ).then(() => {
                frappe.msgprint({ message: "{{ _('Customer Changed on POS.', '', 'iVendNext') }}", indicator: "green" });
            });
        }
        catch (error) {
            frappe.msgprint({ message: error, indicator: "red" });
        }
    }
    async changeLineDiscount() {//Line Discount Percentage
        var row_name = cur_frm.doc.items[0].name;
        try {
            debugger
            await this.edit_pos_invoice_item_row(this.pos_invoice_name, row_name, "Line Discount Percent", "1.00", true);
        } catch (error) {
            console.error("Error in changePrice:", error);
        }
    }
    async changeLineDiscountAmount() {//Line Discount Amount
        var row_name = cur_frm.doc.items[0].name;
        try {
            debugger
            await this.edit_pos_invoice_item_row(this.pos_invoice_name, row_name, "Line Discount Amount", "1.00", true);
        } catch (error) {
            console.error("Error in changePrice:", error);
        }
    }
    async changeSaleDiscount() {//Sale Discount Amount/Percent
        var row_name = cur_frm.doc.items[0].name;
        try {
            //await this.edit_pos_invoice_doc(this.pos_invoice_name, "Total Discount Amount", "1.00", true);
            await this.edit_pos_invoice_doc(this.pos_invoice_name, "Total Discount Percent", "1.00", true);
        } catch (error) {
            console.error("Error in changePrice:", error);
        }
    }
    async changePOSMode() {//Change POS Mode
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
        this.recall_suspended_transaction(['RET-PSINV-2025-00168'])   //
    }
    _complete_transaction(profile_id, pos_invoice_name, quick_cash) {

        // var me = this;
        // frappe.msgprint(me);
        super._complete_transaction(profile_id, pos_invoice_name, quick_cash);
        // this.pos_interface.show_popup("sale_attribute");
        // this.pos_interface.show_popup("transaction_item_attribute");

    }
    SetSaleAttribute() {
        var attribute_idx = cur_frm.doc.custom_pos_invoice_sale_attribute.findIndex(
            (x) => x.sale_attribute == "SaleAttribute1");
        cur_frm.doc.custom_pos_invoice_sale_attribute[attribute_idx]["attribute_value"] = "Avn";
        attribute_idx = cur_frm.doc.custom_pos_invoice_sale_attribute.findIndex(
            (x) => x.sale_attribute == "SaleAttribute2");
        cur_frm.doc.custom_pos_invoice_sale_attribute[attribute_idx]["attribute_value"] = "Avn";
    }
    GetSaleAttribute() {
        var attribute_idx = cur_frm.doc.custom_pos_invoice_sale_attribute.findIndex(
            (x) => x.sale_attribute == "SaleAttribute1");
        console.log(cur_frm.doc.custom_pos_invoice_sale_attribute[attribute_idx]["attribute_value"]);
    }
    SetLineAttribute() {
        var attribute_idx = cur_frm.doc.custom_pos_invoice_transaction_item_attribute.findIndex(
            (x) => x.transaction_item_attribute == "ItemAttribute1");
        if (attribute_idx < 0) {
            var row_name = cur_frm.doc.items[0];
            cur_frm.doc.custom_pos_invoice_transaction_item_attribute.push({
                transaction_item_attribute: 'ItemAttribute1',
                attribute_value: 'Avnish Verma',
                item_ref: row_name["item_code"],
                item_id_ref: row_name["name"],
                row_no_ref: row_name["idx"],
                docstatus: 0,
                doctype: "POS Invoice Transaction Item Attribute",
                name: frappe.utils.get_random(10),
                parentfield: "custom_pos_invoice_transaction_item_attribute",
                parenttype: "POS Invoice",
            });
            // item_attribute_exist_dict[field.attribute_name] = true;
        } else
            cur_frm.doc.custom_pos_invoice_transaction_item_attribute[attribute_idx]["attribute_value"] = "Avn";
        // attribute_idx = cur_frm.doc.custom_pos_invoice_transaction_item_attribute.findIndex(
        //     (x) => x.transaction_item_attribute == "ItemAttribute2");
        // cur_frm.doc.custom_pos_invoice_transaction_item_attribute[attribute_idx]["attribute_value"] = "Avn";
        // var row_name = cur_frm.doc.items[0].name;
        // if (item_attribute_exist_dict && item_attribute_exist_dict[field.attribute_name]) {
        //     attribute_idx = cur_frm.doc.custom_pos_invoice_transaction_item_attribute.findIndex(
        //         (x) => x.transaction_item_attribute == field.attribute_name && x.item_ref == trx_item_attr_sel_item["item_code"] && x.item_id_ref == trx_item_attr_sel_item["name"]
        //     );
        //     cur_frm.doc.custom_pos_invoice_transaction_item_attribute[attribute_idx]["attribute_value"] = transaction_item_attribute_form.value?.[field.dataField] || "";
        // } else {
        //     if (transaction_item_attribute_form.value?.[field.dataField]) {
        //         cur_frm.doc.custom_pos_invoice_transaction_item_attribute.push({
        //             transaction_item_attribute: field.attribute_name,
        //             attribute_value: transaction_item_attribute_form.value[field.dataField],
        //             item_ref: trx_item_attr_sel_item["item_code"],
        //             item_id_ref: trx_item_attr_sel_item["name"],
        //             row_no_ref: trx_item_attr_sel_item["idx"],
        //             docstatus: 0,
        //             doctype: "POS Invoice Transaction Item Attribute",
        //             name: frappe.utils.get_random(10),
        //             parentfield: "custom_pos_invoice_transaction_item_attribute",
        //             parenttype: "POS Invoice",
        //         });
        //         item_attribute_exist_dict[field.attribute_name] = true;
        //     }
        // }

    }

    insertDataIntoUDT() {

        invoiceloggingsubsystem.insert_record("trx001", "qrcode");

        // frappe.call({
        //     method: "frappeextensibilitysampleapp.udtsubsystemsapi.insert_udt_record",
        //     args: {
        //         transactionkey: "Trx001",
        //         qrcode: "QrCode"
        //     },
        //     callback: function(response) {
        //         if (response.message.status === "success") {
        //             frappe.msgprint(response.message.message);
        //         } else {
        //             frappe.msgprint(`Error: ${response.message.message}`);
        //         }
        //     }
        // });
    }

    getDataFromUDT() {
        // Get from UDT   
        frappe.call({
            method: "frappeextensibilitysampleapp.udtsubsystemsapi.get_udt_records",
            callback: function (response) {
                if (response.message && response.message.length > 0) {
                    let message = response.message
                        .map(row => `${row.column1} - ${row.column2}`)
                        .join("\n");
                    frappe.msgprint(`UDT Records:\n${message}`);
                } else {
                    frappe.msgprint("No records found in UDT table.");
                }
            }
        });

        /*
            results =invoiceloggingsubsystem.get_records();
            if (results && Array.isArray(results)) {
                let message = results.map(row => `${row.transactionkey || 'N/A'} - ${row.qrcode || 'N/A'}`).join("\n");
                frappe.msgprint(`UDT Records:\n${message}`);
            } 
            else {
                frappe.msgprint("No records found in UDT table.");
            }
            */


    }

}