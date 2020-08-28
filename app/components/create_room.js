import React from 'react'

import Lobby from './lobby'

export default class CreateRoom extends React.Component {

	lobbyMeta = {
		title: 'Create Room',
		action: 'Create',
		fields: [
			{
				label: 'Room Name',
				key: 'roomName',
				value: '',
			},
			{
				label: 'User Name',
				key: 'userName',
				value: '',
			},
		],
		url: '/api/create_room'
	}

	render() {

		return (
			<Lobby meta={this.lobbyMeta} />
		)
	}
}