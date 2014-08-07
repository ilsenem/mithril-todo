(function () {
  "use strict";

  m.factory('views.todo', [
    'models.filtered',
    'views.todo.form',
    'views.todo.buttons',
    'views.todo.filter',
    'views.todo.list',
    function (filteredModel, todoForm, todoButtons, todoFilter, todoList) {
      return function (c) {
        return m('.container', [
          m('.row', [
            m('.col-md-4.col-md-offset-4', [
              m('.page-header', [
                m('h1', 'ToDO List')
              ]),
              todoForm(c),
              todoButtons(c),
              todoFilter(c),
              (c.isListEmpty()) ? m('p.text-muted', 'List empty…') : todoList(c),
              (!c.isListEmpty() && filteredModel.value.length === 0) ? m('p.text-muted', 'Choose another filter…') : null
            ])
          ])
        ]);
      }
    }
  ]);
})();
