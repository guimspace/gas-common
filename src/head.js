var documentPropertiesService_ = PropertiesService.getDocumentProperties(),
    scriptPropertiesService_ = PropertiesService.getScriptProperties(),
    userPropertiesService_ = PropertiesService.getUserProperties();

var documentCacheService_ = CacheService.getDocumentCache(),
    scriptCacheService_ = CacheService.getScriptCache(),
    userCacheService_ = CacheService.getUserCache();

var AppsScriptGlobal = (function() {
  var o = {
    AddonVersionCode: 0,
    AddonVersionName: "",

    listNameMonth: [
      [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    ]
  };

  return {
    AddonVersionCode: function() { return o.AddonVersionCode },
    AddonVersionName: function() { return o.AddonVersionName },

    listNameMonth: function() { return o.listNameMonth }
  };
})();
