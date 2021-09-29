public with sharing class ProductController {

  @AuraEnabled(Cacheable=true)
	public static Product__c[] getAllProducts() {
		return [SELECT Id, Name, Description__c, Family__c, Type__c
		FROM Product__c ORDER BY Name LIMIT 50];
	}

	@AuraEnabled(Cacheable=true)
	public static Product__c[] searchProducts(String searchTerm, String filterType, String filterFamily) {
		searchTerm = searchTerm.trim();
		if (searchTerm == '' && filterFamily == '' && filterType == '') {
			return getAllProducts();
		}
		searchTerm = '%'+ searchTerm +'%';
		if (filterType == '' && filterFamily != '')
		{
			filterFamily = '%'+ filterFamily +'%';
			return [SELECT Id, Name, Description__c, Family__c, Type__c
			FROM Product__c
			WHERE Name LIKE :searchTerm
			AND Family__c LIKE :filterFamily
			ORDER BY Name LIMIT 50];
		}
		else if (filterType != '' && filterFamily == '')
		{
			filterType = '%'+ filterType +'%';
			return [SELECT Id, Name, Description__c, Family__c, Type__c
			FROM Product__c
			WHERE Name LIKE :searchTerm
			AND Type__c LIKE :filterType
			ORDER BY Name LIMIT 50];
		}
		else if (filterType != '' && filterFamily != '')
		{
			filterType = '%'+ filterType +'%';
			filterFamily = '%'+ filterFamily +'%';
			return [SELECT Id, Name, Description__c, Family__c, Type__c
			FROM Product__c WHERE Name LIKE :searchTerm
			AND Type__c LIKE :filterType
			AND Family__c LIKE :filterFamily
			ORDER BY Name LIMIT 50];
		}
		else
		{
			// Execute search query without filters
			return [SELECT Id, Name, Description__c, Family__c, Type__c
			FROM Product__c
			WHERE Name LIKE :searchTerm
			ORDER BY Name LIMIT 50];
		}
	}

    @AuraEnabled(cacheable=true)
    public static Product__c getListOfProductsById(String id) {
      String productId = id;
      return [ SELECT Id, Name, Description__c, Type__c, Family__c, Image__c, Price__c FROM Product__c WHERE Id = :productId ]; 
    }
}