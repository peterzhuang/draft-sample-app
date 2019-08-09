import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

class MyEditor extends React.Component {
  editorStyles = {
    width: "200px",
    margin: "10px",
    border: "1px solid gray"
  };
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.toggleInlineStyle("BOLD")}>Bold</button>
          <button onClick={() => this.toggleInlineStyle("ITALIC")}>
            Italic
          </button>
        </div>
        <div style={this.editorStyles}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </div>
    );
  }
}

export default MyEditor;
