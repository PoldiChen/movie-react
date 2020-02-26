const API = {
    'get_list': '/marker',
    'post_create': '/marker',
    'delete_marker': '/marker/%s',


    'get_labels': '/label',
    'create_labels': '/label',

    'get_actors': '/actor',
    'update_actor': '/actor',

    'get_movies': '/movie',
    'update_movie_actor': '/movie/${movieId}/actor',

    'get_login': '/login',
    'get_current_user': '/user/current_user',

    'get_statistic': '/statistic',
};

export { API };