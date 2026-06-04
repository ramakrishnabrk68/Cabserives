import { LightningElement, wire } from 'lwc';
import bookingmethod from '@salesforce/apex/banKpagesclass.bookingmethod';
import { updateRecord, deleteRecord } from 'lightning/uiRecordApi'; // ✅ deleteRecord imported
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const COLUMNS = [
    { label: 'Booking Name', fieldName: 'Name', type: 'text' },
    { label: 'Driver Name', fieldName: 'DriverName', type: 'text', editable: true },
    { label: 'Customer Name', fieldName: 'CustomerName', type: 'text', editable: true },
    { label: 'Status', fieldName: 'Status__c', type: 'text', editable: true },
    { label: 'Vehicle Name', fieldName: 'vechical__c', type: 'text', editable: true },
    { label: 'Booking Date', fieldName: 'Booking_Date__c', type: 'date', editable: true },
    { label: 'Booking Time', fieldName: 'Booking_Time__c', type: 'time', editable: true },
    {
        // ✅ Row-action column so each row has its own Delete button
        type: 'action',
        label: 'Delete',
        typeAttributes: {
            rowActions: [{ label: 'Delete', name: 'delete', iconName: 'utility:delete' }]
        } 
    }
];

export default class Bookingmethod extends LightningElement {
    data = [];
    columns = COLUMNS;
    draftValues = [];

    // ✅ Store the full wire result so refreshApex works correctly
    wiredBookings;

    @wire(bookingmethod)
    wiredmethod(result) {
        this.wiredBookings = result; // ✅ save the wire result object
        const { data, error } = result;
        if (data) {
            // Flatten relationship fields for datatable display
            this.data = data.map(record => ({
                ...record,
                DriverName: record.Driver__r?.Name || '',
                CustomerName: record.New_customer__r?.Name || '',
                VehicleName: record.Vehicle__r?.Name || ''
            }));
        } else if (error) {
            console.error('Error fetching bookings:', error);
            this.data = [];
        }
    }

    // ─── Inline Edit / Save ───────────────────────────────────────────────────
    // handleSave(event) {
    //     const updatedFields = event.detail.draftValues;
    //     const recordInputs = updatedFields.map(field => {
    //         const recordInput = { fields: { Id: field.Id || field.id } };
    //         if (field.DriverName) {
    //             recordInput.fields.Driver__c = this.getIdByName(field.DriverName, 'Driver__c');
    //         }
    //         if (field.CustomerName) {
    //             recordInput.fields.New_customer__c = this.getIdByName(field.CustomerName, 'New_customer__c');
    //         }
    //         if (field.VehicleName) {
    //             recordInput.fields.Vehicle__c = this.getIdByName(field.VehicleName, 'Vehicle__c');
    //         }
    //         if (field.Status__c) {
    //             recordInput.fields.Status__c = field.Status__c;
    //         }
    //         if (field.Booking_Date__c) {
    //             recordInput.fields.Booking_Date__c = field.Booking_Date__c;
    //         }
    //         if (field.Booking_Time__c) {
    //             recordInput.fields.Booking_Time__c = field.Booking_Time__c;
    //         }
    //         return recordInput;
    //     });
    //     Promise.all(recordInputs.map(ri => updateRecord(ri)))
    //         .then(() => {
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Success',
    //                     message: 'Records updated successfully',
    //                     variant: 'success'
    //                 })
    //             );
    //             this.draftValues = [];
    //             return refreshApex(this.wiredBookings); // ✅ correct reference
    //         })
    //         .catch(error => {
    //             console.error('Error updating records:', error);
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Error',
    //                     message: 'An error occurred while updating records',
    //                     variant: 'error'
    //                 })
    //             );
    //         });
    // }

    // handlecancel() {
    //     this.draftValues = [];
    // }

    // handlesavebtn() {
    //     this.handleSave({ detail: { draftValues: this.draftValues } });
    // }

    // getIdByName(name, field) {
    //     const key = field.replace('__c', 'Name'); // e.g. Driver__c → DriverName
    //     const record = this.data.find(item => item[key] === name);
    //     return record ? record.Id : null;
    // }
    // ─── Row-Action Delete ────────────────────────────────────────────────────
    // ✅ Called by onrowaction on the datatable — receives the exact row's Id
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if (actionName === 'delete') {
            deleteRecord(row.Id)
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Record deleted successfully'+ row.Id,
                            variant: 'success'
                        })
                    );
                    return refreshApex(this.wiredBookings); // ✅ correct reference
                })
                .catch(error => {
                    console.error('Error deleting record:', error);
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message: 'An error occurred while deleting the record',
                            variant: 'error'
                        })
                    );
                });
        }
    }
}