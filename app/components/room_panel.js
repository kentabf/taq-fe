import React from 'react'

import { ThemeConsumer } from '../contexts/theme'

export default class RoomPanel extends React.Component {

	state = {
		room: this.props.room,
		leaveWarning: null,
		codeShow: false
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({
				room: this.props.room,
				selectedUser: null,
				codeShow: false
			})
		}
	}

	handleCodeShow = () => {
		const newVal = this.state.codeShow === false
		this.setState({
			codeShow: newVal
		})
	}

	renderHide = () => {
		return (
			<ThemeConsumer>
				{({ theme }) => (
					<div>
						<div className='buffer' />
						<button onClick={this.handleCodeShow}>
							Show room codes
						</button>
					</div>
				)}
			</ThemeConsumer>
		)
	}

	renderShow = () => {
		const { stCode, taCode, roomId } = this.state.room.roomInfo

		return (
			<ThemeConsumer>
				{({ theme }) => (
					<React.Fragment>
						<div className='buffer' />
						<div className='codes'>
							<button onClick={this.handleCodeShow}>
								Hide codes
							</button>
							<div className='outer'>
								<div className='left'>
									Room Id:
								</div>
								<div className='right'>
									{roomId}
								</div>
							</div>
							<div className='outer'>
								<div className='left'>
									Students: 
								</div>
								<div className='right'>
									{stCode}
								</div>
							</div>
							<div className='outer'>
								<div className='left'>
									TAs: 
								</div>
								<div className='right'>
									{taCode}
								</div>
							</div>
						</div>
					</React.Fragment>
				)}
			</ThemeConsumer>
		)
	}

	renderTa = () => {

		const { userName, dateimeQueued, queueTopic, attendingWithName } = this.state.room.userInfo
		const { codeShow } = this.state

		return (
			<ThemeConsumer>
				{({ theme }) => (
					<div className='room-panel-detail'>
						<div className='room-panel-user-name'>{userName}</div>
						{attendingWithName && <div>Currently attending with {attendingWithName}</div>}
						{codeShow && this.renderShow()}
						{!codeShow && this.renderHide()}
			        </div>
		        )}
	        </ThemeConsumer>
        )
	}

	renderSt = () => {

		const { userName, dateimeQueued, queueTopic, attendingWithName } = this.state.room.userInfo

		return (
			<ThemeConsumer>
				{({ theme }) => (
					<div className='room-panel-detail'>
						<div className='room-panel-user-name'>{userName}</div>
						{dateimeQueued && <div>Currently in queue regarding "{queueTopic}"</div>}
						{!dateimeQueued && <div>Currently not in queue</div>}
						{attendingWithName && <div>{attendingWithName} is attending to you</div>}
			        </div>
		        )}
	        </ThemeConsumer>
        )
	}

	leaveRoom = () => {
		const { userInfo } = this.state.room

	}

	render() {

		const { roomInfo, userInfo } = this.state.room
		const isTa = userInfo.isTa

		// TODO: add a "leave room" button
		// TODO: add the

		return (
			<ThemeConsumer>
				{({ theme }) => (
					<div>
						<div>
							<div className={`room-title room-title-${theme}`}>{roomInfo.roomName}</div>
						</div>
						{isTa && this.renderTa()}
						{!isTa && this.renderSt()}
					</div>
				)}
			</ThemeConsumer>
		)
	}

}