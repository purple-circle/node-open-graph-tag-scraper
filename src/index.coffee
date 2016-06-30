'use strict'
request = require('request')
cheerio = require('cheerio')
Q = require('q')
openTags = {}

openTags.parseHtml = (html) ->
  result = {}
  $ = cheerio.load(html)

  metaTags = $('meta').filter ->
    if not @attribs.property
      return false
    @attribs.property.match 'og:'

  metaTags.each (i, {attribs}) ->
    result[attribs.property.replace('og:', '').toLowerCase()] = attribs.content

  result

openTags.fetch = (url) ->
  deferred = Q.defer()
  request url, (error, response, data) ->
    if not error and response?.statusCode is 200
      deferred.resolve(openTags.parseHtml(data))
    else
      deferred.reject({error})

  deferred.promise

module.exports = openTags
