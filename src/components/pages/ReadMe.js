import React from 'react';
import parse from 'html-react-parser';


class ReadMe extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
           page: null,
        };
    }

    componentDidMount() {

        fetch('http://localhost:5000/README.html', {
            credentials: 'include',
        }).then(res => res.text())
            .then(res => {
                this.setState({page: parse(res)})
            })
            .catch(error => alert(error))
    }


    render(){
        return(
            <div className="modal-body">
                <span>{this.state.page}</span>
            </div>
        )
    }

}

export default ReadMe;