trigger OrderItemTrigger on OrderItem__c (after insert) {
	List<OrderItem__c> inOrderItem = [SELECT Id, 
                                        OrderId__c,
                                        ProductId__c,
                                      	Price__c,
                                        Quantity__c 
                                        FROM OrderItem__c 
                                        WHERE Id in :Trigger.new];
	for (OrderItem__c OrderItem : inOrderItem) {
		OrderItem.Price__c = [SELECT Price__c 
                         		FROM Product__c 
                        		WHERE Id = :OrderItem.ProductId__c][0].Price__c;

		Order__c Order = [SELECT Id,
                          TotalPrice__c,
                          TotalProductCount__c
                          FROM Order__c
                          WHERE Id = :OrderItem.OrderId__c][0];
        
		Order.TotalPrice__c = Order.TotalPrice__c +
            					OrderItem.Price__c * OrderItem.Quantity__c;
        
		Order.TotalProductCount__c = Order.TotalProductCount__c + OrderItem.Quantity__c;
		update Order;
	}
	update inOrderItem;
}