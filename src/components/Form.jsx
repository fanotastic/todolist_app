import React from 'react';
import Tabs from './TabelData';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [{
                id: 1,
                todo: "Intro ReactJS",
                date: "20/11/2021",
                location: "https://images.unsplash.com/photo-1593642633279-1796119d5482?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=688&q=80",
                note: "Prepare VSCode, Node js and CRA",
                status: "Done",
            }]
        }
    }

    btSubmit = (e) => {
        if (this.refs.todo.value === "" || this.refs.date.value === "" || this.refs.location.value === "" || this.refs.note.value === "") {
            alert('Mohon Lengkapi Form Anda')
        } else {
            this.state.todoList.push({
                todo: this.refs.todo.value,
                date: this.refs.date.value.split("-").reverse().join("/"),
                location: this.refs.location.value,
                note: this.refs.note.value,
            })
        }

        this.setState({
            todoList: this.state.todoList,
        })
    }

    printData = () => {
        return this.state.todoList.map((value, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{value.date}</td>
                    <td>{value.todo}</td>
                    <td><img src={value.location} width="20%" alt="..." /></td>
                    <td>{value.note}</td>
                    <td>{value.status}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <div className="d-flex flex-column justify-items-center">
                            Date
                            <input id="date" type="date" ref="date" placeholder="hh/bb/tttt" />
                            To Do
                            <input id="todo" type="text" ref="todo" />
                            Location
                            <input id="todo" type="text" ref="location" />
                            Note
                            <textarea name="note" id="note" cols="30" rows="10" ref="note"></textarea>
                        </div>
                        <div className="buttonContainer" style={{ marginTop: 10 }}>
                            <button className="btn btn-primary" style={{ width: "100%" }} onClick={this.btSubmit}>Submit</button>
                        </div>
                    </div>
                    <div className="col-10">
                        <Tabs cetak={this.printData()} />
                        {/* ini disebut props utk manggil di childrennya, childrennya itu si Tabs. 
                si cetak= itu disebut dengan atribut, kita buat sendiri*/}
                    </div>

                </div>
            </div>
        );
    }
}

export default Form;