import React from 'react'

import QueueGrid from './queue_grid'
import { ThemeConsumer } from '../contexts/theme'


export default class QueueSt extends React.Component {
	
	state = {
		room: this.props.room,
		queueTopic: ''
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({
				room: this.props.room,
				queueTopic: ''
			})
		}
	}

	handleInputChange = (event) => {
		const field = event.target.name
		this.setState({
			[field]: event.target.value
		})
	}

	handleEnqueueSubmit = (event) => {
		event.preventDefault()
		const postURL = '/api/enqueue'
		const data = new FormData(event.target)
		this.props.handlePost(postURL, data)
	}

	enqueue = () => {
		return(
             <form onSubmit={this.handleEnqueueSubmit}>
                <label>
                	Enter a topic and join a queue&nbsp;
                	<input
                		type="text"
                		name="queueTopic"
                		value={this.state.queueTopic}
                		onChange={this.handleInputChange} />
                	&nbsp;
                </label>
                <button>
                	Enqueue
                </button>
	        </form>
		)
	}

	dequeue = () => {
		const postURL = '/api/dequeue'
		return(
            <div>
            	Exit the queue&nbsp;
                <button onClick={()=>this.props.handlePost(postURL, null)}>
                	Dequeue
                </button>
            </div>
		)
	}

	render() {
		const { room } = this.state

		return (
			<ThemeConsumer>
				{({ theme  }) => (
					<React.Fragment>

						{room.userInfo.datetimeQueued && this.dequeue()}

						{!room.userInfo.datetimeQueued && this.enqueue()}

						<QueueGrid 
							room={room} 
							selectedUser={null} 
							handleSelect={() => null}
						/>
					</React.Fragment>
				)}
			</ThemeConsumer>
		)
	}
}
