import React from 'react'

import Lobby from './lobby'

export default class JoinRoom extends React.Component {

	lobbyMeta = {
		title: 'Join Room',
		action: 'Join',
		fields: [
			{
				label: 'Room Id',
				key: 'roomId',
				value: '',
			},
			{
				label: 'Code',
				key: 'code',
				value: '',
			},
			{
				label: 'User Name',
				key: 'userName',
				value: '',
			}
		],
		url: '/api/join_room'
	}

	render() {

		return (
			<React.Fragment>
				<Lobby meta={this.lobbyMeta} />
			</React.Fragment>
		)
	}
}