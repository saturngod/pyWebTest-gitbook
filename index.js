var fs = require("fs");
var path =  require('path');
module.exports = {
    book: {
        assets: "./book",
        js: [
        "editor/ace.js",
        "editor/theme-tomorrow_night.js",
        "editor/mode-python.js",
        "webpyeditor.js"
        ],
        css: [          
            "pygitbook.css"
        ],
        html: {
          "body:start": function() {
            return "<script src='"+ this.options.pluginsConfig.bookPath + "/gitbook/pywebtest-gitbook/js/brython.js'></script>";
          }
        }
      },
      hooks: {
        "page:after": function(page) {
          //console.log(this.options.pluginsConfig.brythonPath);
          var filepath = path.dirname(page.path);
          var content = page.content;
          var arr = {};
          var files = content.match(/\[\[\[([^\]]+)\]\]\]/g);
          
          var script = "";
          for (var i in files) {
            file = files[i];
            key = files[i];
            file = file.replace(/\[\[\[/g,"");
            file = file.replace(/\]\]\]/g,"");
            var fullpath = filepath + "/"+file;
            fullpath = fs.realpathSync(fullpath);
            var python = fs.readFileSync(fullpath);
            
            var template = "<div id='code"+i+"'>";
            template += python;
            template +="</div>\n";
            
            template +="<script> var editor" +i+ "='';</script>"
            script +="editor" + i + "=  ace.edit('code"+i+"');\n";
            script += "editor" + i + ".setTheme(\"ace/theme/tomorrow_night\");\n";
            script +=  "editor" + i + ".getSession().setMode(\"ace/mode/python\");\n";

            
            template +="<input type='button' class='btn pyBtn' id='run"+i+"' value='run' onclick=\"run_python(editor"+i+",'python_result"+i+"')\"><br/>\n";
            template +="<textarea id='python_result"+i+"' readonly class='console'></textarea>";
            
           
            if(i == files.length - 1) {
              arr[key] = template + "<script>\ndocument.addEventListener('DOMContentLoaded', function(){ load_editor(); });\nfunction load_editor(){\n" + script + "\n}\n</script>\n";
            }
            else {
              arr[key] = template;
            }
          } // end for files loop
          
          content = content.replace(/\[\[\[([^\]]+)\]\]\]/g,function ($0, $1){
            return arr[$0]
          });
          
          if(script=="")
          {
            script = "<script>function load_editor(){}</script>";
            page.content = script + content;
          }
          else {
            page.content = content;
          }
          
          
          return page;
        }
      } //end of hooks
    } //end of exports