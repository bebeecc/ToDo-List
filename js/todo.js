// 显示当天时间
var currentTime = function() {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var week = date.getDay()
    var array = ['日','一','二','三','四','五','六']
    var weeks = array[week]
    var time = `${year}-${month}-${day} 星期${weeks}`
    e('.showTime').innerHTML = `${time}`
}

// todo模板
var templateTodo = function(todo, done, time) {
    var status = ''
    var hook = 'fa-circle-thin'
    if (done) {
        status = 'done'
        hook = 'fa-check-circle-o'
    }
    var t = `
    <div class='todo-cell ${status}'>
        <time class='thingTime'> ${time}</time>
        <span class='todo-done todo-check fa ${hook}'></span>
        <span class='todo-content'>${todo}</span>
        <i class="todo-delete fa fa-trash-o" aria-hidden="true"></i>
    </div>
    `
    return t
}

// 显示每条todo添加时间 + 内容
var showTodo = function(todo, done) {
    var date = new Date()
    var hours = date.getHours()
    var minutes = date.getMinutes()
    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    var time = `${hours}:${minutes}`
    var t = templateTodo(todo, done, time)
    return t
}

// 插入 todo 内容到页面
var insertTodo = function(todo, done) {
    var todoContainer = e('#id-div-container')
    var t = showTodo(todo, done)
    todoContainer.insertAdjacentHTML('beforeend', t)
}

// 保存数据
var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s
}

// 解析数据
var load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}

// 保存 todos
var saveTodos = function(){
    var contents = es('.todo-content')
    var times = es('.thingTime')
    var todos = []
    for (var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var t = times[i]
        var done = c.parentElement.classList.contains('done')
        var todo = {
            done: done,
            content: c.innerHTML,
            time: t.innerHTML,
        }
        todos.push(todo)
    }
    save(todos)
}

// 增加 todo
var addTodo = function() {
    var addButton = e('#id-newTodo')
    bindEvent(addButton, 'click', function() {
        var todoInput = e('#id-input-add')
        var todo = todoInput.value
        insertTodo(todo, false)
        saveTodos()
        todoInput.value = ''
    })
}

// 标记 todo 完成和删除
var todoDoneDelete = function() {
    var todoContainer = e('#id-div-container')
    bindEvent(todoContainer, 'click', function(event) {
        var target = event.target
        if (target.classList.contains('todo-done')) {
            var todoDiv = target.parentElement
            toggleClass(todoDiv, 'done')
            toggleClass(target, 'fa-check-circle-o')
            toggleClass(target, 'fa-circle-thin')
            saveTodos()
        } else if (target.classList.contains('todo-delete')) {
            var todoDiv = target.parentElement
            todoDiv.remove()
            saveTodos()
        }
    })
}

// 打开和关闭主题颜色
var changeTheme = function() {
    var selector = e('.theme')
    bindEvent(selector, 'click', function() {
        var listChange = e('.theme-color')
        listChange.style.height = '180px'
    })
    var show = e('.showButton')
    bindEvent(show, 'click', function() {
        var listChange = e('.theme-color')
        listChange.style.height = '0px'
    })
}

// 切换黑色主题
var changeBlack = function() {
    var selector = e('#theme-0')
    bindEvent(selector, 'click', function() {
        e('.todo-index').style.background = '#353d40';
        e('.date').style.color = '#353d40';
        e('.list').style.background = 'rgb(64, 72, 75)';
        e('.list').style.color = '#00bff3';
        e('.list-0').style.background = '#2c3032';
        e('.list-0').style.color = '#00bff3';
    })
}

// 切换粉色主题
var changePink = function() {
    var selector = e('#theme-1')
    bindEvent(selector, 'click', function() {
        e('.todo-index').style.background = 'rgba(242, 70, 70, 0.34)';
        e('.date').style.color = 'rgba(242, 70, 70, 0.34)';
        e('.list').style.background = 'rgba(242, 70, 70, 0.35)';
        e('.list').style.color = 'white';
        e('.list-0').style.background = 'rgba(242, 70, 70, 0.65)';
        e('.list-0').style.color = 'white';
    })
}

// 切换蓝色主题
var changeBlue = function() {
    var selector = e('#theme-2')
    bindEvent(selector, 'click', function() {
        e('.todo-index').style.background = 'rgba(118, 195, 221, 0.73)';
        e('.date').style.color = 'rgba(118, 195, 221, 0.73)';
        e('.list').style.background = 'rgba(118, 195, 221, 0.6)';
        e('.list').style.color = 'white';
        e('.list-0').style.background = 'rgb(100, 194, 226)';
        e('.list-0').style.color = 'white';
    })
}

// 载入 todos 列表
var loadTodos = function() {
    var todos = load()
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        insertTodo(todo.content, todo.done, todo.time)
    }
}

var __main = function() {
    loadTodos()
    currentTime()
    saveTodos()
    addTodo()
    todoDoneDelete()
    changeTheme()
    changeBlack()
    changePink()
    changeBlue()
}

__main()
