(function() {
  'use strict';

  // two way data binding
  var vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: [
        {
          title: 'task1',
          isDone: false
        },
        {
          title: 'task2',
          isDone: false
        },
        {
          title: 'task3',
          isDone: true
        },
      ]
    },
    methods: {
      addItem() {
        var item = {
          title: this.newItem,
          isDone: false
        };
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem(index) {
        if (confirm('are you sure?')) {
          this.todos.splice(index, 1);
        }
      },
      purge() {
        if (!confirm('delete finished?')) {
          // キャンセルがクリックされたら、処理を終了。
          return;
        }
        // isDoneとなっているタスクを削除。
        this.todos = this.remaining;
      }
    },
    computed: {
      remaining() {
        return this.todos.filter(function(todo) {
          return !todo.isDone;
        });
      }
    }
  })
})();