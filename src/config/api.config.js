const API = {
    'get_list': '/marker',
    'post_create': '/marker',
    'delete_marker': '/marker/%s',


    'get_labels': '/label',
    'create_labels': '/label',

    'get_celebrities': '/celebrity',
    'update_celebrity': '/celebrity',

    'get_movies': '/movie',
    'update_movie_actor': '/movie/${movieId}/celebrity',

    'get_login': '/login',
    'get_current_user': '/user/current_user',

    'get_statistic': '/statistic',

    'get_system_log': '/system_log',

    'get_proxy_address': '/proxy_address'
};

export {API};