@IsTest
private class OrderItemTriggerTest {
    @testSetup
	public static void createOrder() {
		Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        User u = new User(Alias = 'tests', Email='testesestr@testtesteets.com', 
            EmailEncodingKey='UTF-8', LastName='Testingtest', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, isManager__c = true, 
            TimeZoneSidKey='America/Los_Angeles', UserName='testesestr@testtesteets.com');
		insert u;

		List<Account> accounts = new List<Account>{
			new Account(
				Name = 'Account to test 123',
				AccountNumber = '123456',
				OwnerId = UserInfo.getUserId()
			)};
		insert accounts;

		List<Product__c> products = new List<Product__c> {
			new Product__c(
				Name = 'Product 1 test',
            	Type__c = '1',
				Family__c = '1',
                Price__c = 20
			),
			new Product__c(
				Name = 'Product 2 test',
            	Type__c = '2',
				Family__c = '2',
                Price__c = 30
			)};
		insert products;

		List<Order__c> orders = new List<Order__c>{
			new Order__c(
				Name = 'Order to test',
				AccountId__c = accounts[0].Id,
				TotalPrice__c = 0,
                TotalProductCount__c = 0
			)};
		insert orders;

		List<OrderItem__c> orderItems = new List<OrderItem__c>{
			new OrderItem__c(
				Name = 'Item to test 1',
				ProductId__c = products[0].Id,
				OrderId__c = orders[0].Id,
				Quantity__c = 2
			),
			new OrderItem__c(
				Name = 'Item to test 2',
				ProductId__c = products[1].Id,
				OrderId__c = orders[0].Id,
				Quantity__c = 2
			)};
		insert orderItems;
	}

	@isTest
	static void testOrderTrigger() {
		Order__c Order = [SELECT TotalPrice__c, TotalProductCount__c from Order__c LIMIT 1];
		System.assertEquals(100, Order.TotalPrice__c);
		System.assertEquals(4, Order.TotalProductCount__c);
	}
}
