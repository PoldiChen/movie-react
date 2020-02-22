import React from "react";
import MarkerCreate from "../components/Marker/MarkerCreate/index";
import MovieList from "../components/Movie/MovieList";
import MovieSearch from "../components/Movie/MovieSearch";

class PageMovie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div>
                <MovieSearch style={{
                    margin: 20
                }} />
                <MovieList />
            </div>

        );
    }

}

export default PageMovie;