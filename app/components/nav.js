import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaDoorOpen, FaHammer, FaInfo} from 'react-icons/fa'

import { ThemeConsumer } from '../contexts/theme'

const activeStyle = {
	color: 'rgba(187, 46, 31, 1.0)'
}

export default function Nav () {
	return (
		<ThemeConsumer>
			{({ theme, toggleTheme }) => (
				<div>
					<nav className='row space-between'>
						<ul className='row nav'>
							<li>
								<NavLink 
									to='/room' 
									exact
									activeStyle={activeStyle}
									className='nav-link'
								>
									Current Room&nbsp;
									<FaHome size={16} />
								</NavLink>
							</li>
							<li>
								<NavLink 
									to='/join_room' 
									exact
									activeStyle={activeStyle}
									className='nav-link'
								>
									Join New Room&nbsp;
									<FaDoorOpen size={16} />
								</NavLink>
							</li>
							<li>
								<NavLink 
									to='/create_room' 
									exact
									activeStyle={activeStyle}
									className='nav-link'
								>
									Create New Room&nbsp;
									<FaHammer size={16} />
								</NavLink>
							</li>
							<li>
								<NavLink 
									to='/about' 
									exact
									activeStyle={activeStyle}
									className='nav-link'
								>
									About taq&nbsp;
									<FaInfo size={16} />
								</NavLink>
							</li>

						</ul>
						<button
							style={{fontSize: 30}}
							className='btn-clear'
							onClick={toggleTheme}
						>
							{theme === 'light' ? '🔦' : '💡'}
						</button>
					</nav>
				</div>
			)}	
		</ThemeConsumer>
	)
}