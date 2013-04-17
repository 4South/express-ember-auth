App.UserController = Ember.ObjectController.extend
  
  formUsername: ''
  formPassword: ''
  formEmail: ''
  errorMessage: ''

  createData: (->
    username: @get('formUsername')
    password: @get('formPassword')
    email: @get('formEmail')
  ).property('formUsername', 'formPassword', 'formEmail')

  loginData: (->
    username: @get('formUsername')
    password: @get('formPassword')
  ).property('formUsername', 'formPassword')
  

  loggedIn: (->
    if @get('content') then true else false
  ).property('content')

  resetForm: () ->
    @set('formUsername', '')
    @set('formPassword', '')
    @set('formEmail', '')
  

  userAjax: (url, type, hash) ->
    #reset user errorMessage
    @set('errorMessage', '')

    hash.url = url
    hash.type = type
    hash.dataType = 'json'
    hash.contentType = 'application/json; charset=utf-8'
    hash.context = @
    
    if (hash.data and type isnt "GET")
      hash.data = JSON.stringify(hash.data)
    
    Ember.$.ajax(hash)

  tester: () ->
    @userAjax('/user/sample', 'GET',
      success: (data) ->
        console.log(data.message)
      error: (xhr) ->
        console.log('sample failed')
      complete: () ->
        console.log('fired the always')
    )

  create: () ->
    @userAjax('/user/create', 'POST',
      data: @get('createData')
      success: (data) ->
        Ember.run(@, () ->
          @set('content', Ember.Object.create(data))
        )
      error: (xhr) ->
        Ember.run(@, () ->
          @set('errorMessage', 'account creation failed, try again')
        )
      complete: () ->
        Ember.run(@, () ->
          @resetForm()
        )
    )
 
  login: () ->
    @userAjax('/user/login', 'POST',
      data: @get('loginData')
      success: (data) ->
        Ember.run(@, () ->
          @set('content', Ember.Object.create(data))
        )
      error: (xhr) ->
        Ember.run(@, () ->
          @set('errorMessage', 'login failed please try again')
        )
      complete: () ->
        Ember.run(@, () ->
          @resetForm()
        )
     )

  logout: () ->
    @userAjax('/user/logout', 'GET',
      success: (data) ->
        Ember.run(@, ()->
          @set('content', null)
        )
      error: (xhr) ->
        Ember.run(@, ()->
          @set('errorMessage', 'logout failed')
        )
     )
