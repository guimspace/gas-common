# GAS Common

[![License](https://img.shields.io/badge/license-MIT%20License-red.svg)](https://github.com/guimspace/gas-common/blob/master/LICENSE.md)
[![Version](https://img.shields.io/github/release/guimspace/gas-common.svg)](https://github.com/guimspace/gas-common/releases)

A bundle of **G**oogle **A**pps **S**cripts to save lines of code.


## How to use

### [PropertiesServices](https://developers.google.com/apps-script/reference/properties/)


    var str = 'Hello, World!";
    var num = 15;
    var car = {type:"Foo", model:"Bar"};


    // Set key-value
    PropertiesService.getUserProperties().setProperty('key_str', str);
    PropertiesService.getUserProperties().setProperty('key_num', num.toString());
    PropertiesService.getUserProperties().setProperty('key_car', JSON.stringify(car));

    // gas-common
    setPropertiesService_('user', 'key_str', 'string', str);
    setPropertiesService_('user', 'key'_num, 'number', num);
    setPropertiesService_('user', 'key_car', 'json', car);


    // Get value
    str = PropertiesService.getUserProperties().getProperty('key_str');
    num = PropertiesService.getUserProperties().getProperty('key_num');
    num = Number(num);
    car = PropertiesService.getUserProperties().getProperty('key_car');
    car = JSON.parse(car);

    // gas-common
    str = getPropertiesService_('user', 'key_str', 'string');
    num = getPropertiesService_('user', 'key_num', 'number');
    car = getPropertiesService_('user', 'key_car', 'json');



### [CacheService](https://developers.google.com/apps-script/reference/cache/)


    var str = 'Hello, World!",
        num = 15,
        car = {type:"Foo", model:"Bar"};
    var t = 30; // expiration time


    // Add key-value
    CacheService.getUserCache().put('key_str', str, t);
    CacheService.getUserCache().put('key_num', num.toString(), t);
    CacheService.getUserCache().put('key_car', JSON.stringify(car), t);

    // gas-common
    putCacheService_('user', 'key_str', 'string', str, t);
    putCacheService_('user', 'key'_num, 'number', num, t);
    putCacheService_('user', 'key_car', 'json', car);


    // Get value
    str = CacheService.getUserCache().get('key_str');
    num = CacheService.getUserCache().get('key_num');
    num = Number(num);
    car = CacheService.getUserCache().get('key_car');
    car = JSON.parse(car);

    // gas-common
    str = getCacheService_('user', 'key_str', 'string');
    num = getCacheService_('user', 'key_num', 'number');
    car = getCacheService_('user', 'key_car', 'json');



### [ScriptService](https://developers.google.com/apps-script/reference/script/)

    // Create trigger
    var trigger = ScriptApp.newTrigger('myFunction')
      .forSpreadsheet('1234567890abcdefghijklmnopqrstuvwxyz_a1b2c3')
      .onEdit()
      .create();

    PropertiesService.getUserProperties().setProperty('trigger_id', trigger.getUniqueId());

    // gas-common
    createScriptAppTriggers_('user', 'trigger_id', 'onEdit', 'myFunction');


    // Delete trigger
    var trigger_id = PropertiesService.getUserProperties().getProperty('trigger_id');
    var triggers = ScriptApp.getProjectTriggers();
    var i;

    for(i in triggers) {
      if(triggers[i].getUniqueId() === trigger_id) {
        ScriptApp.deleteTrigger(triggers[i]);
        break;
      }
    }

    // gas-common
    deleteScriptAppTriggers_('user', 'trigger_id');



## License

[MIT License](https://github.com/guimspace/gas-common/blob/master/LICENSE.md)

Copyright 2019 Guilherme Tadashi Maeoka
