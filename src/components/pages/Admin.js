import React from 'react';

class Admin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userActivities: [],
            activities: [],
            text: ""
        };

        this.handlerSearch = this.handlerSearch.bind(this)
    }


    handlerSearch(e){
        let filteredActivities = this.state.userActivities.filter(
            (activity) => {
                if(Object.keys(activity)[0].indexOf(e.target.value) !== -1)
                    return activity ;
                })

        this.setState({activities: filteredActivities})
    }

    componentWillMount() {
        fetch('http://localhost:5000/admin', {
        }).then(res => res.json())
            .then(res => {
                this.setState({activities: res,
                    userActivities: res})
            })
            .catch(error => alert(error))
    }

    render(){
        return (
            <React.Fragment>
                <h1>Activities</h1>
                <input className="mr-2"  type="text" placeholder="Search by name..." onChange={this.handlerSearch}/>
                {(this.state.activities.length == 0) ?
                    (
                        <h1> Can't find activities</h1>
                    ) : (
                        <section>
                            <div className="container-fluid text-center d-none d-lg-block">
                                <strong>
                                    <div className="row">
                                        <div className="col-10 mx-auto col-lg-1">
                                            <p className="text-uppercase">username</p>
                                        </div>
                                        <div className="col-10 mx-auto col-lg-3">
                                            <p className="text-uppercase">activity</p>
                                        </div>
                                    </div>
                                </strong>
                            </div>
                            <div className="container-fluid">
                                {this.state.activities.map((activity) => {
                                    return (
                                        <div className="row my-2 text-capitalize text-center">
                                            <div className="col-10 mx-auto col-lg-1">
                                                <span className="d-lg-none">username:</span>
                                                {Object.keys(activity)[0]}
                                            </div>
                                            <div className="col-10 mx-auto col-lg-3">
                                                <span className="d-lg-none">activity:</span>
                                                {Object.values(activity)[0]}
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        </section>
                    )
                }
            </React.Fragment>
        )
    }
}

export default Admin;