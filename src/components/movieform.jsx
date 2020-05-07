import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { Paginate } from '../utils/paginate';
import List from './common/list';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';
import MovieTable from './movieTable';
class Movies extends Component {
    state = {
        movies: [],
        genres:[],
        pageSize: 4,
        currentPage: 1,
        sortcolumn: {
            path: 'title',
            order:'asc'
        }
    };
    componentDidMount() {
        const genres=[{_id:"",name:"All genre"}, ...getGenres()]
        this.setState({ movies: getMovies(), genres});
    }
    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies: movies });
    }
    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState ({ movies } );
    }
    handlePageChange = page => {
        this.setState({ currentPage: page });
    }
    handleGenreSelect = genre => {
        this.setState({ selectGenre: genre,currentPage:1 });
    }
    handleSort = sortcolumn => {
       this.setState({ sortcolumn });
    }
    
    render() { 
        if (this.state.movies.length === 0)
            return <p>No movies in database</p>
        const filter=this.state.selectGenre && this.state.selectGenre._id? this.state.movies.filter(m=>m.genre._id===this.state.selectGenre._id):this.state.movies
       const sorted= _.orderBy(filter,[this.state.sortcolumn.path],[this.state.sortcolumn.order])
        const movies = Paginate(sorted, this.state.currentPage, this.state.pageSize);
        return (
            <div className="row">
            <div className="col-3">
                    <List
                        items={this.state.genres}
                        selectItem={this.state.selectGenre}
                        onItemsSelect={this.handleGenreSelect} />
            </div>
                <div className="col">
                    <p>showing {filter.length} movie in database</p>
                    <MovieTable movies={movies} onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort} sortcolumn={this.state.sortcolumn}/>
                    <Pagination itemCount={filter.length} pageSize={this.state.pageSize} currentPage={this.state.currentPage} onPageChange={this.handlePageChange} />
                </div>
                </div>
            );
    }
}
 
export default Movies;