import React from 'react'
import  { Redirect } from 'react-router-dom'

import ErrorMessage from './error_message'
import { ThemeConsumer } from '../contexts/theme'

export default class Lobby extends React.Component {

	state = {
		meta: this.props.meta,
		loggedIn: false,
		errorMessage: null
	}

	resetWithErrorMessage = (errorMessage) => {
		this.setState(prevState => ({
			errorMessage: errorMessage,
			meta: {
				...prevState.meta,
				fields: prevState.meta.fields.map((field) => true? {...field, value: ''} : field)
			}
		}))
	}

	handleInputChange = (event) => {
		const targetKey = event.target.name
		const targetValue = event.target.value
		this.setState(prevState => ({
			meta: {
				...prevState.meta,
				fields: prevState.meta.fields.map((field) => field.key === targetKey? {...field, value: targetValue} : field)
			}
		}))
	}

	handleSubmit = (event) => {
		event.preventDefault()
		const data = new FormData(event.target)
		fetch(window.backend_url+this.state.meta.url, {
			method: 'POST',
			body: data,
			credentials: 'include',
		}).then(response => {
			const status = response.status
			response.json().then(body => {
				if (status === 201) {
					this.setState({
						loggedIn: true
					})
				} else if (status === 422) {
					this.resetWithErrorMessage('Not all fields completed')
				} else {
					this.resetWithErrorMessage(body)
				}
			})
		}).catch(err => {
			//TODO
		})
	}

	render() {

		const { meta } = this.state
		const fields = meta.fields || []

		if (this.state.loggedIn) {
			return <Redirect to="/" />
		} else {
			return (
				<ThemeConsumer>
					{({ theme }) => (
						<div className={`inner-container center bg-${theme}`}>
							<h1 className={`room-title room-title-${theme}`}>
								{meta.title}
							</h1>
							<ErrorMessage errorMessage={this.state.errorMessage} />
					        <form onSubmit={this.handleSubmit}>
								{fields.map((field) => {
									
									const { label, key, value } = field
									
									return (
							            <div key={key}>
							                <p>
							                    <label className={`field`}>
							                    	{label}<br/>
							                    	<input
							                    		type="text"
							                    		name={key}
							                    		value={value}
							                    		onChange={this.handleInputChange} />
							                    </label>
							                </p>
							            </div>
									)
								})}
								<div>
					                <p>
					                    <button>{meta.action}!</button>
					                </p>
 					            </div>
					        </form>
				        </div>
					)}
				</ThemeConsumer>
			)
		}
	}

}