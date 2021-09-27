public with sharing class UserController {
    @AuraEnabled(cacheable=true)
    public static List<User> getListOfUsers() {
    List<User> usersList=new List<User>();
        usersList=[ SELECT isManager__c FROM User ];
        return usersList;
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getListOfAccounts() {
        List<Account> accList=new List<Account>();
        accList = [ SELECT Name, AccountNumber FROM Account ];
        return accList;
    }
}
