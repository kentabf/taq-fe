import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import { ThemeProvider } from './contexts/theme'
import Loading from './components/loading'
import Title from './components/title'
import Nav from './components/nav'
import './index.css'

const BACKEND_LOCAL = false

window.backend_url = BACKEND_LOCAL? 'http://127.0.0.1:8000' : 'https://taq-be.herokuapp.com'

const Room = React.lazy(() => import('./components/room'))
const CreateRoom = React.lazy(() => import('./components/create_room'))
const JoinRoom = React.lazy(() => import('./components/join_room'))
const About = React.lazy(() => import('./components/about'))

class App extends React.Component {
	
	state = {
		theme: 'dark',
		toggleTheme: () => {
			this.setState(({ theme }) => ({
				theme: theme === 'light' ? 'dark' : 'light'
			}))
		}
	}

	render() {
		return (
			<Router>
				<ThemeProvider value={this.state}>
					<div className={this.state.theme}>
						<div className='outer-container'>
							<Title />
							<Nav />
							<React.Suspense fallback ={<Loading text='Loading'/>}>
								<Switch>
									<Route exact path='/'>
										<Redirect to='/room'/>
									</Route>
									<Route exact path='/room' component={Room} />
									<Route exact path='/join_room' component={JoinRoom}/>
									<Route exact path='/create_room' component={CreateRoom} />
									<Route exact path='/about' component={About} />
									<Route render={() => <h1>404</h1>} />
								</Switch>
							</React.Suspense>
						</div>
					</div>
				</ThemeProvider>
			</Router>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
)

/*

TODO:
- see if it works with chrome
*/
