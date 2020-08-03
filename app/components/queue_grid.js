import React from 'react'

import Tooltip from './tooltip'
import { ThemeConsumer } from '../contexts/theme'

export default class QueueGrid extends React.Component {
	
	state = {
		room: this.props.room,
		selectedUser: this.props.selectedUser
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({
				room: this.props.room,
				selectedUser: this.props.selectedUser
			})
		}
	}

	getHighlightingClassName = (user, theme) => {
		const yourself = user.userId === this.state.room.userInfo.userId? 'yourself' : ''
		if (user.attendingWithName) {
			return `${yourself} queue-card-attending-${theme}`
		} else if (user === this.state.selectedUser) {
			return `${yourself} queue-card-selected-${theme}`
		} else {
			return `${yourself} queue-card-regular-${theme}`
		}
	}

	renderQueueCard = (user) => {
		const {
			queueNum, userId, minutesLapsed, 
			userName, queueTopic, attendingWithName
		} = user

		const queueUserName = userId === this.state.room.userInfo.userId? `${userName} (You)` : userName

		return (
			<ThemeConsumer>
				{({ theme  }) => (
					<div className='queue-card-outer'>
						<div className={`queue-card ${this.getHighlightingClassName(user, theme)}`}>
							<Tooltip text={`This user joined the queue ${minutesLapsed} minutes ago`}>
									<div className='queue-number'>
										{queueNum}
									</div>
									<div className='queue-user'>
										<div className='queue-username'>
											{queueUserName}
										</div>
										<div className='queue-topic'>
											{queueTopic}
										</div>
										{attendingWithName && 
											<div className='queue-topic'>
												Currently being attended by {attendingWithName}
											</div>
										}
									</div>	
							</Tooltip>
						</div>
					</div>
				)}
			</ThemeConsumer>
		)
	}
	
	render() {
		const { room, selectedUser } = this.state

		const lastUser = room.queue[0]

		return (
			<ThemeConsumer>
				{({ theme }) => (
					<React.Fragment>
						<div className='buffer' />
						<div>
							<div className={`room-panel-detail queue-grid`}>
								Queue
								<ul>
									{room.queue.map((user) => {
										return (
											<li onClick={() => this.props.handleSelect(user)} key={user.userId}>
												{this.renderQueueCard(user)}
											</li>
										)
									})}
								</ul>
							</div>
						</div>
					</React.Fragment>
				)}
			</ThemeConsumer>
		)
	}
}
