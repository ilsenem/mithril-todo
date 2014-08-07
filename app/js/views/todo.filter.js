(function () {
  "use strict";

  m.factory('views.todo.filter', function () {
    return function (c) {
      return m('h2', [
        'Items list',
        ' ',
        (c.isListEmpty()) ? null : m('small.filter', [
          'Show: ',
          m('a[href=#]', {
            onclick: c.filter.bind(null, 0),
            class: (c.filter() === 0) ? 'active' : ''
          }, 'all'),
          ', ',
          m('a[href=#]', {
            onclick: c.filter.bind(null, 1),
            class: (c.filter() === 1) ? 'active' : ''
          }, 'unfinished'),
          ', ',
          m('a[href=#]', {
            onclick: c.filter.bind(null, 2),
            class: (c.filter() === 2) ? 'active' : ''
          }, 'finished')
        ])
      ]);
    };
  });
})();
