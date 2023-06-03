import React from 'react'
import './App.css';

import claude from './services/claude'
import { Home } from './components/Home'
import { Department } from './components/Department';
import { Meepy } from './components/Meepy';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

const bookshelves = [
    { key: 'unread', name: 'Start Reading'},
    { key: 'reading', name: 'In Progress'}
];

const books = [
    { id: 1, title: 'Meep', author: 'mareeyoop', shelf: 'unread', image: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"},
    { id: 2, title: 'Moop', author: 'quaggy.io', shelf: 'reading'}
];

function App() {
	return (
        <div className="container">
        <Routes>
            <Route path='/' 
                element={<Home
                    bookshelves={bookshelves}
                    books={books}
                />} exact />
            <Route path='/department' element={<Department/>} exact/>
            <Route path='/meepy' element={<Meepy/>} exact/>
        </Routes>
        </div>
 		// <div className="App">
		// 	<div className="books-home">
		// 		<div className="App-header">
		// 			<img src={logo} className="App-logo" alt="logo" />
		// 			<h1>Philaude</h1>
		// 		</div>
		// 		<div className="books-home-content">
		// 			<div>
		// 				{/* Book rec shelf*/}
		// 				<div className="bookshelf">
		// 					<h2 className="bookshelf-title">Start Reading</h2>
		// 					<div className="bookshelf-books">
		// 						<ol className="books-grid">
		// 							<li>
		// 								<div className="book">
		// 									<div classname="book-top">
		// 									<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
		// 								</div>
		// 									<div className="book-title">To Kill a Mockingbird</div>
		// 									<div className="book-author">Harper Lee</div>										
		// 								</div>
		// 							</li>
		// 							<li>
		// 								<div className="book">
		// 									<div classname="book-top">
		// 									<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
		// 								</div>
		// 									<div className="book-title">To Kill a Mockingbird</div>
		// 									<div className="book-author">Harper Lee</div>										
		// 								</div>
		// 							</li>
		// 						</ol>
		// 					</div>
		// 				</div>

		// 				{/* currently reading */}
		// 				<div className="bookshelf">
		// 					<h2 className="bookshelf-title">In Progress</h2>
		// 					<div className="bookshelf-books">
		// 						<ol className="books-grid">
		// 							<li>
		// 								<div className="book">
		// 									<div className='book-top'>
		// 											<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
		// 											<div className="book-progress"> <h3>53%</h3></div>
		// 									</div>
		// 									<div className="book-title">to kill a meepingbird</div>
		// 									<div className="book-author">moopy</div>
		// 								</div>
		// 							</li>
		// 							<li>
		// 								<div className="book">
		// 									<div className='book-top'>
		// 											<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
		// 											<div className="book-progress"> <h3>18%</h3></div>
		// 									</div>
		// 									<div className="book-title">to kill a meepingbird</div>
		// 									<div className="book-author">moopy</div>
		// 								</div>
		// 							</li>
		// 						</ol>

		// 					</div>


		// 				</div>

		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
}

export default App;
