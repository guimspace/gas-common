/**
 * Copyright (c) 2019 Guilherme T Maeoka
 * This code is licensed under MIT license.
 * <https://github.com/guimspace/gas-common>
 */

/**
 * Gets the cached value for the given key, or null if none is found.
 * @param  {String} method The method to get a cache instance
 * @param  {String} key    The key to look up in the cache
 * @param  {String} type   The type of the value to return
 * @return {Object}        The value associated with the given key in the cache instance
 */
function getCacheService_(method, key, type) {
  var m_Cache;


  switch(method) {
    case 'document':
      m_Cache = documentCacheService_;
      break;
    case 'script':
      m_Cache = scriptCacheService_;
      break;
    case 'user':
    default:
      m_Cache = userCacheService_;
      break;
  }

  switch(type) {
    case 'number':
      return Number( m_Cache.get(key) );
    case 'string':
      return m_Cache.get(key);
    case 'boolean':
      if(m_Cache.get(key) === 'true') return true;
      else return false;
    case 'json':
      var p = m_Cache.get(key);
      if(typeof p === 'string') return JSON.parse( p );
      else return;
    default:
      return;
  }
}

/**
 * Adds a key/value pair to the cache.
 * @param  {String} method The method to get a cache instance
 * @param  {String} key    The key to store the value under
 * @param  {String} type   The type of the value to convert
 * @param  {Object} value  The value to be cached
 */
function putCacheService_(method, key, type, value, expiration) {
  var m_Cache;


  if(expiration == null) expiration = 600;
  switch(method) {
    case 'document':
      m_Cache = documentCacheService_;
      break;
    case 'script':
      m_Cache = scriptCacheService_;
      break;
    case 'user':
    default:
      m_Cache = userCacheService_;
      break;
  }

  switch(type) {
    case 'number':
      m_Cache.put(key, value.toString(), expiration);
      break;
    case 'string':
      m_Cache.put(key, value, expiration);
      break;
    case 'boolean':
      if(value) m_Cache.put(key, 'true', expiration);
      else m_Cache.put(key, 'false', expiration);
      break;
    case 'json':
      m_Cache.put(key, JSON.stringify( value ), expiration);
    default:
      break;
  }
}
