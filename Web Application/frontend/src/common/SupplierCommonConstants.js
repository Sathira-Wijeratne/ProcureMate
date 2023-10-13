const constants = {
  // Strings
  PENDING_ORDERS: "Pending Orders",
  PENDING_ORDER: "Pending Order",
  SUPPLIER: "Supplier",
  INVOICES: "Invoices",
  MY_DELIVERY_LOG: "My Delivery Log",
  LOG_OUT: "Log Out",
  PO_ID_DASH_HASH: "PO ID - #",
  DELIVERY_INFORMATION: "Delivery Information",
  DO_ID: "DO ID",
  DASH_HASH_D_DASH: "- #D-",
  REQUESTED_QUANTITY: "Requested Quantity",
  DELIVERED_QUANTITY: "Delivered Quantity",
  SITE_ID: "Site ID",
  LOCATION: "Location",
  ITEM_NAME: "Item Name",
  INVOICE_DETAILS: "Invoice Details",
  INVOICE_NO: "Invoice No",
  DASH_HASH_IN_DASH: "- #IN-",
  UNIT_PRICE: "Unit Price",
  RS_DOT: "Rs.",
  QUANTITY: "Quantity",
  TOTAL_AMOUNT: "Total Amount",
  PROCEED: "Proceed",
  INVISIBLE: "Invisible",
  PO_ID: "PO ID",
  AMOUNT: "Amount",
  DATE: "Date",
  DELIVERY_DATE: "Delivery Date",
  HASH_IN_DASH: "#IN-",
  NO_PENDING_ORDERS: "No Pending Orders",
  NO_INVOICES: "No Invoices...",
  NO_DELIVERY_NOTES: "No Delivery Notes...",
  DUE_DATE: "Due Date",
  DELIVERY_NOTE: "Delivery Note",
  INVOICE: "Invoice",
  HASH_D: "#D",
  HASH: "#",
  SENT: "Sent",
  PENDING: "Pending",
  COMPLETED: "Completed",

  // Keys
  SESSION_KEY_SUPPLIER: "prMateReilppus",
  SESSION_KEY_SUPPLIER_ID: "supplierId",
  SESSION_KEY_SUPPLIER_NAME: "supplierName",
  SESSION_KEY_SUPPLIER_EMAIL: "supplierEmail",

  // URL
  BASE_URL: "http://localhost:8070",
  SUPPLIER_URL: "supplier",
  GET_ORDER_URL: "getorder",
  GET_ITEM_URL: "getitem",
  GET_INVOICES_URL: "getinvoices",
  GET_DELIVERY_NOTES_URL: "getdeliverynotes",
  GET_PENDINGS_ORDERS_URL: "getpendingorders",
  CREATE_DELIVERY_NOTE_URL: "createdeliverynote",
  CREATE_INVOICE_URL: "createinvoice",
  UPDATE_PURCHASE_ORDER_URL: "updatepurchaseorder",

  // Paths
  SUPPLIER_HOME_PATH: "supplierhome",
  PENDING_ORDERS_PATH: "pendingorders",
  INVOICES_PATH: "invoices",
  MY_DELIVERY_LOG_PATH: "mydeliverylog",

  // Messages
  WARNING_MESSAGE_QUANTITY_EXCEED:
    "You have been added goods more than requested quantity!",
  CONFIRM_MESSAGE_CREATING_DELIVERY_NOTE_AND_INVOICE:
    "Are you sure you want to proceed?\nThis process will create the invoice and send the delivery note.",
  PURCHASE_ORDER_COMPLETED: "Purchase Order Completed!",
  ERROR_UPDATING_PURCHASE_ORDER: "Error in updating purchase order.",
  ERROR_CREATING_INVOICE: "Error in creating invoice.",
  ERROR_CREATING_DELIVERY_NOTE: "Error in creating delivery note.",
};

export default constants;
