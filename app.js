/*******  模块导入  **********/
var express = require('express');
var app = express();

/*******  环境配置  **********/

// 服务器端口
app.set('port', process.env.PORT || 3000);

// 禁止返回服务器信息
app.disable('x-powered-by');

// body 解析
app.use(require('body-parser')());

// Cookie & Session
app.use(require('cookie-parser')('aks23*&%*#JKJlkasdf32#'));
app.use(require('express-session')());


/*******  链接数据库  **********/

var mongoose = require('mongoose');
var opts = {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
};
let databaseUrl = 'mongodb://localhost/node_test';
mongoose.connect(databaseUrl);

let StudentSchema = mongoose.Schema({
    name: String,
    age: Number,
    subjects: [String],
    isPass: Boolean,
});

let Student = mongoose.model('Student', StudentSchema);

/*******  路由配置  **********/
app.get('/setmongo', function(req, res) {
    let peter = new Student({
        name: 'Peter',
        age: 18,
        subjects: ['Math', 'English'],
        isPass: false,
    });
    peter.age = 20;
    peter.save(function(err) {
        if (err) {
            console.log('Error occr : ' + err);
        } else {
            console.log('Insert peter success');
        }
    });
});

app.get('/getmongo', (req, res) => {
    res.set('Content-Type', 'text/plain');
    Student.find((err, students) => {
        if (students.length != 0) {
            res.send(students);
        }
    });
});

app.get('/headers', function(req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    for (var name in req.headers) {
        s += name + ': ' + req.headers[name] + '\n';
    }
    res.send(s);
});

app.use(function(req, res) {
    // 定制404页面 app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// 定制 500 页面
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});
