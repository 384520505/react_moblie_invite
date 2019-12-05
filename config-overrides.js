const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: 'css',
    }),

    addLessLoader({
        javascriptEnabled: true,
        // @primary-color ： 主题颜色
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
);