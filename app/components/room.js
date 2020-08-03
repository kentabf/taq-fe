import React from 'react'
import { FaSignOutAlt, FaSync} from 'react-icons/fa'

import Loading from './loading'
import RoomInner from './room_inner'
import ErrorMessage from './error_message'
import { ThemeConsumer } from '../contexts/theme'

export default class Room extends React.Component {

	state = {
		room: null,
		error: null,
		leaveWarning: false
	}

	componentDidMount() {
		this.fetchRoom()
	}

	includeMinutesLapsed = (user) => {
		const { datetimeQueued } = user

		const curr = new Date()
		
		const ymd = datetimeQueued.split(' ')[0].split('-')
		const hms = datetimeQueued.split(' ')[1].split(':')
		const year = ymd[0], month = ymd[1], day = ymd[2]
		const hour = hms[0], minute = hms[1], second = hms[2]
		
		const then = Date.UTC(
			parseInt(year), (parseInt(month)-1)%12, parseInt(day), 
			parseInt(hour), parseInt(minute), parseInt(second)
		)

		user.minutesLapsed = Math.floor((curr - then)/60000)
	}

	fetchRoom = () => {
		fetch(window.backend_url+'/api/room', {
			method: 'POST',
			credentials: 'include',
		})
			.then(response => {
				const status = response.status
				response.json()
					.then(body => {
						if (status === 200) {
							body.queue.forEach((user) => {
								this.includeMinutesLapsed(user)
							})
							this.setState({
								room: body
							})
						} else {
							this.setState({
								error: body
							})
						}
					})
			}).catch(err => {
				// TODO
			})
	}

	isLoading = () => {
		return !this.state.room && this.state.error === null
	}

	forceLeaveRoom = () => {
		fetch(window.backend_url+'/api/leave', {
			method: 'POST',
			credentials: 'include',
		}).then(response => {
				const status = response.status
				response.json()
					.then(body => {
						if (status === 200) {
							this.setState({
								room: null,
								error: 'Currently not in a room',
								leaveWarning: null
							})
						} else {
							this.setState({
								room: null,
								error: body,
								leaveWarning: null
							})
						}
					})
			}).catch(err => {
				// TODO
			})
	}

	stayRoom = () => {
		this.setState({
			leaveWarning: null
		})
	}

	leaveRoom = () => {
		const { leaveWarning } = this.state
		const { attendingWithName, datetimeQueued, isTa } = this.state.room.userInfo

		if (leaveWarning || (!attendingWithName && !datetimeQueued)) {
			this.forceLeaveRoom()
		} else if (attendingWithName) {
			const attendingWarning = `You are still ${isTa? 'attending with' : 'being attended by'} ${attendingWithName}`
			this.setState({
				leaveWarning: attendingWarning
			})
		} else {
			this.setState({
				leaveWarning: 'You are still in queue'
			})
		}

	}

	renderRoomActions = () => {
		const { leaveWarning, error } = this.state
		if (error) {
			return null
		} else if (leaveWarning) {
			return (
				<div className='leave-warning'>
					<ErrorMessage errorMessage={leaveWarning} defaultInstruction='Do you still wish to leave?'/>
					<div>
						<div className='secondary-leave-room'>
							<button onClick={this.leaveRoom}>
								Leave Room
							</button>
						</div>
						<div className='secondary-leave-room'>
							<button onClick={this.stayRoom}>
								Stay Put
							</button>
						</div>
					</div>
				</div>

			)
		} else {
			return (
				<React.Fragment>
					<div className='room-action'>
						<button onClick={this.leaveRoom}>
							Leave room
						</button>
						<FaSignOutAlt />
					</div>
					<div className='room-action'>
						<button onClick={this.fetchRoom}>
							Refresh room
						</button>
						<FaSync />
					</div>
				</React.Fragment>
			)
		}
	}

	render() {
		const { room, error } = this.state

		return (
			<ThemeConsumer>
				{({ theme }) => (
					<div className={`inner-container center bg-${theme}`}>
				        
				        {this.isLoading() && <Loading text='Fetching room'/>}

				  		<ErrorMessage errorMessage={error} defaultInstruction='Please join a room first' />

				  		{this.renderRoomActions()}

				  		{room && <RoomInner room={room} reload={this.fetchRoom.bind(this)} />}

		        	</div>
	        	)}
			</ThemeConsumer>
		)
	}

}