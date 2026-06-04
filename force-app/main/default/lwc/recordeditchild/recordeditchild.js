import { LightningElement,api, wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import recordEditMethod from '@salesforce/apex/banKpagesclass.recordEditMethod';
import { refreshApex } from '@salesforce/apex'; 
import NAME_FIELD from '@salesforce/schema/Booking__c.Name';
 import DRIVER_FIELD from '@salesforce/schema/Booking__c.Driver__r.name';
import CUSTOMER_FIELD from '@salesforce/schema/Booking__c.New_customer__r.name';
import STATUS_FIELD from '@salesforce/schema/Booking__c.Status__c';
import PICkUPLOCATION_FIELD from '@salesforce/schema/Booking__c.Pickup_Location__c';
import DROPLACTION_FIELD from '@salesforce/schema/Booking__c.Drop_Location__c';
import VECHICAL_FIELD from '@salesforce/schema/Booking__c.vechical__r.name';
import BOOKINGTIME_FIELD from '@salesforce/schema/Booking__c.Booking_Time__c';
import BOOKINGDATE_FIELD from '@salesforce/schema/Booking__c.Booking_Date__c';    
export default class Recordeditchild extends LightningElement {
@api recordId;
Booking__c;
wiredBookingResult; // Store the full provisioned value
@wire(recordEditMethod, {recordId: '$recordId'})
wiredBooking(result) {
    this.wiredBookingResult = result;
    const {data, error} = result;
    
}
// Then: refreshApex(this.wiredBookingResult);
handleSuccess( event){
    this.dispatchEvent(
        new ShowToastEvent({
            title:'Success',
            message:'Booking Updated Successfully'+ '' + event.detail.id,
            variant:'success'
        })
    );
    refreshApex(this.wiredBookingResult);   
}
saveBooking(event){
    event.preventDefault();
    const fields=event.detail.fields;
    this.template.querySelector('lightning-record-edit-form').submit();
    }

handlereset(event){
    event.preventDefault();
    this.template.querySelector('lightning-record-edit-form').reset();
}
}
