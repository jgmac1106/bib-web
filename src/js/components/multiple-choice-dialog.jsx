'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const ReactModal = require('react-modal');
const KeyHandler = require('react-key-handler').default;
const { KEYDOWN } = require('react-key-handler');

const Button = require('zotero-web-library/lib/component/ui/button');

class MultipleChoiceDialog extends React.Component {
	render() {
		//@TODO: Remove wrapping div after zotero/web-library#91
		return (
			<div>
				<KeyHandler 
					keyEventName={ KEYDOWN }
					keyValue="Escape"
					onKeyHandle={ () => this.props.onMultipleChoiceCancel() }
				/>
				<ReactModal 
					isOpen={ this.props.isPickingItem }
					contentLabel="Please select a citation from the list"
					className="multiple-choice-dialog modal"
					overlayClassName="overlay"
				>
					
					<h1 className="title">
						Please select a citation from the list
					</h1>
					<div className="scroll-container">
						<ul>
							{
								this.props.multipleChoiceItems.map(
									item => {
										return (
											<li 
												className="item" 
												key={ item.key }
												onClick={ () => this.props.onMultipleChoiceSelect([item]) }
											>
												{ item.value }
											</li>
										);
									}
								)
							}
						</ul>
					</div>
					<div className="buttons">
						<Button onClick={ () => this.props.onMultipleChoiceCancel() }>
							Cancel
						</Button>
					</div>
				</ReactModal>
			</div>
		);
	}

	static defaultProps = {
		multipleChoiceItems: []
	}
	
	static propTypes = {
		isPickingItem: PropTypes.bool,
		multipleChoiceItems: PropTypes.array,
		onMultipleChoiceCancel: PropTypes.func.isRequired,
		onMultipleChoiceSelect: PropTypes.func.isRequired,
	}
}

module.exports = MultipleChoiceDialog;