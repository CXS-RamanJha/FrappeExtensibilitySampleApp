import frappe
def after_install():
   app_saleAttribute()
   app_transactionItemAttribute()

def after_migrate():
   app_saleAttribute()
   app_transactionItemAttribute()

def after_uninstall():
    removeApp_saleAttribute()
    removeApp_lineAttribute()

def removeApp_saleAttribute():
    remove_saleAttribute("SaleAttribute1")
    remove_saleAttribute("SaleAttribute2")

def removeApp_lineAttribute():
    remove_lineAttribute("ItemAttribute1")
    remove_lineAttribute("ItemAttribute2")

def app_saleAttribute():
    create_saleAttribute("SaleAttribute1",1)
    create_saleAttribute("SaleAttribute2",2)

def app_transactionItemAttribute():
    create_transactionItemAttribute("ItemAttribute1",1)
    create_transactionItemAttribute("ItemAttribute2",2)

def create_saleAttribute(attribute_name, sequence):
    # Check if the Attribute already exists
    existing_attr = frappe.db.exists("Sale Attribute", {"attribute_name": attribute_name})
    # Create a new Sale Attribute if it doesn't exist
    if not existing_attr:
        sale_attribute = frappe.get_doc({
            "doctype": "Sale Attribute",
            "attribute_name": attribute_name,
            "sequence": sequence,
            "validation_type": "No Validation",
            "default_value": "1122",
            "required": "1",
            "active": "1",
        }).insert()
        frappe.db.commit()  # Commit transaction to save record in the database
    else:
        print("Sale Attribute {attribute_name} already exists")

def create_transactionItemAttribute(attribute_name, sequence):
    # Check if the Attribute already exists
    existing_attr = frappe.db.exists("Transaction Item Attribute", {"attribute_name": attribute_name})
    # Create a new Transaction Item Attribute if it doesn't exist
    if not existing_attr:
        sale_attribute = frappe.get_doc({
            "doctype": "Transaction Item Attribute",
            "attribute_name": attribute_name,
            "sequence": sequence,
            "validation_type": "No Validation",
            "default_value": "1122",
            "required": "1",
            "active": "1",
        }).insert()
        frappe.db.commit()  # Commit transaction to save record in the database
    else:
        print("Transaction Item Attribute {attribute_name} already exists")

def remove_saleAttribute(attribute_name):
    # Check if the Attribute already exists
    existing_attr = frappe.db.exists("Sale Attribute", {"attribute_name": attribute_name})
    # Delete the Sale Attribute if it exist
    if not existing_attr:
        frappe.delete_doc("Sale Attribute", existing_attr)  # Deletes the document
        frappe.db.commit()  # Save changes
        print(f"Sale Attribute '{attribute_name}' deleted successfully!")
    else:
        print(f"Sale Attribute '{attribute_name}' not found.")


def remove_lineAttribute(attribute_name):
    # Check if the Attribute already exists
    existing_attr = frappe.db.exists("Transaction Item Attribute", {"attribute_name": attribute_name})
    # Delete the Line Attribute if it exist
    if not existing_attr:
        frappe.delete_doc("Transaction Item Attribute", existing_attr)  # Deletes the document
        frappe.db.commit()  # Save changes
        print(f"Transaction Item Attribute '{attribute_name}' deleted successfully!")
    else:
        print(f"Transaction Item Attribute '{attribute_name}' not found.")