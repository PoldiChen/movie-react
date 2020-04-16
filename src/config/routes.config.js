import AsyncCompnent from "../components/common/HighOrderComponents/AsyncComponent";

const PageHome = AsyncCompnent(() => import("../pages/PageHome.jsx"));
const PageCelebrity = AsyncCompnent(() => import("../pages/PageCelebrity.jsx"));
const PageMovie = AsyncCompnent(() => import("../pages/PageMovie.jsx"));
const PageLabel = AsyncCompnent(() => import("../pages/PageLabel.jsx"));
const PageSetting = AsyncCompnent(() => import("../pages/PageSetting.jsx"));
const PageCard = AsyncCompnent(() => import("../pages/PageCard.jsx"));
const PageCardCelebrity = AsyncCompnent(() => import("../pages/PageCardCelebrity.jsx"));
const PageSystemLog = AsyncCompnent(() => import("../pages/PageSystemLog.jsx"));
const PageProxyAddress = AsyncCompnent(() => import("../pages/PageProxyAddress.jsx"));

const ROUTES = [
    {
        key: 'Home',
        link: '/home',
        iconType: 'home',
        text: '主页',
        component: PageHome
    },
    // {
    //     key: 'Celebrity',
    //     link: '/celebrity',
    //     iconType: 'profile',
    //     text: 'Celebrity',
    //     component: PageCelebrity
    // },
    // {
    //     key: 'Movie',
    //     link: '/movie',
    //     iconType: 'edit',
    //     text: 'Movie',
    //     component: PageMovie
    // },
    // {
    //     key: 'Label',
    //     link: '/label',
    //     iconType: 'tag',
    //     text: 'Label',
    //     component: PageLabel
    // },

    {
        key: 'Card',
        link: '/card_movie',
        iconType: 'tag',
        text: '电影',
        component: PageCard
    }, {
        key: 'CardCe',
        link: '/card_celebrity',
        iconType: 'profile',
        text: '艺人',
        component: PageCardCelebrity
    }, {
        key: 'Proxy',
        link: '/proxy',
        iconType: 'setting',
        text: '代理',
        component: PageProxyAddress
    }, {
        key: 'SystemLog',
        link: '/system_log',
        iconType: 'setting',
        text: '日志',
        component: PageSystemLog
    }, {
        key: 'Setting',
        link: '/setting',
        iconType: 'setting',
        text: '设置',
        component: PageSetting
    },
];

export { ROUTES };