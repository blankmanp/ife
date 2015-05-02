(function() {
    //全局变量:
    var g = {
        storage: {
        	file: {0: '默认分类'},
            task: {'默认分类': ['task1', 'task2', 'task3']},
            todo: {'默认分类': {'task1': ['todo120120301', 'todo220120301', 'todo320140301'],
            					'task2': ['todo120120401', 'test20130201'],
            					'task3': ['todo320150501']}}
        },
        att: function(element, name, value) {
            if (!value)
                return element.getAttribute(name);
            else
                return element.setAttribute(name, value);
        },
        UI: {
            hide: function(elem) {
                if (!elem.length) {
                    elem.style.display = "none";
                }
                else {
                    for (var i = 0; i < elem.length; i ++) {
                        elem[i].style.display = "none";
                    }
                }
            },
            show: function(elem) {
                if (!elem.length) {
                    elem.style.display = "";
                }
                else {
                    for (var i = 0; i < elem.length; i ++) {
                        elem[i].style.display = "";
                    }
                }
            },
            slideDown: function() {}
        },
        DOM: {
            removeNode: function(node) {
                var parent = node.parentNode;
                parent.removeChild(node);
            },
            addClass: function(elem, cla) {
            	if (!elem.length) {
	                var c = elem.className;
	                c = c.split(" ");
	                for (var i = 0; i < c.length; i ++) {
	                    if (cla == c[i])
	                        return false;
	                }
	                c.push(cla);
	                elem.className = c.join(" ");
                }
                else {
                	for (var i = 0; i < elem.length; i ++) {
                		var c = elem[i].className;
		                c = c.split(" ");
		                for (var j = 0; j < c.length; j ++) {
		                    if (cla == c[j])
		                        return false;
		                }
		                c.push(cla);
		                elem[i].className = c.join(" ");
                	}
                }
            },
            removeClass: function(elem, cla) {
                if (!elem.length) {
                	var c = elem.className;
	                c = c.split(" ");
	                for (var i = 0; i < c.length; i ++) {
	                    if (c[i] == cla) {
	                        c.splice(i, 1);
	                    };
	                };
	                elem.className = c.join(" ");
                }
                else {
                	for (var i = 0; i < elem.length; i ++) {
                		var c = elem[i].className;
		                c = c.split(" ");
		                for (var j = 0; j < c.length; j ++) {
		                    if (c[j] == cla) {
		                        c.splice(j, 1);
		                    };
		                };
		                elem[i].className = c.join(" ");
                	}
                }
            },
            siblings: function(elem) {
                var sibling = [], previous = elem, next = elem;
                while (previous.previousSibling != null) {
                    previous = previous.previousSibling;
                    if (previous.nodeType == 1)
                        sibling.push(previous);
                }
                while (next.nextSibling != null) {
                    next = next.nextSibling;
                    if (next.nodeType == 1)
                        sibling.push(next);
                }
                return sibling;
            }
        }
    };
    //任务构造器:
    function Task() {};
    Task.prototype.showDelete = function() {
        var li = document.getElementsByClassName("taskList");
        for (var i = li.length - 1; i >= 0; i --) {
            li[i].onmouseenter = function() {
                g.UI.show(this.lastChild);
            }
            li[i].onmouseleave = function() {
                g.UI.hide(this.lastChild);
            }
        }
        task.delete();
    };
    Task.prototype.delete = function() {
        var del = document.getElementsByClassName("menuDelete");
        for (var i = del.length - 1; i >= 0; i --) {
            del[i].onclick = function() {
                if (g.att(this.parentNode.parentNode, "delete") != 0) {
                	if (confirm("sure?")) {
                        g.DOM.removeNode(this.parentNode.parentNode);
                    }
                }
                else {
                    alert("You can't delete this class!")
                }
            }
        }
    };
    Task.prototype.addClass = function() {
        var addCla = document.getElementById("addClass");
        addCla.onclick = function() {
            g.UI.show(document.getElementsByClassName("pop"));
            document.getElementById("addConfirm").onclick = function() {
                var text = document.getElementById("addTitle").value,
                    str = [],
                    ul = document.getElementsByClassName("taskUl"),
                    choosen = document.getElementsByClassName("choosen")[0];
            	if (text == "all") {
            		alert("can't name with 'all'!");
            	}
            	else {
	                if (!document.getElementById("subClass").checked) {
	                    str.push("<ul class='taskUl' id='task" + ul.length + "' delete='1'>");
	                    str.push("<li class='titleli taskList'>");
	                    str.push("<img src='img/file.png' />")
	                    str.push("<p>" + text + "</p>");
	                    str.push("<span class='taskNum' id='taskNum" + ul.length + "'>(0)</span>");
	                    str.push("<span class='pullRight menuDelete' style='display:none'><b>X</b></span>");
	                    str.push("</li>");
	                    str.push("</ul>");
	                    str = str.join("");
	                    ul[0].parentNode.innerHTML += str;
	                    g.storage.task[text] = new Array();
	                    task.showDelete();
	                }
	                else {
	                	var ulnum = choosen.parentNode.id.slice(4),
	                	    num = g.DOM.siblings(choosen).length;
	                	str.push("<li class='titleli subTaskList'>");
	                    str.push("<img src='img/subfile.png' />")
	                    str.push("<p>" + text + "</p>");
	                    str.push("<span class='taskNum' id='taskNum" + ulnum + "_" + num + "'>(0)</span>");
	                    str.push("<span class='pullRight menuDelete' style='display:none'><b>X</b></span>");
	                    str.push("</li>");
	                    str = str.join("");
	                    ul[ulnum].innerHTML += str;

	                }
	            }
	        g.UI.hide(document.getElementsByClassName("pop"));
	        task.classChoosen();
            }
            document.getElementById("addClose").onclick = function() {
                g.UI.hide(document.getElementsByClassName("pop"));
            }
        }
    };
    Task.prototype.addTask = function() {
        var addTodo = document.getElementById("addTask");
        addTodo.onclick = function() {
            edit.view();
            document.getElementById("buttonSave").onclick = function() {
            	edit.saveAdd();
            }
        };
    };
    Task.prototype.editTask = function() {
        var todoEdit = document.getElementById("todoEdit");
        todoEdit.onclick = function() {
            edit.view();
            document.getElementById("buttonSave").onclick = function() {
            	edit.saveEdit();
            }
        }
    };
    Task.prototype.taskDone = function() {
        var todoDone = document.getElementById("todoDone");
        todoDone.onclick = function() {
            var choosen = document.getElementsByClassName("todochoosen")[0];
            g.DOM.addClass(choosen, "done");
        }
    };
    Task.prototype.classChoosen = function() {
    	var titleli = document.getElementsByClassName("titleli");
    	for (var i = 0; i < titleli.length; i ++) {
    		titleli[i].onclick = function() {
    			g.DOM.removeClass(titleli, "choosen");
    			g.DOM.addClass(this, "choosen");
    			if (g.att(this, 'f') != undefined && g.att(this, 't') != undefined) {
    				var f = g.att(this, 'f'), t = g.att(this, 't');
    				task.initTodo(f, t);
    			}
    			else {
    				var f = g.att(this, 'f');
    				task.initTodo(f);
    			}
    		}
    	}
    }
    Task.prototype.taskChoosen = function() {
        var taskli = document.getElementsByClassName("todotaskLi");
        for (var i = 0; i < taskli.length; i ++) {
            taskli[i].onclick = function() {
            	g.DOM.removeClass(document.getElementsByClassName("todotaskLi"), "todochoosen");
                g.DOM.addClass(this, "todochoosen");
                var time = g.att(this, "time");
                var title = g.att(this, "t");
                document.getElementById("todoText").innerHTML = title;
                document.getElementById("taskTime").innerHTML = "<p>任务日期：<span>" + time + "</span></p>";
            }
        }
    };
    Task.prototype.titleChoosen = function() {
        var title = document.getElementsByClassName("subMenuTitle");
        for (var i = 0; i < title.length; i ++) {
            title[i].onclick = function() {
                g.DOM.addClass(this, "choosen");
                var sibling = g.DOM.siblings(this);
                for (var j = 0; j < sibling.length; j ++) {
                    g.DOM.removeClass(sibling[j], "choosen");
                }
                if (this.id == "all") {
                    g.UI.show(document.getElementsByClassName("todotaskLi"));
                }
                else if (this.id == "done") {
                    g.UI.hide(document.getElementsByClassName("todotaskLi"));
                    if (document.getElementsByClassName("done").length != 0){
                    	g.UI.show(document.getElementsByClassName("done"));
                    }
                }
                else if (this.id == "notdone") {
                    g.UI.show(document.getElementsByClassName("todotaskLi"));
                    if (document.getElementsByClassName("done").length != 0){
                    	g.UI.hide(document.getElementsByClassName("done"));
                    }
                }
            }
        }
    };
    Task.prototype.init = function() {
    	var i = 0;
    	for (var val in g.storage.file) {
    		var str = [], f = g.storage.file[val];
    		str.push('<ul class="taskUl" id="task' + i + '"');
    		if (f == "默认分类") {
    			str.push("delete=0 add=0");
    		}
    		str.push(">");
            str.push('<li class="titleli taskList ');
            if (f == "默认分类") {
    			str.push("choosen");
    		}
            str.push('" f="' + f + '"><img src="img/file.png" />');
            str.push('<p>' + f + '  </p><span class="taskNum" id="taskNum' + i + '">(0)</span>')
            str.push('<span class="pullRight menuDelete" style="display:none"><b>X</b></span>')
            str.push('</li>');
            var t = g.storage.task[f];
            if (t.length != 0) {
	            for (var j = 0; j < t.length; j ++) {
	            	str.push('<li class="titleli subTaskList" f="' + f + '" t="' + t[j] + '">');
	            	str.push('<img src="img/subfile.png" /><p>' + t[j] + '  </p>');
	            	str.push('<span class="taskNum" id="taskNum' + i + '_' + j + '">(0)</span>');
	            	str.push('<span class="pullRight menuDelete" style="display:none"><b>X</b></span>');
	            	str.push('</li>');
	            }
	        };
	        str.push("</ul>")
            htmlstr = str.join("");
            document.getElementById("taskClass").innerHTML += htmlstr;
            str = [];
            task.initTodo(f);
            i ++;
    	}
    };
    Task.prototype.initTodo = function(f, t) {
    	var time = [], todo = [];
    	if (!t) {
    		for (var val in g.storage.todo[f]) {
    			var a = g.storage.todo[f];
    			for (var i = 0; i < a[val].length; i ++) {
    				var b = a[val][i].slice(-8),
    				    c = a[val][i].slice(0, -8);
    				if (time.length != 0) {
    					for (var j = 0; j < time.length; j ++) {
    						if (time[j] == b) {
    							todo[j] += " " + c;
    							break;
    						}
    						else if (j == time.length - 1) {
    							time.push(b);
    							todo.push(c);
    							break;
    						}
    					}
    				}
    				else {
    					time.push(b);
    					todo.push(c);
    				}
    			}
    		}
    	}
    	else {
    		var a = g.storage.todo[f][t];
    		for (var i = 0; i < a.length; i ++) {
    			var b = a[i].slice(-8),
    				c = a[i].slice(0, -8);
    			if (time.length != 0) {
    				for (var j = 0; j < time.length; j ++) {
    					if (time[j] == b) {
    						todo[j] += " " + c;
    						break;
    					}
    					else if (j == time.length - 1) {
    						time.push(b);
    						todo.push(c);
    						break;
    					}
    				}
    			}    				
    			else {
    				time.push(b);
    				todo.push(c);
    			}
    		}
    	}
    	var temp = [];
    	for (var i = 0; i < time.length; i ++) {
    		temp.push([time[i], todo[i]]);
    	}
    	temp.sort(function(a, b) {
    		return a[0] - b[0];
    	});
    	for (var i = 0; i < temp.length; i ++) {
    		time[i] = temp[i][0];
    		todo[i] = temp[i][1];
    	}
    	var str = [];
    	for (var i = 0; i < time.length; i ++) {
    	str.push('<div id="task' + time[i] + '">');
    		time[i] = time[i].split("");
    		time[i].splice(4, 0, '-');
    		time[i].splice(7, 0, '-');
    		time[i] = time[i].join("");
    		str.push('<div class="time todotime"><p>' + time[i] + '</p></div>')
    		str.push('<div class="task">');
    		str.push('<ul class="todotask">');
    		var temp = todo[i].split(" ");
    		for (var j = 0; j < temp.length; j ++) {
    			str.push('<li class="todotaskLi" f="' + f + '"t="' + temp[j] + '"time="' + time[i] + '"><p>' + temp[j] + '</p></li>')
    		}
    		str.push("</ul></div></div>")
    	}
    	document.getElementById("todolist").innerHTML = str.join("");
    	task.taskChoosen();
    }
    //编辑构造器:
    function Edit() {
        this.normal = document.getElementsByClassName("edit")[0].innerHTML;
    };
    Edit.prototype.view = function() {
        var str = [];
        str.push('<form id="todoForm">');
        str.push('<input type="text" id="formTitle" value="请输入标题" />');
        str.push('<span class="pullRight" id="click">')
        str.push('<button class="formButton" id="buttonSave" type="submit">save</button>')
        str.push('<button class="formButton pullRight" id="buttonDelete">Undo</button></span>');
        str.push('<input type="date" class="time" id="formTime" value="年-月-日" />');
        str.push('<textarea id="formContent" cols="30" rows="10"></textarea>');
        str.push('</from>');
        str = str.join("");
        document.getElementsByClassName("edit")[0].innerHTML = str;
        document.getElementById("buttonDelete").onclick = function() {
            edit.undo();
        }
    };
    Edit.prototype.undo = function() {
        document.getElementsByClassName("edit")[0].innerHTML = this.normal;
        task.editTask();
    };
    Edit.prototype.saveEdit = function() {
        var title = document.getElementById("formTitle").value,
            time = document.getElementById("formTime").value,
            content = document.getElementById("formContent").value,
            choosen = document.getElementsByClassName("todochoosen")[0],
            reg = /\d+/g,
            year = reg.exec(time),
            mouth = reg.exec(time),
            day = reg.exec(time);
        g.DOM.removeNode(choosen);
    };
    Edit.prototype.saveAdd = function() {
    };
    //初始化
    var task = new Task(), edit = new Edit();
    task.init();
    task.showDelete();
    task.addClass();
    task.addTask();
    task.editTask();
    task.taskDone();
    task.taskChoosen();
    task.titleChoosen();
    task.classChoosen();
})()