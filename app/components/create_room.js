import React from 'react'

import Lobby from './lobby'

export default class CreateRoom extends React.Component {

	render() {

		const meta = {
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

		return (
			<Lobby meta={meta} />
		)
	}
}