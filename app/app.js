(function () {
  "use strict";

  var application = {
    model: function () {
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
    },
    controller: function () {
      var self  = this,
          model = new application.model();

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
    },
    view: function (c) {
      var filtered = [];

      return m('.container', [
        m('.row', [
          m('.col-md-4.col-md-offset-4', [
            m('.page-header', [
              m('h1', 'ToDO List')
            ]),
            m('form', {
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
            ]),
            m('p.text-center', [
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
            ]),
            m('h2', [
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
            ]),
            (c.isListEmpty()) ? m('p.text-muted', 'List empty…') : m('ul.list-unstyled', {
              style: {
                marginLeft: "20px"
              }
            }, [
              filtered = c.todos.filter(function (item) {
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
            ]),
            (!c.isListEmpty() && filtered.length === 0) ? m('p.text-muted', 'Choose another filter…') : null
          ])
        ])
      ]);
    }
  };

  m.module(document.getElementById('app'), application);
})();
