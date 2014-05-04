# New API version and refactored to Coffee Script, 2014

tabs = chrome.tabs.query(
  { currentWindow: true },
  (e) ->
    return e
)

query = (input) ->
  title.toLowerCase().score(input) for title in tabs.title

makeList = () ->


do init = ->
