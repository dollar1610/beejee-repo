import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import md5 from 'md5';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import ModalAuth from '../modals/auth';
import ModalCreateTask from '../modals/createTask';
import ModalEditTask from '../modals/editTask';
import urlEncode from '../utils/urlEncode';
import { isAdmin, setTaskList, setActivePage } from './action';
import './index.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadData = this.loadData.bind(this);
    this.changeActivePage = this.changeActivePage.bind(this);
    this.signIn = this.signIn.bind(this);
    this.sort = this.sort.bind(this);
    this.createTask = this.createTask.bind(this);
    this.editText = this.editText.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  changeActivePage(pageNumber) {
    this.props.dispatch(setActivePage(pageNumber));
  }
  createTask() {
    const username = document.getElementById('createUsername').value;
    const email = document.getElementById('createEmail').value;
    const text = document.getElementById('createText').value;
    const form = new FormData();
    form.append('username', encodeURIComponent(username));
    form.append('email', email);
    form.append('text', encodeURIComponent(text));
    fetch(`https://uxcandy.com/~shapoval/test-task-backend/create?developer=Example`, {
      method: 'POST',
      body: form,
    }).then(response => {
      console.log(response.status);
      if (response.status === 200) {
        console.log(response.json());
        this.loadData();
      }
    })
  }
  editText(id) {
    const taskList = this.props.App.taskList.tasks;
    const text = document.getElementById('editText').value;
    const status = document.getElementById('editStatus').value;
    // let username, email;
    // taskList.filter((item, i) => {
    //   if (id === taskList[i].id) {
    //     username = taskList[i].username;
    //     email = taskList[i].email;
    //   }
    // });  
    let signature = '';
    [{text}, {status}].sort().map((item) => {
      signature += urlEncode(item);
      signature += '&';
      return null;
    });
    signature += urlEncode({
      token: 'beejee'
    });
    let url = urlEncode({
      text,
      status,
      token: 'beejee',
    });
    console.log(signature, url);
    fetch(`https://uxcandy.com/~shapoval/test-task-backend/edit/:${id}?developer=Example&signature=${md5(signature)}`, {
      method: 'POST',
      body: `${url}`,
    }).then(response => console.log(response.json()))
    this.loadData(url);
  }
  signIn() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    if (login === 'admin' && password === '123') {
      this.props.dispatch(isAdmin(true));
    }
  }
  sort(event) {
    const sort_field = event.target.dataset.sort;
    const sort_direction = event.target.dataset.sortDirection;
    const url = urlEncode({
      sort_field,
      sort_direction,
    })
    console.log(url);
    this.loadData(url);
  }
  loadData(url='') {
    const activePage = this.props.App.activePage;
    fetch(`https://uxcandy.com/~shapoval/test-task-backend/?developer=Name&${url}&page=${activePage}`)
      .then(response => response.json()).then(data => {
        this.props.dispatch(setTaskList(data.message));
      })
  }
  render() {
    console.log(this.props);
    const taskList = this.props.App.taskList.tasks || [];
    const isAdmin = this.props.App.isAdmin;
    // это не я такое свойство придумал, это с бека такое пришло. Скорее там ошибка, чем у меня, т.к там и камелкейс и снейккейс
    const totalTaskCount = this.props.App.taskList.total_task_count;
    const activePage = this.props.App.activePage;
    return (
      <div className="App">
      <Container>
        <div className="header">
          <div className="admin"><ModalAuth signIn={this.signIn} /></div>
          <ModalCreateTask createTask={this.createTask}  />
        </div>
        <div className="body">
          <div className="body-header">
            <span>Сортировать по:</span>
            <div className="username">
              Имя пользователя
              <button onClick={this.sort}><i data-sort-direction="asc" data-sort="username" className="fas fa-arrow-up"/></button>
              <button onClick={this.sort}><i data-sort-direction="desc"  data-sort="username" className="fas fa-arrow-down"/></button>
            </div>
            <div className="email">
              E-mail
              <button onClick={this.sort}><i data-sort-direction="asc"  data-sort="email" className="fas fa-arrow-up"/></button>
              <button onClick={this.sort}><i data-sort-direction="desc" data-sort="email" className="fas fa-arrow-down"/></button>
            </div>
            <div className="status">
              Статус
              <button onClick={this.sort}><i data-sort-direction="asc"  data-sort="status" className="fas fa-arrow-up"/></button>
              <button onClick={this.sort}><i data-sort-direction="desc" data-sort="status" className="fas fa-arrow-down"/></button>
            </div>
          </div>
          <div className="body-tasks">
            {taskList.map((task) => (
              <div key={task.id} className="body-tasks-item">
                <div className="body-task-status">
                  <input defaultChecked={task.status === 10} type="checkbox" />
                </div>
                <div className="body-tasks-item-name">
                  <span>{task.username}</span>
                </div>
                <div className="body-tasks-item-email">
                  <span>{task.email}</span>
                </div>
                <div className="body-tasks-item-text">
                  {!isAdmin ?
                    <textarea  value={task.text} readOnly={!isAdmin}/> :
                    <ModalEditTask taskId={task.id} editText={this.editText} value={task.text} isAdmin={isAdmin} />
                  }
                </div>
              </div>
            ))}
            <Pagination
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={totalTaskCount}
              pageRangeDisplayed={5}
              onChange={this.changeActivePage}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </div>
      </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    App: state.get('appReducer'),
  })
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

