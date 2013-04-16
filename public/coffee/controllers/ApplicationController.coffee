App.ApplicationController = Ember.Controller.extend
  
  username: ''
  password: ''
  loggedIn: false
  loggedName: ""
  responseText: ''

  data: (->
    return {username: @get('username'), password: @get('password')}
  ).property('username', 'password')

  tester: () ->
    Ember.$.ajax(
      url: '/user/sample'
      type: 'GET'
      dataType: 'json'
      contentType: 'application/json; charset=utf-8'
      context: @

      success: (data) ->
        console.log(data.message)
      error: (xhr) ->
        console.log(xhr.responseText)
     )

  create: () ->
    Ember.$.ajax(
      url: '/user/create'
      type: 'POST'
      dataType: 'json'
      contentType: 'application/json; charset=utf-8'
      context: @
      data: JSON.stringify(@get('data'))

      success: (data) ->
        Ember.run(@, ()->
          @set('loggedIn', true)
          @set('loggedName', data.username)
        )

      error: (xhr) ->
        Ember.run(@, ()->
          console.log(xhr)
          @set('loggedIn', false)
          @set('responseText', xhr.responseText)
        )
     )
     @set('username', '')
     @set('password', '')
    
  login: () ->
    Ember.$.ajax(
      url: '/user/login'
      type: 'POST'
      dataType: 'json'
      contentType: 'application/json; charset=utf-8'
      context: @
      data: JSON.stringify(@get('data'))

      success: (data) ->
        Ember.run(@, ()->
          @set('loggedIn', true)
          @set('loggedName', data.username)
        )

      error: (xhr) ->
        Ember.run(@, ()->
          console.log(xhr)
          @set('loggedIn', false)
          @set('responseText', xhr.responseText)
        )
     )
     @set('username', '')
     @set('password', '')

  logout: () ->
    Ember.$.ajax(
      url: '/user/logout'
      type: 'GET'
      dataType: 'json'
      contentType: 'application/json; charset=utf-8'
      context: @

      success: (data) ->
        Ember.run(@, ()->
          @set('loggedIn', false)
          @set('loggedName', '')
        )

      error: (xhr) ->
        Ember.run(@, ()->
          console.log(xhr)
          @set('loggedIn', true)
          @set('responseText', xhr.responseText)
        )
     )
