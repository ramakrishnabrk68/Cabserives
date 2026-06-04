public with sharing class banKpagesclass {
    @AuraEnabled(cacheable=true)
    public static list<Client__c>getclientmethod(){
        list<Client__c> clientquery = [SELECT Id, Name, DOB__c, Email__c, PhoneNumber__c, 
        Country__c, Occupation__c, skills__c, Amount__c, Count_of_related__c FROM Client__c];
        return clientquery;   
    }
@AuraEnabled(cacheable=true)
    public static list<Account> getaccountmethod(){
        list<Account> accountquery = [SELECT Id, Name, Industry, Phone FROM Account order by Name limit 10];
        return accountquery;   
    }  
    
    //search method for client
    @AuraEnabled(cacheable=true)
     public static list <Client__c> clientmethod (string  searchKey){
      return [SELECT Id, Name, Email__c, PhoneNumber__c, Country__c FROM Client__c 
              WHERE Name LIKE :('%' + searchKey + '%') ];
     }

     @AuraEnabled(cacheable=true)
     public static List<Booking__c> bookingmethod(){
            // Note: Ensure Vehicle__c field exists on Booking__c object in your org
            // If Vehicle__c field doesn't exist yet, remove Vehicle__r.Name from the query
            return [SELECT Id, Name, Driver__r.Name, New_customer__r.Name, Status__c, vechical__r.Name,Booking_Time__c,Booking_Date__c
                    FROM Booking__c ];
        } 
     
        // this class is a lightning Record Edit Apex class for the booking method in the bookingmethod LWC. It retrieves the list of bookings and their related fields such as driver name, customer name, status, and vehicle name. The method is annotated with @AuraEnabled(cacheable=true) to allow it to be called from the LWC and to enable caching for improved performance.
      @AuraEnabled(cacheable=true)
        public static list<Booking__c>recordEditMethod(){
        return[ SELECT Id, Name, Driver__r.Name, New_customer__r.Name, Status__c, vechical__r.Name,Booking_Time__c,Booking_Date__c
                FROM Booking__c ];

      }

      }
