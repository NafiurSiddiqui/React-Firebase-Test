import React, { useCallback, useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

// function App() {
// 	//states
// 	const [movies, setMovies] = useState([]);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState(null);
// 	// fetch movies inside try block

// 	const fetchMoviesHandler = async () => {
// 		//spinner state
// 		setIsLoading(true);
// 		//clear any previous error state
// 		setError(null);
// 		//MUST try catch for error handling
// 		try {
// 			const res = await fetch('https://swapi.dev/api/films');
// 			//throw error in any unsuccessful response
// 			if (!res.ok) {
// 				throw new Error('Oops!Something went wrong!');
// 			}

// 			const data = await res.json();

// 			const transformedMovies = data.results.map((movies) => {
// 				return {
// 					id: movies.episode_id,
// 					title: movies.title,
// 					openingText: movies.opening_crawl,
// 					releaseData: movies.release_date,
// 				};
// 			});
// 			//push these movies into the state
// 			setMovies(transformedMovies);
// 		} catch (error) {
// 			setError(error.message);
// 		}
// 		//set loading to false, whether there is error or not
// 		setIsLoading(false);
// 	};

// 	return (
// 		<React.Fragment>
// 			<section>
// 				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
// 			</section>
// 			<section>
// 				{!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
// 				{!isLoading && movies.length === 0 && !error && <p>No movies found</p>}
// 				{isLoading && <p>Loading...</p>}
// 				{!isLoading && error && <p>{error}</p>}
// 			</section>
// 		</React.Fragment>
// 	);
// }

// export default App;

//------------------- Stage 2 (DRY) Button click
// function App() {
// 	//states
// 	const [movies, setMovies] = useState([]);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState(null);
// 	// fetch movies inside try block

// 	const fetchMoviesHandler = async () => {
// 		//spinner state
// 		setIsLoading(true);
// 		//clear any previous error state
// 		setError(null);
// 		//MUST try catch for error handling
// 		try {
// 			const res = await fetch('https://swapi.dev/api/films');
// 			//throw error in any unsuccessful response
// 			if (!res.ok) {
// 				throw new Error('Oops!Something went wrong!');
// 			}

// 			const data = await res.json();

// 			const transformedMovies = data.results.map((movies) => {
// 				return {
// 					id: movies.episode_id,
// 					title: movies.title,
// 					openingText: movies.opening_crawl,
// 					releaseData: movies.release_date,
// 				};
// 			});
// 			//push these movies into the state
// 			setMovies(transformedMovies);
// 		} catch (error) {
// 			setError(error.message);
// 		}
// 		//set loading to false, whether there is error or not
// 		setIsLoading(false);
// 	};
// 	//condtional content rendering
// 	let content = <p>No movies found</p>;
// 	//first check: data
// 	if (movies.length > 0) {
// 		content = <MoviesList movies={movies} />;
// 	}
// 	if (error) {
// 		content = <p>{error}</p>;
// 	}
// 	if (isLoading) {
// 		content = <p>Loading...</p>;
// 	}

// 	return (
// 		<React.Fragment>
// 			<section>
// 				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
// 			</section>
// 			<section>{content}</section>
// 		</React.Fragment>
// 	);
// }

// export default App;

//----------- stage 3 - onLoad results

// function App() {
// 	//states
// 	const [movies, setMovies] = useState([]);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState(null);

// 	// fetch movies inside try block

// 	const fetchMoviesHandler = useCallback(async () => {
// 		//spinner state
// 		setIsLoading(true);
// 		//clear any previous error state
// 		setError(null);
// 		//MUST try catch for error handling
// 		try {
// 			const res = await fetch('https://swapi.dev/api/films');
// 			//throw error in any unsuccessful response
// 			if (!res.ok) {
// 				throw new Error('Oops!Something went wrong!');
// 			}

// 			const data = await res.json();

// 			const transformedMovies = data.results.map((movies) => {
// 				return {
// 					id: movies.episode_id,
// 					title: movies.title,
// 					openingText: movies.opening_crawl,
// 					releaseData: movies.release_date,
// 				};
// 			});
// 			//push these movies into the state
// 			setMovies(transformedMovies);
// 		} catch (error) {
// 			setError(error.message);
// 		}
// 		//set loading to false, whether there is error or not
// 		setIsLoading(false);
// 	}, []);

// 	useEffect(() => {
// 		fetchMoviesHandler();
// 	}, [fetchMoviesHandler]);
// 	//condtional content rendering
// 	let content = <p>No movies found</p>;
// 	//first check: data
// 	if (movies.length > 0) {
// 		content = <MoviesList movies={movies} />;
// 	}
// 	if (error) {
// 		content = <p>{error}</p>;
// 	}
// 	if (isLoading) {
// 		content = <p>Loading...</p>;
// 	}

// 	return (
// 		<React.Fragment>
// 			<section>
// 				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
// 			</section>
// 			<section>{content}</section>
// 		</React.Fragment>
// 	);
// }

// export default App;

//------------ stage 4 (add movies)

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				'https://react-movieapp-test-default-rtdb.firebaseio.com/films.json'
			);
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			const data = await response.json();

			//new array for our movies
			const loadedMovies = [];

			for (const key in data) {
				//for every key in the object,we get in response
				loadedMovies.push({
					id: key,
					title: data[key].title,
					openingText: data[key].openingText,
					releaseDate: data[key].releaseDate,
				});
			}

			setMovies(loadedMovies);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	//posting data
	async function addMovieHandler(movie) {
		const res = await fetch(
			'https://react-movieapp-test-default-rtdb.firebaseio.com/films.json',
			{
				method: 'POST',
				body: JSON.stringify(movie),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		const data = await res.json();

		console.log(data);
	}

	let content = <p>Found no movies.</p>;

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return (
		<React.Fragment>
			<section>
				<AddMovie onAddMovie={addMovieHandler} />
			</section>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;

/**
 * @return
 * 1st - if not loading and some movies exist
 * 2nd - if not loading and movie does not exist
 * 3rd - if not loading and there is error, show error
 * @alt -
 * an alrnative way of rendering this data would be to just render content based on condition
 * @useEffect -
 * we used useEffect to handle the side effect and prevent sending http request on every evaluation and put on the fetchHandler as dependency.Because, if the 'fetchHandler' fucntion changes, the useEffect should reExecute again.Although, the fetch handler is not changed here but to keep it clean we should add dependencies. Proble with doing this though, since functions are object type, everytime the <app> components run, the 'fetch..' will run again.Therefore, an infinite loop is created for adding it as dependency.
 * 👆 Solution: to omit the dependency, but that can introduce any bug in case the 'fetch..' would be using some external state.
 * 👆 better solution: To use @callback hook and wrap it around dependencies.
 *
 * @stage4 -
 * we added the firebase dataBase and changed the link from the previous to our own firebase url
 *
 * @url : Firebase requires to end the new node,(films.json) to end with a Json format otherwise, request will be failed.
 *
 * @POST
 * sending POST request will create resource, manually or automatically based on the API
 * body - the resource which should be stored.
 * ****** we needed to Jsonify, since that is the way POST resource is exchanged.
 */
