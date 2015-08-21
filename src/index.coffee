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

  metaTags.each (i, element) ->
    attrs = element.attribs
    result[attrs.property.replace('og:', '').toLowerCase()] = attrs.content

  result

openTags.fetch = (url) ->
  deferred = Q.defer()
  request url, (error, response, data) ->
    if !error and response?.statusCode is 200
      deferred.resolve openTags.parseHtml(data)
    else
      deferred.reject error: error

  deferred.promise

module.exports = openTags
