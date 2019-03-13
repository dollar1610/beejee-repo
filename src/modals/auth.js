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
        <button className="btn" onClick={this.toggle}>Вход для администратора</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Вход</ModalHeader>
          <ModalBody>
            <Input
                id="login"
                type="text"
                placeholder="Имя пользователя"
              />
              <Input
                id="password"
                type="text"
                placeholder="Пароль"
              />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { this.props.signIn(); this.toggle(); } } color="primary">Войти</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Auth;