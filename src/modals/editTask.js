import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <textarea onClick={this.toggle} defaultValue={this.props.value} readOnly={!this.props.isAdmin} />
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Окно редактирования задачи</ModalHeader>
          <ModalBody>
            <textarea id="editText" defaultValue={this.props.value} />
            <Input placeholder="Введите статус задачи" id="editStatus" type="text" />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { this.props.editText(this.props.taskId); this.toggle(); }} color="primary">Редактировать</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Auth;