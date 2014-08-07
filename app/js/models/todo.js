(function () {
  "use strict";

  m.factory("models.todo", function () {
    return function () {
      var self       = this,
          collection = [];

      this.create = function (item) {
        collection.push({
          title       : m.prop(item.title),
          description : m.prop(item.description),
          done        : m.prop(item.done)
        });

        return self;
      };

      this.list = function () {
        var storage = JSON.parse(localStorage.getItem('todos'));

        collection = [];

        if (Array.isArray(storage) && storage.length) {
          storage.forEach(self.create);
        }

        return collection;
      };

      this.save = function (update) {
        if (update) {
          collection = update;
        }

        localStorage.setItem('todos', JSON.stringify(collection));

        return collection;
      };

      return this;
    }
  });
})();
