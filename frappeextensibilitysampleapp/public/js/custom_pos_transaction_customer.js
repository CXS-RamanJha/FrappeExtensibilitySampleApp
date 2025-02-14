frappe.provide("frappe.ui");

class CustomPOSCommandsBuilder extends frappe.ui.POSCommandsBuilder {
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
}

frappe.ui.POSCommandsBuilder = CustomPOSCommandsBuilder;
