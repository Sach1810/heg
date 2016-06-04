
heg.controller('mainCtrl', function mainCtrl($scope, hegStorage) {
  var todos = todoStorage.get();
  todos.then(function(todos){
    $scope.todos = todos.data;
    console.log(todos.data);
  });

  

  $scope.newTodo = '';
  $scope.editedTodo = null;

  // TODO: Create a new todo from $scope.newTodo
  // User todoStorage.put to save it
  // Clear the input afterwardc
  $scope.addTodo = function () {
    var todo = {
      title: $scope.newTodo,
      complete: false 
    };

    $scope.todos.push(todo);

    todoStorage.post(todo);
    $scope.newTodo = null;
  };

  // Setting '$scope.editedTodo' so we can add our 'editing' class
  // Setting '$scope.originalTodo' to the original todo in case we want to restore later
  $scope.editTodo = function (todo) {
    $scope.originalTodo = todo.title
    $scope.editedTodo = todo;
    
  };

  // invoked on 'blur' and hitting the 'enter key'
  // TODO: set $scope.editedTodo to null (we wont need it now because we're done editing)
  // TODO: Put it in todoStorage
  $scope.doneEditing = function (todo) {
    $scope.editedTodo = null;
    todoStorage.put(todo);
  };

  // TODO: Revert the todo with in our todos array whos index matches the one passed
  // into this function back to $scope.originalTodo.
  // TODO: Invoke doneEditing with our $scope.originalTodo
  $scope.revertEditing = function (todo) {
      todo.title = $scope.originalTodo;


  };

  // TODO: Remove the todo from the todos array
  // TODO: Update todoStorage with this change
  $scope.removeTodo = function (index,todo) {
      $scope.todos.splice(index,1);

      todoStorage.delete(todo);
  };

  // TODO: Update localStorage with the change
  $scope.todoCompleted = function (todo) {
      todoStorage.put(todos);
  };
});
