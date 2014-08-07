(function () {
  "use strict";

  m.factory('views.todo.list', ['models.filtered', function (filteredModel) {
    return function (c) {
      return m('ul.list-unstyled', {
        style: {
          marginLeft: "20px"
        }
      }, [
        filteredModel.value = c.todos.filter(function (item) {
          return (c.filter() === 0 || (c.filter() === 1 && !item.done()) || (c.filter() === 2 && item.done()));
        }).map(function (item) {
          return m('li', [
            m('label.checkbox', {
              class: (item.done()) ? 'text-muted' : ''
            }, [
              m('input[type="checkbox"]', {
                onchange: c.markFinished.bind(item),
                checked: item.done()
              }),
              item.title()
            ]),
            (!item.description()) ? null : m('div', {class: (item.done()) ? 'text-muted' : '' }, item.description())
          ]);
        })
      ]);
    };
  }]);
})();
