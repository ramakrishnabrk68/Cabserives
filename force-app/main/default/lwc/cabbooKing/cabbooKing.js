import { LightningElement } from 'lwc';
import Location from '@salesforce/resourceUrl/Location';
 import CabBooking from '@salesforce/resourceUrl/CabBooking';
 import Rescheduled from '@salesforce/resourceUrl/Rescheduled';
 import carouselimage from '@salesforce/resourceUrl/carouselimage';


import andhrapradesh from '@salesforce/resourceUrl/andhrapradesh';
export default class CabbooKing extends LightningElement {
    Location = Location;
    andhrapradesh = andhrapradesh;
    booKing = CabBooking;  
     Rescheduled = Rescheduled; 
     carouselimage =carouselimage;

    
}