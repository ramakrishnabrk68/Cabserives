import { LightningElement,api,wire } from 'lwc';
import reschedulemethod from '@salesforce/apex/rescheduleclass.reschedulemethod';
import { updateRecord, deleteRecord } from 'lightning/uiRecordApi'; // ✅ deleteRecord imported
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
const columnslist = [
    {label:'Name' , fieldName:'Name', type:'text'},
    {label:'Booking Name' , fieldName:'Booking__r.Name', type:'text'},
    {label:'Vechical Name' , fieldName:'vechical__r.Name', type:'text'},
    {label:'Driver Name', fieldName:'Driver__r.Name',type:'text'},
    {label:'Old Reschedule Date', fieldName:'OldRescheduleDate__c', type:'date'},
    {label:'New Reschedule Date', fieldName:'NewRescheduleDate__c', type:'date'},
    {label:'Reschedule Reason', fieldName:'Reschedule_Reason__c', type:'text'},
    {label:'Reschedule Status', fieldName:'Reschedule_Status__c', type:'text'},
    {label:'Approved By', fieldName:'Approved_By__r.Name', type:'text'},
    {label:'Rejected By', fieldName:'Rejected_By__r.Name', type:'text'} ,
    {
        type:'action',
        label:'Delete',
        typeAttributes:{
            rowActions:[{label:'Delete', name:'delete', iconName:'utility:delete'}]
        }       
    }
];
export default class Reschedule extends LightningElement {
    data =[];
    columns = columnslist;
    draftValues = [];
    wiredReschedule;
    @wire(reschedulemethod)
    wiredmethod(result){
        this.wiredReschedule = result;
        const {data,error} = result;
        if(data){
            this.data= data.map(record=>({
                ...record,
                'Booking__r.Name': record.Booking__r?.Name || '',
                'vechical__r.Name': record.vechical__r?.Name || '',
                'Driver__r.Name': record.Driver__r?.Name || '',
                'Approved_By__r.Name': record.Approved_By__r?.Name || '',
                'Rejected_By__r.Name': record.Rejected_By__r?.Name || ''
            }));
        }else if(error){
            console.error('Error fetching reschedule records:', error);
            this.data = [];
            
        }
    }
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
                        return refreshApex(this.wiredReschedule); // ✅ correct reference
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
        handleRefreshbtn(){
            return refreshApex(this.wiredReschedule);
        }

}