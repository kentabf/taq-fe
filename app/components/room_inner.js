import React from 'react'

import RoomPanel from './room_panel'
import QueueTa from './queue_ta'
import QueueSt from './queue_st'
import { ThemeConsumer } from '../contexts/theme'

export default class RoomInner extends React.Component {
	
	state = {
		room: this.props.room,
	}

	handlePost = (postURL, data) => {
		console.log("handlepost outer called")
		fetch(window.backend_url+postURL, {
			method: 'POST',
			credentials: 'include',
			body: data
		}).then(response => {
			console.log("handlepost then called")
			if (response.status === 200) {
				this.props.reload()
			} else if (response.status === 401){
				// TODO
			} else {
				// TODO
			}
		}).catch(err => {
			// TODO
		})
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({
				room: this.props.room,
			})
		}
	}

	renderQueue = () => {
		const { room } = this.state
		if (room.userInfo.isTa) {
			return (
				<QueueTa room={room} handlePost={this.handlePost.bind(this)}/>
			)
		} else {
			return (
				<QueueSt room={room} handlePost={this.handlePost.bind(this)}/>
			)
		}
	}
	
	render() {

		const { room } = this.state

		return (
			<ThemeConsumer>
				{({ theme }) => (
					<React.Fragment>

						<div className={`space-between room-component room-component-${theme}`}>
							<RoomPanel room={room} />
						</div>

						<div className='buffer' />

						<div className={`space-between room-component room-component-${theme}`}>
							{this.renderQueue()}
						</div>

					</React.Fragment>
				)}
			</ThemeConsumer>
		)
	}
}