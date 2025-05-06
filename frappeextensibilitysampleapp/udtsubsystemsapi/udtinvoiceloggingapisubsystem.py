import frappe
from frappeextensibilitysampleapp.udtsubsystems.udtinvoiceloggingsubsystem import invoiceloggingsubsystem

@frappe.whitelist()
def insert_udt_record(transactionkey, qrcode):
    return invoiceloggingsubsystem.insert_record(transactionkey, qrcode)

@frappe.whitelist()
def get_udt_records():
    return invoiceloggingsubsystem.get_records()

@frappe.whitelist()
def update_udt_record(name, qrcode):
    invoiceloggingsubsystem.update_record(name, qrcode)
    return "Updated Successfully"

@frappe.whitelist()
def delete_udt_record(name):
    invoiceloggingsubsystem.delete_record(name)
    return "Deleted Successfully"
