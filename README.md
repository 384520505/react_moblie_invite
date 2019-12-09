一、项目开发的相关知识
    1.使用 react 开发移动端相关的项目时，需要安装 antd-mobile 包，
        安装后在入口页面 （index.html）中进行的相关的设置：
            引入FastClick 并且设置 html 的mate 标签
                --FastClick:这是一个简单易用的库，它消除了在一定浏览器上物理点击和触发点击事件之间
                的300毫秒的延迟。
                移动端浏览器使用 FaseClick 的目的的是 用300毫秒的时间来检测用户是否触发双击操作。
            引入Promise 的 fallback 支持
                部分的安卓浏览器不支持 Promise
            
            index.html 文件的配置样式：
                <!DOCTYPE html>
                <html>
                <head>
                    <!-- set `maximum-scale` for some compatibility issues -->
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
                    <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
                    <script>
                        if ('addEventListener' in document) {
                        document.addEventListener('DOMContentLoaded', function() {
                            FastClick.attach(document.body);
                            }, false);
                        }
                        if(!window.Promise) {
                            document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
                        }
                    </script>
                </head>
                <body></body>
                </html>
    2.antd-mobile 包的按需加载的使用（官方强烈推荐使用）
        1) 使用 babel-plugin-import（推荐）
            安装 babel-plugin-import、react-app-rewired、customize-cra 包
            在项目中的更目录中 创建 config-overrides.js 文件， 并写入一下的配置:
                const { override, fixBabelImports } = require('customize-cra');
                module.exports = override(
                    fixBabelImports('import', {
                        libraryName: 'antd-mobile',
                        libraryDirectory: 'es',
                        style: 'css',
                    }),
                );
            并且将package.json文件中的 scripts 对象的配置修改：
                修改为：
                    "scripts": {
                        -   "start": "react-scripts start",
                        +   "start": "react-app-rewired start",
                        -   "build": "react-scripts build",
                        +   "build": "react-app-rewired build",
                        -   "test": "react-scripts test",
                        +   "test": "react-app-rewired test"
                    }
            使用以上配置后，只需要在文件中引入 相关的组件，无需引入样式，即可

    3.在antd-mobile中使用less文件、
        安装 less、less-loader 包
        可以使用 customize-cra 中提供的addLessLoader函数来帮助加载 less 样式文件，
        修改 config-overrides.js 文件如下：
            addLessLoader({
                javascriptEnabled: true,
                // @primary-color ： 主题颜色
                modifyVars: { '@primary-color': '#1DA57A' },
            }),


二、项目开发经验
    1.cookie 可以使用 js-cookie 包

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
