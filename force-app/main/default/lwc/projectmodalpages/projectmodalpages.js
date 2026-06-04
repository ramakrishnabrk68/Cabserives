import { LightningElement } from 'lwc';
import { NavigationMixin } from "lightning/navigation";
 import CabBooking from '@salesforce/resourceUrl/CabBooking';
 import Rescheduled from '@salesforce/resourceUrl/Rescheduled';
 import Cancelled from '@salesforce/resourceUrl/Cancelled';
export default class Projectmodalpages extends NavigationMixin(LightningElement) {
    // isModalOpen = false;
    // showbtns = false;
    // showbtnsrs = false;
    // showbtnscl = false;
        booKing = CabBooking; 
        Rescheduled = Rescheduled;   
        Cancelled = Cancelled;
    handleClick() {
        this.isModalOpen = ! this.isModalOpen ? true : false;
    }
    handlecancelbtn() {
        this.isModalOpen = false;
    }
     handleClickbtn(){
        this.showbtns = ! this.showbtns ? true : false;
     }  
     handleClickbtnrs(){
                this.showbtnsrs = ! this.showbtnsrs ? true : false;

     } 
        handleClickbtncl(){     
                this.showbtnscl = ! this.showbtnscl ? true : false;
                
     }
     //navigation to another page using navigation mixin
     handleClicknew(){
       const pageref = {
        type : 'standard__objectPage',
        attributes : {
            objectApiName :'Booking__c',
            actionName : 'new'
        }
       };
       this[NavigationMixin.Navigate](pageref);
     }
     handleClicrs(){
        const pageresc = {
         type : 'standard__objectPage',
         attributes : {
             objectApiName :'Reschedule__c',
             actionName : 'new'
         }
        };
        this[NavigationMixin.Navigate](pageresc);   
}
}
     

