@isTest
public with sharing class ProductControllerTest {
    
      @isTest
      static void getProductsListWithoutResultTest() {
        Test.startTest();
        List<Product__c> prodNameList = ProductController.getListOfProductsByName('Toy');
        Test.stopTest();
        System.assertEquals(0, prodNameList.size());
    }

      @isTest
      static void getProductsListWithoutResultTypeTest() {
        Test.startTest();
        List<Product__c> prodTypeList = ProductController.getListOfProductsByType('5');
        Test.stopTest();
        System.assertEquals(0, prodTypeList.size());
    }

    @isTest
    static void getProductsListWithoutResultFamilyTest() {
      Test.startTest();
      List<Product__c> prodFamilyList = ProductController.getListOfProductsByFamily('5');
      Test.stopTest();
      System.assertEquals(0, prodFamilyList.size());
  }

}

