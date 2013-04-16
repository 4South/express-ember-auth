App.UserController = Ember.ObjectController.extend
  
  loginUsername: ""
  loginPassword: ""
  
  
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
