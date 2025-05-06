import frappe

def execute():
    if not frappe.db.table_exists("tabU_InvoiceLogging"):
        frappe.db.sql("""
            CREATE TABLE `tabU_InvoiceLogging` (
                `name` VARCHAR(140) NOT NULL PRIMARY KEY,
                `transactionkey` VARCHAR(255),
                `qrcode` VARCHAR(255),
                `creation` DATETIME DEFAULT CURRENT_TIMESTAMP,
                `modified` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        """)
        frappe.db.commit()
