import React from 'react';

class ShoeForm extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            model: '',
            manufacturer: '',
            color:'',
            picture_url:'',
            shoe_bins: [] 
        };
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleColorChange= this.handleColorChange.bind(this);
        this.handlePictureUrlChange=this.handlePictureUrlChange.bind(this);
        this.handleBinChange = this.handleBinChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //following data is from api
    async componentDidMount() {
        const url = 'http://localhost:8100/api/bins/'; //gives you same as insomnia
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            this.setState({ shoe_bins: data.bins });
        }
    }

    //data nothing to do with above, from post
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}; //looks like lines 6-10 populated
        delete data.shoe_bins; //view doesn't need array of shoe bins!!!

        const shoeUrl = 'http://localhost:8080/api/shoes/'; 
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(shoeUrl, fetchConfig); //make request to post to api in correct format
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe);

            this.setState = ({
                model: "", 
                manufacturer: "", 
                color:"",
                picture_url:""
                //don't reset shoe_bins array - different
            });
        }
    }

    //functions to handle change
    handleModelChange(event) {
        const value = event.target.value;
        this.setState({ model:value });
    }
    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({ manufacturer:value });
    }
    handleColorChange(event) {
        const value = event.target.value;
        this.setState({ color:value });
    }
    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({ picture_url:value })
    }
    handleBinChange(event) {
        const value = event.target.value;
        this.setState({ shoe_bin:value }) //does NOT need to be same as state above because they are picking one!
    }
    //render is where you use jsx
    render() {
        // let dropdownClasses = "form-select d-none";
        // if (this.state.bins.length > 0) {
        //     dropdownClasses = 'form-select';
        // }

        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new shoe!</h1>
                        <form onSubmit={this.handleSubmit} id="create-shoe-form">
                            <div className="form-floating mb-3">
                                <input onChange = {this.handleModelChange} placeholder="Model" required type="text" name="model" value={this.state.model} id="model" className="form-control"/>
                                <label htmlFor="model">Model</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleManufacturerChange} placeholder="Manufacturer" required type="text" name="manufacturer" value={this.state.manufacturer} id="manufacturer" className="form-control"/>
                                <label htmlFor="manufacturer">Manufacturer</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange = {this.handleColorChange} placeholder="Color" required type="text" name="color" value={this.state.color} id="color" className="form-control"/>
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.pictureUrl} onChange={this.handlePictureUrlChange} placeholder="Picture" type="text" name="picture_url" id="picture_url" className="form-control" />
                                <label htmlFor="picture_url">Picture</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleBinChange} name="bin" required id="bin" className="form-select">
                                    <option value="">Choose a bin</option>
                                    {this.state.shoe_bins.map(bin => {
                                        return (
                                            <option key={bin.href} value={bin.href}>{bin.closet_name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button onClick={this.handleSubmit} className="btn btn-lg btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }   
}

export default ShoeForm;