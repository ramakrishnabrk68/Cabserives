    import { LightningElement, api,wire } from 'lwc';
    import reschedulemethod from '@salesforce/apex/rescheduleclass.reschedulemethod';
    import { ShowToastEvent } from 'lightning/platformShowToastEvent';
    import { deleteRecord } from 'lightning/uiRecordApi';
    import { refreshApex } from '@salesforce/apex';
    import { updateRecord } from 'lightning/uiRecordApi';
    import NAME_FIELD from '@salesforce/schema/Reschedule__c.Name';
    import  BOOkING_FIELD from '@salesforce/schema/Reschedule__c.Booking__c';
    import VECHICAL_FIELD from '@salesforce/schema/Booking__c.vechical__c';
    import DRIVER_FIELD from '@salesforce/schema/Booking__c.Driver__c';
    import OLDRESHECDULEDATE_FIELD  from '@salesforce/schema/Reschedule__c.OldRescheduleDate__c';
    import NEWRESHECDULEDATE_FIELD from '@salesforce/schema/Reschedule__c.NewRescheduleDate__c';
    import REASON_FIELD from '@salesforce/schema/Reschedule__c.Reschedule_Reason__c'; 
    import RESCHEDULESTATUS_FIELD from '@salesforce/schema/Reschedule__c.Reschedule_Status__c';
    import APPROVEDBY_FIELD from '@salesforce/schema/Reschedule__c.Approved_By__c';
    import REJECTEDBY_FIELD from '@salesforce/schema/Reschedule__c.Rejected_By__c';
     
    export default class Reshedulechild extends LightningElement {
         Reschedule__c;
        @api recordId;
        wiredrescheduleResult; // Store the full provisioned value
        @wire(reschedulemethod, {recordId: '$recordId'})
        wiredreschedule(result) {
            this.wiredrescheduleResult = result;
            const {data, error} = result;
        }
    handleSubmit(event){
        event.preventDefault();
        const fields=event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit();

    }
    // handlecancel(event){
    //     event.preventDefault();
    //     this.template.querySelector('lightning-record-edit-form').reset(wiredrescheduleResult);
    // }
    handlecancel(event) {
    event.preventDefault();

    const inputFields = this.template.querySelectorAll(
        'lightning-input-field'
    );

    if (inputFields) {
        inputFields.forEach(field => {
            field.reset();
        });
    }
}
    handleSuccess(event){
        this.dispatchEvent(
            new ShowToastEvent({
                title:'Success',
                message:'Reschedule Created Successfully'+ '' + event.detail.id,
                variant:'success'
            })
        );
        refreshApex(this.wiredrescheduleResult);   
    }
    
    }