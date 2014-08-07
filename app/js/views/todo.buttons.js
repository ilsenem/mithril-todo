(function () {
  "use strict";

  m.factory('views.todo.buttons', function () {
    return function (c) {
      return m('p.text-center', [
        m('.btn-group.btn-group-sm', [
          m('button[type=button].btn.btn-danger', {
            disabled: !c.getFinishedCount(),
            onclick: c.removeFinished
          }, [
            m('span.glyphicon.glyphicon-trash'), ' ',
            'Remove finished (' + c.getFinishedCount() + ')'
          ]),
          m('button[type=button].btn.btn-success', {
            onclick: c.markAllFinished,
            disabled: c.isAllFinished()
          }, [
            m('span.glyphicon.glyphicon-check'), ' ',
            'All done'
          ]),
          m('button[type=button].btn.btn-warning', {
            onclick: c.markAllUnfinished,
            disabled: !c.isAllFinished() || c.isListEmpty()
          }, [
            m('span.glyphicon.glyphicon-unchecked'), ' ',
            'Start over'
          ])
        ])
      ]);
    };
  });
})();
