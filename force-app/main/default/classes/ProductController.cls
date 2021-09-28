public with sharing class ProductController {
   
    @AuraEnabled(cacheable=true)
    public static List<Product__c> getListOfProductsByName(string searchKey) {
      string key = '%' + searchKey + '%';
      return [ SELECT Id, Name, Description__c, Type__c, Family__c, Image__c, Price__c FROM Product__c  WHERE Name LIKE: key ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Product__c> getListOfProductsByType(string type) {
      string typeProduct = '%' + type + '%';
      return [ SELECT Id, Name, Description__c, Type__c, Family__c, Image__c, Price__c FROM Product__c  WHERE Type__c LIKE: typeProduct ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Product__c> getListOfProductsByFamily(string family) {
      string familyType = '%' + family + '%';
      return [ SELECT Id, Name, Description__c, Type__c, Family__c, Image__c, Price__c FROM Product__c  WHERE Family__c LIKE: familyType ];
    }

    @AuraEnabled(cacheable=true)
    public static Product__c getListOfProductsById(String id) {
      String productId = id;
      return [ SELECT Id, Name, Description__c, Type__c, Family__c, Image__c, Price__c FROM Product__c WHERE Id = :productId ]; 
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsList() {
    List<Contact> conList=new List<Contact>();
    conList=[ SELECT Id, Name FROM Contact LIMIT 10 ];
      return conList;
  }
    // ID contactId = [Select contactid from User where id =: Userinfo.getUserid()].contactId;
    // ID AccID  = [Select AccountID from Contact where id =: contactId].AccountId;
}

// https://brave-panda-cj2d08-dev-ed.lightning.force.com
//   https://brave-panda-cj2d08-dev-ed.lightning.force.com/lightning/setup/SetupOneHome/home
