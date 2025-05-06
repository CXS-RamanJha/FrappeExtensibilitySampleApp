import frappe
import uuid

class invoiceloggingsubsystem:
    @staticmethod
    def insert_record(transactionkey, qrcode):
        
        name = str(uuid.uuid4())  # Generate a unique ID
        frappe.db.sql("""
            INSERT INTO `tabU_InvoiceLogging` (name, transactionkey, qrcode)
            VALUES (%s, %s, %s)
        """, (name, transactionkey, qrcode))
        frappe.db.commit()
        return name

    @staticmethod
    def get_records():
        
        return frappe.db.sql("""
            SELECT name, transactionkey, qrcode FROM `tabU_InvoiceLogging`
        """, as_dict=True)

    @staticmethod
    def update_record(name, qrcode):
        
        frappe.db.sql("""
            UPDATE `tabU_InvoiceLogging` SET qrcode = %s WHERE name = %s
        """, (qrcode, name))
        frappe.db.commit()

    @staticmethod
    def delete_record(name):
        
        frappe.db.sql("""
            DELETE FROM `tabU_InvoiceLogging` WHERE name = %s
        """, (name,))
        frappe.db.commit()
