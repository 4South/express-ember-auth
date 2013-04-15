App.ApplicationController = Ember.Controller.extend
  
  username: ''
  password: ''
  loggedIn: false
  loggedName: ""
  responseText: ''

  data: (->
    return {username: @get('username'), password: @get('password')}
  ).property('username', 'password')

  login: () ->
    Ember.$.ajax(
      url: '/login'
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
