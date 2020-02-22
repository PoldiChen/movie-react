import AsyncCompnent from "../components/common/HighOrderComponents/AsyncComponent";

const PageHome = AsyncCompnent(() => import("../pages/PageHome.jsx"));
const PageActor = AsyncCompnent(() => import("../pages/PageActor.jsx"));
const PageMovie = AsyncCompnent(() => import("../pages/PageMovie.jsx"));
const PageLabel = AsyncCompnent(() => import("../pages/PageLabel.jsx"));
const PageSetting = AsyncCompnent(() => import("../pages/PageSetting.jsx"));

const ROUTES = [
    {
        key: 'Home',
        link: '/home',
        iconType: 'home',
        text: 'Home',
        component: PageHome
    }, {
        key: 'Actor',
        link: '/actor',
        iconType: 'profile',
        text: 'Actor',
        component: PageActor
    }, {
        key: 'Movie',
        link: '/movie',
        iconType: 'edit',
        text: 'Movie',
        component: PageMovie
    }, {
        key: 'Label',
        link: '/label',
        iconType: 'tag',
        text: 'Label',
        component: PageLabel
    }, {
        key: 'Setting',
        link: '/setting',
        iconType: 'setting',
        text: 'Setting',
        component: PageSetting
    }
];

export { ROUTES };