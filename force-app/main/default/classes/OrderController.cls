public with sharing class OrderController {
    @AuraEnabled
    public static Id createOrder(String orderJSON) {
        
        OrderWrapper wrappedOrder = (OrderWrapper) JSON.deserialize(orderJSON, OrderWrapper.class);

        Order__c order = new Order__c(AccountId__c = wrappedOrder.accountId);
        insert order;

        List<OrderItem__c> orderItems = getOrderItems(wrappedOrder, order.Id);
        insert orderItems;

        return order.Id;
    }

    private static List<OrderItem__c> getOrderItems(OrderWrapper wrappedOrder, Id orderId) {
        List<OrderItem__c> orderItems = new List<OrderItem__c>();
        
        for(OrderItemWrapper wrappedOrderItem : wrappedOrder.orderItems) {
            OrderItem__c orderItem = new OrderItem__c(
                OrderId__c   = orderId,
                ProductId__c = wrappedOrderItem.productId,
                Quantity__c  = wrappedOrderItem.quantity,
                Price__c     = wrappedOrderItem.price * wrappedOrderItem.quantity
            );
            
            orderItems.add(orderItem);
        }
        
        return orderItems;
    }

    public class OrderWrapper {
        
        @AuraEnabled
        public String accountId {get; set;}

        @AuraEnabled
        public List<OrderItemWrapper> orderItems {get; set;}

    }

    public class OrderItemWrapper {
        
        @AuraEnabled
        public String orderId {get;set;}
        
        @AuraEnabled
        public String productId {get;set;}
        
        @AuraEnabled
        public Integer quantity {get;set;}
    
        @AuraEnabled
        public Decimal price {get;set;}

    }
}

// https://brave-panda-cj2d08-dev-ed.lightning.force.com
//   https://brave-panda-cj2d08-dev-ed.lightning.force.com/lightning/setup/SetupOneHome/home
