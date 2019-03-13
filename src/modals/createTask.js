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
        <button className="btn" onClick={this.toggle}>Создать задачу</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Окно создания задачи</ModalHeader>
          <ModalBody>
            <Input
             id="createUsername"
              type="text"
              placeholder="Имя пользователя"
            />
            <Input
              id="createEmail"
              type="text"
              placeholder="Почта"
            />
            <Input
              id="createText"
              type="text"
              placeholder="Текст задачи"
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { this.props.createTask(); this.toggle(); } } color="primary">Создать</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Auth;