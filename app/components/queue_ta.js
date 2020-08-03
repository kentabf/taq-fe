import React from 'react'

import { ThemeConsumer } from '../contexts/theme'
import QueueGrid from './queue_grid'


export default class QueueTa extends React.Component {
	
	state = {
		room: this.props.room,
		selectedUser: null,
	}

	handleSelect = (user) => {
		const { userId, userName, attendingWithName } = user
		if (this.state.room.userInfo.isTa && !attendingWithName) {
			const newSelectedUser = (user === this.state.selectedUser) ? null : user
			this.setState({
				selectedUser: newSelectedUser
			})
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({
				room: this.props.room,
				selectedUser: null
			})
		}
	}

	actionPanel = (postURL, data, prompt, userName, buttonName) => {
		return (
			<ThemeConsumer>
				{({ theme  }) => (
					<div>
						{prompt}&nbsp;
						<div className={`inline-highlight-${theme}`}>{userName}</div>
						 &nbsp;
						<button onClick={()=>this.props.handlePost(postURL, data)}>
		                	{buttonName}
		                </button>
					</div>
				)}
			</ThemeConsumer>
		)
	}

	attend = () => {
		const { userName, userId } = this.state.selectedUser
		const data = new FormData()
		data.append("userId", userId)
		return (
			<ThemeConsumer>
				{({ theme }) => (
					<div>
						Attend to&nbsp;
						<div className={`inline-highlight-${theme}`}>{userName}</div>
						 &nbsp;
						<button onClick={()=>this.props.handlePost('/api/attend', data)}>
		                	Attend
		                </button>
					</div>
				)}
			</ThemeConsumer>
		)
	}

	complete = () => {
		const { attendingWithName } = this.state.room.userInfo
		return (
			<ThemeConsumer>
				{({ theme }) => (
					<div>
						Complete attendance with&nbsp;
						<div className={`inline-highlight-${theme}`}>{attendingWithName}</div>
						 &nbsp;<br/><br/>Would you like to keep this student in queue?<br/><br/>
						<button onClick={()=>this.props.handlePost('/api/complete_keep', null)}>
		                	Complete and keep in queue
		                </button>
		                &nbsp;
		                <button onClick={()=>this.props.handlePost('/api/complete_remove', null)}>
		                	Complete and remove from queue
		                </button>
					</div>
				)}
			</ThemeConsumer>
		)
		return this.actionPanel(postURL, null, 'Complete attendance with', attendingWithName, 'Complete')
	}
	
	render() {
		const { room, selectedUser } = this.state

		const attendingWithName = room.userInfo.attendingWithName

		return (
			<ThemeConsumer>
				{({ theme  }) => (
					<React.Fragment>

						{selectedUser && !attendingWithName && this.attend()}

						{attendingWithName && this.complete()}

						<QueueGrid 
							room={this.state.room} 
							selectedUser={this.state.selectedUser} 
							handleSelect={this.handleSelect.bind(this)}
						/>
					</React.Fragment>
				)}
			</ThemeConsumer>
		)
	}
}

