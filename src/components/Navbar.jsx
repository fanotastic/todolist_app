import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-11">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <a class="navbar-brand" href="#">To Do List</a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div class="navbar-nav">
                                    <a class="nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
                                    <a class="nav-link" href="#">Link</a>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="col-1">
                        Hello, Fawwaz
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;