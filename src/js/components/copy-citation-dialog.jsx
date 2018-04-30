'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const KeyHandler = require('react-key-handler').default;
const { KEYDOWN } = require('react-key-handler');
const Button = require('zotero-web-library/lib/component/ui/button');
const Modal = require('./modal');
const Icon = require('zotero-web-library/lib/component/ui/icon');
const Input = require('zotero-web-library/lib/component/form/input');
const Select = require('zotero-web-library/lib/component/form/select');

const locators = [
	'page',
	'book',
	'chapter',
	'column',
	'figure',
	'folio',
	'issue',
	'line',
	'note',
	'opus',
	'paragraph',
	'part',
	'section',
	'sub verbo',
	'verse',
	'volume'
].map(locator => ({
	value: locator,
	label: locator[0].toUpperCase() + locator.slice(1)
}));

class CopyCitationDialog extends React.Component {
	state = {
		locator: '',
		label: 'page',
		suppressAuthor: false
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.locator === this.state.locator
				&& prevState.label === this.state.label
				&& prevState.suppressAuthor === this.state.suppressAuthor) {
			return;
		}
		this.props.onCitationModifierChange(this.state);
	}

	handleChange(name, value) {
		this.setState({
			[name]: value
		});
	}

	handleCancel() {
		this.props.onCitationCopyCancel();
	}

	handleConfirm() {
		this.props.onCitationCopy();
	}


	reset() {
		this.setState(this.defaultState);
	}

	render() {
		const title = this.props.isNoteStyle ? 'Copy Note' : 'Copy Citation';
		return (
			<Modal
				key="react-modal"
				className="modal modal-centered"
				isOpen={ this.props.isCitationCopyDialogOpen }
				contentLabel={ title }
				onRequestClose={ () => { this.props.onCitationCopyCancel(); } }
			>
				<React.Fragment>
					<KeyHandler
						keyEventName={ KEYDOWN }
						keyValue="Escape"
						onKeyHandle={ this.handleCancel.bind(this) }
					/>
					<div className="modal-content" tabIndex={ -1 }>
						<div className="modal-header">
							<h4 className="modal-title text-truncate">
								{ title }
							</h4>
							<Button
								className="close"
								onClick={ this.handleCancel.bind(this) }
							>
								<Icon type={ '24/remove' } width="24" height="24" />
							</Button>
						</div>
						<div className="modal-body">
							<div>
								<Select
									tabIndex={ 0 }
									clearable={ false }
									searchable={ false}
									value={ this.state.label }
									options={ locators }
									onChange={ () => true }
									onCommit={ this.handleChange.bind(this, 'label') }
								/>
								<Input tabIndex={ 0 } onChange={ this.handleChange.bind(this, 'locator') } />
							</div>
							<div>
								<label>
									<input
										type="checkbox"
										checked={ this.state.suppressAuthor }
										onChange={ ev => this.handleChange('suppressAuthor', ev.target.checked) }
									/>
									Suppress Author
								</label>
							</div>
							<div>
								<p>Preview:</p>
								<p
									className="preview"
									dangerouslySetInnerHTML={ { __html: this.props.citationHtml } }
								/>
							</div>
						</div>
						<div className="modal-footer">
							<div className="buttons">
								<Button
									className="btn-outline-secondary"
									onClick={ this.handleCancel.bind(this) }
								>
									Cancel
								</Button>
								<Button
									className="btn-secondary"
									onClick={ this.handleConfirm.bind(this) }
								>
									Copy
								</Button>
							</div>
						</div>
					</div>
				</React.Fragment>
			</Modal>
		);
	}

	static propTypes = {
		citationHtml: PropTypes.string,
		confirmLabel: PropTypes.string,
		isCitationCopyDialogOpen: PropTypes.bool,
		isNoteStyle: PropTypes.bool,
		onCitationCopy: PropTypes.func.isRequired,
		onCitationCopyCancel: PropTypes.func.isRequired,
		onCitationModifierChange: PropTypes.func.isRequired,
	}
}


module.exports = CopyCitationDialog;
