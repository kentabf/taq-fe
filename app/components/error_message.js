import React from 'react'

import { ThemeConsumer } from '../contexts/theme'

export default function ErrorMessage({ errorMessage, defaultInstruction, noError }) {
	const instructionMessage = defaultInstruction? defaultInstruction : 'Please try again'
	const errorString = noError? errorMessage : `Error: ${errorMessage}`
	if (errorMessage) {
		return (
			<ThemeConsumer>
				{({ theme }) => (
					<div className={`error-message-${theme}`}>
						{errorString}<br/>
						{instructionMessage}
					</div>
				)}
			</ThemeConsumer>
		)	
	} else {
		return null
	}

}