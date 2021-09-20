public with sharing class OrderItemController {
    @AuraEnabled(cacheable=true)
    public static List<OrderItem__c> getListOfOrderItems() {
    List<OrderItem__c> orderItemList=new List<OrderItem__c>();
    orderItemList=[ SELECT Id, OrderId__c, ProductId__c, Quantity__c, Price__c FROM OrderItem__c ];
      return orderItemList;
    }
}
