(function () {
  "use strict";

  m.factory('views.todo.form', function () {
    return function (c) {
      return m('form', {
        config: function (el, init) {
          if (!init) {
            $(el).find('.capture').bind('keydown', 'ctrl+return', function (e) {
              if (c.isInputValid()) {
                m.startComputation();
                c.addNewTodo();
                m.endComputation();
              }
            });
            el.addEventListener('submit', function (e) {
              e.preventDefault();
            }, true);
          }
        },
        style: {
          marginBottom: '20px'
        }
      }, [
        m('.form-group', [
          m('input[type=text][placeholder=Title].form-control.capture', {
            onkeyup: m.withAttr('value', c.todo.title),
            value: c.todo.title()
          })
        ]),
        m('.form-group', [
          m('textarea[placeholder=Description].form-control.capture', {
            onkeyup: m.withAttr('value', c.todo.description),
            value: c.todo.description()
          }),
          m('.help-block', m.trust('Create new item by pressing <kbd>Ctrl+Enter</kbd> shortcut.'))
        ])
      ]);
    };
  });
})();
