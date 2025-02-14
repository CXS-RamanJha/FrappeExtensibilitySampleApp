//frappe.provide("frappe.ui");
frappe.provide("ivend.confirm");
frappe.provide("frappe.ui");
// frappe.override(frappe.pos_interface_builder.pos_commands.validate_add_pos_item, function (item_list, redirect_to_profile) {
//     return function () {
//         alert();
//         original.apply(this, arguments); // Call original function
//         console.log("Custom logic after calculating total");
//     };
// });
frappe.ui.POSCommandsBuilder = class CustomPOSCommandsBuilder extends frappe.ui.POSCommandsBuilder {
    async add_pos_invoice_item(
        item_list,
        pos_invoice,
        redirect_to_profile,
        user_defined_gc_number,
        weighted_qty = 1
    ) {
        console.log("Custom add_pos_invoice_item function executed!");
        alert("Before Customer Change");
        super.add_pos_invoice_item(item_list, pos_invoice, redirect_to_profile, user_defined_gc_number, weighted_qty); // Call the original method
    }
    validate_add_pos_item(item_list, redirect_to_profile) {
        console.log("Custom calculate_total function executed!");
        super.validate_add_pos_item(item_list, redirect_to_profile); // Call the original method
    }
    beforeCustomerChange() {
        alert("Before Customer Change");
    }
    afterCustomerChange() {
        alert("after Customer Change");
    }
}