import React from 'react';
import Tabs from './TabelData';
import axios from 'axios';

class Form extends React.Component {
    // 1. urutan render pertama component react
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            todo: "",
            location: "",
            note: "",
            selectedIdx: null,
            todoList: []
        }
    }

    //3. urutan ke 3
    // menjalankan sebuah fungsi, pertama kali saat component atau page react js di render
    componentDidMount() {
        // fungsi yg digunakan utk melakukan request data pertama kali ke backend
        this.getData()
    }

    getData = () => {
        // Axios: melakukan request data ke back-end atau API
        axios.get(`http://localhost:2000/todoList`)
            // ini disebut promise ada then dan catch, kyk if. Then akan jalan jika berhasil mendapatkan data
            .then((response) => {
                console.log(response.data)
                this.setState({ todoList: response.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    btSubmit = () => {
        let { date, todo, location, note } = this.state; // destructure
        axios.post(`http://localhost:2000/todoList`, {
            date, todo, location, note, status: "on going"
        }).then((response) => {
            console.log(response.data)
            this.getData()
            this.refs.date.value="";
            this.refs.todo.value="";
            this.refs.location.value="";
            this.refs.note.value="";
        }).catch((err) => {
            console.log(err)
        })

        // axios post utk menambahkan data dari frontend ke backend
        //  dengan this.getData() --> memanggil data terbaru utk memperbarui data pada halaman

        // let temp = [...todoList] // spread operator
        // temp.push({
        //     id: temp.length + 1,
        //     date, // date: this.state.date
        //     todo, // todo: this.state.todo
        //     location, //location: this.state.location
        //     note, // note: this.state.note
        //     status: "ongoing"
        // })

        // this.setState({ todoList: temp })

        // if (this.refs.todo.value === "" || this.refs.date.value === "" || this.refs.location.value === "" || this.refs.note.value === "") {
        //     alert('Mohon Lengkapi Form Anda')
        // } else {
        //     this.state.todoList.push({
        //         todo: this.refs.todo.value,
        //         date: this.refs.date.value.split("-").reverse().join("/"),
        //         location: this.refs.location.value,
        //         note: this.refs.note.value,
        //     })
        // }

        // this.setState({
        //     todoList: this.state.todoList,
        // })
    }

    btDelete = (idx) => {
        // axios.delete(`http://localhost:2000/todoList`)
        let temp = [...this.state.todoList]
        temp.splice(idx, 1)
        this.setState({ todoList: temp })
    }

    btEdit = (idx) => {
        this.setState({
            selectedIdx: idx
        })
    }
    btCancel = () => {

    }
    printData = () => {
        return this.state.todoList.map((value, index) => {
            if (this.state.selectedIdx == index) {
                console.log("skjfshk")
                return (<div class="modal fade" id="edit" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabelLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabelLabel">Edit</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close " onClick={() => this.setState({ selectedIdx: null })}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="d-flex flex-column justify-items-center">
                                    Date
                                    <td><input type="date" defaultValue={value.date} /></td>
                                    To do
                                    <td><input type="text" defaultValue={value.todo} /></td>
                                    Location
                                    <td><input type="text" defaultValue={value.location} /></td>
                                    Note
                                    <td><input type="text" defaultValue={value.note} /></td>
                                    Status
                                    <td><input type="text" defaultValue={value.status} /></td>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button className="btn btn-warning" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ selectedIdx: null })}>Cancel</button>
                                <button type="button" class="btn btn-primary" onClick={this.btSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>)

                // <tr>
                //     <td>{index + 1}</td>
                //     <td><input type="date" defaultValue={value.date} /></td>{/* <td><input id="new-date" type="date" placeholder="dd/mm/yyyy" /></td> */}
                //     <td><input type="text" defaultValue={value.todo} /></td>{/* <td><input id="new-todo" type="text" /></td> */}
                //     <td><input type="text" defaultValue={value.location} /></td>{/* <td><img src={<input id="todo" type="text" ref="location"/>} id="new-location"/></td> */}
                //     <td><input type="text" defaultValue={value.note} /></td>{/* <td><textarea name="note" id="note" cols="10" rows="5" ref="note"></textarea></td> */}
                //     <td><input type="text" defaultValue={value.status} /></td>{/* <td><input id="new-status"type="text"/></td> */}
                //     <td>
                //         <button className="btn btn-danger">Save</button>
                //         <button className="btn btn-warning" onClick={() => this.setState({ selectedIdx: null })}>Cancel</button>
                //     </td>
                // </tr>
            } else {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{value.date}</td>
                        <td>{value.todo}</td>
                        <td><img src={value.location} width="20%" alt="..." /></td>
                        <td>{value.note}</td>
                        <td>{value.status}</td>
                        <td>
                            <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#edit" onClick={() => this.btEdit(index)}>Edit</button>
                            <button className="btn btn-danger" type="button" onClick={() => this.btDelete(index)}>Delete</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    handleInput = (value, propState) => {
        // console.log(value, propState)
        this.setState({ [propState]: value })


        // let value = event.target.value // akan mengarah ke value yg dituju
        // console.log(value)
        // this.setState({ date: value }) // atau date: event.target.value juga bisa
    }

    // handleInputToDo = (event) => {
    //     this.setState({ todo: event.target.value })
    // }


    // 2. urutan kedua lifecycle itu render
    render() {
        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-end py-3 px-3">
                    <button type="button" class="btn btn-primary ml-0" data-toggle="modal" data-target="#staticBackdrop">
                        Add todo List
                    </button>
                </div>
                <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Add your to do list</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="d-flex flex-column justify-items-center">
                                    Date
                                    <input id="date" type="date" ref="date" placeholder="hh/bb/tttt" onChange={(event) => this.handleInput(event.target.value, "date")} />
                                    To Do
                                    <input id="todo" type="text" ref="todo" onChange={(event) => this.handleInput(event.target.value, "todo")} />
                                    Location
                                    <input id="location" type="text" ref="location" onChange={(event) => this.handleInput(event.target.value, "location")} />
                                    Note
                                    <textarea name="note" id="note" cols="30" rows="10" ref="note" onChange={(event) => this.handleInput(event.target.value, "note")}></textarea>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={this.btSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    {/* <div className="col-2"> */}
                    {/* <div className="d-flex flex-column justify-items-center">
                            Date
                            <input id="date" type="date" ref="date" placeholder="hh/bb/tttt" onChange={(event) => this.handleInput(event.target.value, "date")} />
                            To Do
                            <input id="todo" type="text" ref="todo" onChange={(event) => this.handleInput(event.target.value, "todo")} />
                            Location
                            <input id="location" type="text" ref="location" onChange={(event) => this.handleInput(event.target.value, "location")} />
                            Note
                            <textarea name="note" id="note" cols="30" rows="10" ref="note" onChange={(event) => this.handleInput(event.target.value, "note")}></textarea>
                        </div>
                        <div className="buttonContainer" style={{ marginTop: 10 }}>
                            <button className="btn btn-primary" style={{ width: "100%" }} onClick={this.btSubmit}>Submit</button>
                        </div> */}
                    {/* </div> */}
                    <div className="col-12">
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