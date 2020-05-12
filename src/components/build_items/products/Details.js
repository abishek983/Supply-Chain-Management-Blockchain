import React, { Component } from 'react'

class Details extends Component {
    state = {
        part1: '',
        part2: '',
        part3: '',
        part4: '',
        part5: ''
    }

    componentDidMount() {
        this.setState({ part1: this.props.part_details[0] });
        this.setState({ part2: this.props.part_details[1] });
        this.setState({ part3: this.props.part_details[2] });
        this.setState({ part4: this.props.part_details[3] });
        this.setState({ part5: this.props.part_details[4] });
    }

    render() {
        const { part1, part2, part3, part4, part5} = this.state;
        return (
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <p className="card-text"><strong>Serilal Number of Parts</strong></p>
                    <p className="card-text"><strong>Part 1 : </strong>{part1}</p>
                    <p className="card-text"><strong>Part 2 : </strong>{part2}</p>
                    <p className="card-text"><strong>Part 3 : </strong>{part3}</p>
                    <p className="card-text"><strong>Part 4 : </strong>{part4}</p>
                    <p className="card-text"><strong>Part 5 : </strong>{part5}</p>
                    
                </div>
            </div>
        )
    }
}

export default Details;