pywebtest-gitbook is a plugin for [gitbook](http://www.gitbook.io) that allow to run python code in the gitbook with python editor. 

For Editor , using [ace](http://ace.c9.io) and [brython](www.brython.info) to run python code on browser. Running brython code are inspired from  [Pierre Quentel](https://groups.google.com/d/msg/brython/xLv55qq-L1s/mcwmI6-pEhcJ)'s answer from google group discussion.

## Install

```
npm install pywebtest-gitbook
```

In your gitbook book.json

```
"plugin" : [
	"pywebtest-gitbook"
	],
 pluginsConfig" : {
      "bookPath" : "http://localhost:4000/"
    }
```

You need to point the ** bookPath** url because brython.js need to load from gitbook home path.

## Screenshot

![image](https://i.cloudup.com/2Bbk19AXT9.png)

## How to add python code
You can add python code like following
```
Hello World

[[[helloworld.py]]]


Bubbler Sort

[[[bubble.py]]]
```

You need to put your python file path between **[[[** and **]]]**

Example:

- file.md
- code
	-  helloworld.py

In file.md , you can call like

```
This is file.md

[[[code/helloworld.py]]

```



