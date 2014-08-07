(function () {
  "use strict";

  m.factory('controllers.todo', ['models.todo', function (todoModel) {
    return function () {
      var self  = this,
          model = new todoModel();

      this.todos = model.list();

      this.todo = {
        title       : m.prop(''),
        description : m.prop('')
      };

      this.filter = m.prop(0);

      this.isAllFinished = function () {
        return self.getFinishedCount() === self.todos.length;
      };

      this.isListEmpty = function () {
        return self.todos.length === 0;
      };

      this.isInputValid = function() {
        return self.todo.title().length !== 0;
      };

      this.getFinishedCount = function () {
        return self.todos.filter(function (item) {
          return item.done();
        }).length;
      };

      this.addNewTodo = function () {
        if (self.todo.title().length > 0) {
          model.create({
            title: self.todo.title(),
            description: self.todo.description()
          }).save();

          self.todo.title('');
          self.todo.description('');
        }
      };

      this.markFinished = function () {
        this.done(!this.done());

        model.save();
      };

      this.markAllFinished = function () {
        model.save(self.todos.map(function (item) {
          item.done(true);

          return item;
        }));
      };

      this.markAllUnfinished = function () {
        model.save(self.todos.map(function (item) {
          item.done(false);

          return item;
        }));
      };

      this.removeFinished = function () {
        self.todos = model.save(self.todos.filter(function (item) {
          return !item.done();
        }));
      };

      return this;
    }
  }]);
})();
