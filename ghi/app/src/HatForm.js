import React from "react";


class HatForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fabric: '',
            style: '',
            color: '',
            picture_url: '',
            locations: [],
        };
        this.handleFabricChange = this.handleFabricChange.bind(this);
        this.handleStyleChange = this.handleStyleChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.locations;
        
        const hatUrl = 'http://localhost:8090/api/hats/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const response = await fetch(hatUrl, fetchConfig);
        
        if (response.ok) {
          const newHat = await response.json();
          console.log(newHat)

          const cleared = {
              fabric: '',
              style: '',
              color: '',
              picture: '',
              locations: [],
          };
          this.setState(cleared);
      }

      }


    handleFabricChange(event) {
        const value = event.target.value;
        this.setState({fabric: value});
    }

    handleStyleChange(event) {
        const value = event.target.value;
        this.setState({style: value});
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value});
    }

    handlePictureUrlChange(event) {
      const value = event.target.value;
      this.setState({pictureUrl: value})
    }


    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location: value});
    }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/locations';

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        this.setState({locations: data.locations});
    }
  }

  render() {
    let messageClasses = 'alert alert-success d-none mb-0';
    if (this.state.handleSubmit) {
      messageClasses = 'alert alert-success mb-0';
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new hat!</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input value={this.state.fabric} onChange={this.handleFabricChange} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" />
                <label htmlFor="fabric">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.style} onChange={this.handleStyleChange} placeholder="Style" required type="text" name="style" id="style" className="form-control" />
                <label htmlFor="style">Style</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.color} onChange={this.handleColorChange} placeholder="Color" required type="color" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.pictureUrl} onChange={this.handlePictureUrlChange} placeholder="Picture" type="text" name="picture_url" id="picture_url" className="form-control" />
                <label htmlFor="picture_url">Picture</label>
              </div>
              <div class="mb-3">
              <select onChange={this.handleLocationChange} name="location" required id="location" className="form-select">
              <option value="">Choose a location</option>
                 {this.state.locations.map(location => { 
                    return (
                        <option key={location.href} value={location.href}>
                        {location.closet_name} - {location.section_number}/{location.shelf_number}
                        </option>
                    );
                    })}
                </select>
                </div>
              <button onclick={this.handleSubmit} className="btn btn-lg btn-primary">Create</button>
            </form>
            <div className={messageClasses} id="success-message">
                Yay! New Hat!
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HatForm;