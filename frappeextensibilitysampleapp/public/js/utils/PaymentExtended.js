frappe.provide("frappe.ui");

frappe.ui.POSCommandsBuilder = class CustomPosCommandsBuilder extends frappe.ui.POSCommandsBuilder {
    async add_payment_by_code(cmd) {
        
        frappe.msgprint("Adding Payment");
        
        await this.AddPayment();
       

        frappe.msgprint("Payment added successfully!");
    }

     async AddPayment() {        
       await frappe.pos_interface_builder.pos_commands.add_payment_amount_to_pos(            
            cur_frm.doc.name,
            "Pay By Cash",
            {
                amount: 10
            },
            cur_frm.doc.currency,
            false,
            false
        );
   
    }

    async add_payment_amount_to_pos(
		pos_invoice,
		pos_command,
		field_value_dict,
		cash_currency,
		quick_cash,
		redirect_to_profile	){
            before_add_payment_amount_to_pos(
                pos_invoice,
                pos_command,
                field_value_dict,
                cash_currency,
                quick_cash,
                redirect_to_profile
            );
            super.add_payment_amount_to_pos(
                pos_invoice,
                pos_command,
                field_value_dict,
                cash_currency,
                quick_cash,
                redirect_to_profile
            );
            afrer_add_payment_amount_to_pos(
                pos_invoice,
                pos_command,
                field_value_dict,
                cash_currency,
                quick_cash,
                redirect_to_profile
            );

    }

    before_add_payment_amount_to_pos(
        pos_invoice, pos_command,
		field_value_dict,
		cash_currency,
		quick_cash,
		redirect_to_profile    )     {
        console.log("Before Add Payment Amount to POS");
    }

    afrer_add_payment_amount_to_pos(
        pos_invoice, pos_command,
        field_value_dict,    cash_currency,
		quick_cash,
		redirect_to_profile    ) {
        console.log("After Add Payment Amount to POS");
    }
}