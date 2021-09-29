(function() {
  'use strict';

  // two way data binding
  var vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: []
    },
    watch: {
      // todosの配列の内容に変更があるとき、実行される。
      todos: {
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
      }
    },
    // todosをjsonから読み出す
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
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