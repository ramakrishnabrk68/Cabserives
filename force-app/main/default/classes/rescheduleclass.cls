public with sharing class rescheduleclass {
   @AuraEnabled(cacheable=true)
   public static list<Reschedule__c> reschedulemethod(){
   return [SELECT Id, Name, Booking__r.Name, vechical__r.Name, Driver__r.Name, OldRescheduleDate__c, NewRescheduleDate__c, Reschedule_Reason__c,
    Reschedule_Status__c, Approved_By__r.Name, Rejected_By__r.Name FROM Reschedule__c];
}
}