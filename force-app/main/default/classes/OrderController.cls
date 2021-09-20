public with sharing class OrderController {
    @AuraEnabled(cacheable=true)
    public static List<Order__c> getListOfOrders() {
    List<Order__c> orderList=new List<Order__c>();
    orderList=[ SELECT Id, AccountId__c, Name, TotalProductCount__c, TotalPrice__c FROM Order__c ];
      return orderList;
    }
}
