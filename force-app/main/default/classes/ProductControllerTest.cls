@isTest
public with sharing class ProductControllerTest {
    
  @testSetup
	static void createProducts() {
		List<Product__c> products = new List<Product__c>();
		products.add(new Product__c(
			Name = 'Product 1 test',
            Type__c = '2',
			Family__c = '1'
			)
		);
		products.add(new Product__c(
			Name = 'Product 2 test',
            Type__c = '3',
			Family__c = '2'
			)
		);
		products.add(new Product__c(
			Name = 'Product 3 test',
			Type__c = '1',
            Family__c = '3'
			)
		);
        products.add(new Product__c(
			Name = 'Product 4 test',
			Type__c = '3',
            Family__c = '1'
			)
		);
		insert products;
	}


	@isTest
	static void testFilters() {
		List<Product__c> result = ProductController.searchProducts('', '', '');
		System.assertEquals(result.size(), 4);
        
        result = ProductController.searchProducts('2', '', '2');
		System.assertEquals(result.size(), 1);
        
		result = ProductController.searchProducts('3', '1', '');
		System.assertEquals(result.size(), 1);
        
        result = ProductController.searchProducts('1', '2', '1');
		System.assertEquals(result.size(), 1);
        
        result = ProductController.searchProducts('test', '', '');
		System.assertEquals(result.size(), 4);
	}

	@isTest
	static void testSearch() {
		List<Product__c> result = ProductController.getAllProducts();
		System.assertEquals(result.size(), 4);
	}
}

