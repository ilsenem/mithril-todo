(function () {
  "use strict";

  m.factory('application', function () {
    return {
      controller: m.resolve('controllers.todo'),
      view: m.resolve('views.todo')
    };
  });

  document.addEventListener('DOMContentLoaded', function () {
    m.module(document.body, m.resolve('application'));
  });
})();
