// 底部导航栏的选项

export const bars = [
    {
        title:'大神',
        key:'dashen',
        path:'/userlist',
        icon: require('../assect/nav/dashen.png'),
        selectedIcon: require('../assect/nav/dashen-selected.png'),
    },
    {
        title:'BOSE',
        key:'laoban',
        path:'/userlist',
        icon: require('../assect/nav/laoban.png'),
        selectedIcon: require('../assect/nav/laoban-selected.png'),
    },
    {
        title:'消息',
        key:'message',
        path:'/message',
        icon: require('../assect/nav/message.png'),
        selectedIcon: require('../assect/nav/message-selected.png'),
    },
    {
        title:'我的',
        key:'personal',
        path:'/mind',
        icon: require('../assect/nav/personal.png'),
        selectedIcon: require('../assect/nav/personal-selected.png'),
    }
];