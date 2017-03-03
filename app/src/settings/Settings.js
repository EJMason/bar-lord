import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Form, Container, Input, Segment, Icon, Message } from 'semantic-ui-react'
import axios from 'axios'

import states from '../util/usaStates'

// import { patchBartenderMetadata } from '../util/AuthHelpers'

@connect(store => ({
  currentAddView: store.drinks.currentAddView,
  beers: store.drinks.menuBeers,
  cocktails: store.drinks.menuCocktails,
  liquors: store.drinks.menuLiquors,
  addIns: store.drinks.menuAddIns,
}))
class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: states,
      fullName: '',
      businessName: '',
      address: '',
      city: '',
      selectedState: '',
      latitude: '',
      longitude: '',
      imageUrl: '',
      displaySuccessMsg: false,
      successMessage: 'Thank you for joining Barambe. Drinks out!',
    }

    this.renderMsg = this.renderMsg.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleSelectStateChange(e, { value }) {
    this.setState({ ...this.state, selectedState: value })
  }

  handleStateSearchChange(e, selectedState) {
    this.setState({ selectedState })
  }

  changeFullName(e) {
    this.setState({ fullName: e.target.value })
  }

  changeBusinessName(e) {
    this.setState({ businessName: e.target.value })
  }

  changeAddress(e) {
    this.setState({ address: e.target.value })
  }

  changeImageUrl(e) {
    this.setState({ imageUrl: e.target.value })
  }

  changeCity(e) {
    this.setState({ city: e.target.value })
  }

  changeStatesOfMsgs() {
    this.setState({ displaySuccessMsg: true })

    setTimeout(() => {
      this.setState({ displaySuccessMsg: false })
    }, 5000)
  }

  resetForm() {
    this.setState({
      fullName: '',
      businessName: '',
      address: '',
      imageUrl: '',
      city: '',
      selectedState: '',
    })
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  handleFormSubmit(e) {
    e.preventDefault()

    this.changeStatesOfMsgs()

    axios.get(`/customer/getLocation?address=${this.state.address}`)
      .then(res => {
        this.setState({
          latitude: res.data.latitude,
          longitude: res.data.longitude,
        })

        this.resetForm()
      }).catch(err => {
        console.log('err', err)
      })
  }

  renderMsg() {
    return (
      <Message success>
        <Message.Header>
          Changes in Service
        </Message.Header>
        <p>
          {this.state.successMessage}
        </p>
      </Message>
    )
  }

  render() {
    // let errorMsg = null
    if (this.state.submitError === true) {
      errorMsg = <div className="error">Formatting error -- please re-submit your information</div>
    } else if (this.state.submitError === false) {
      errorMsg = <div className="success">Data received!</div>
    }

    return (
      <div>
        {this.state.displaySuccessMsg && this.renderMsg()}
        <Container>
          <Header as="h2">
            <Icon name="settings" />
            <Header.Content>
              Account Settings
              <Header.Subheader>
                Manage your preferences
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Header as="h3" attached="top">
            Bar Username
          </Header>
          <Segment attached>
            <p> This is a unique username. Once it is set it cannot be changed.</p>
            <Input action={{ icon: 'search' }} placeholder="Search..." />
          </Segment>
        </Container>
        <Container>
          <Header as="h3" attached="top">
            Setup Stripe Merchant Account
          </Header>
          <Segment attached>
            <Button color="linkedin" href="http://localhost:1337/bars/connect">
              <Icon name="stripe" /> Connect Stripe Account
            </Button>
          </Segment>
        </Container>
        <Container>
          <Header as="h3" attached="top">
            Business Info
          </Header>
          <Segment attached>
            <Form>
              <Form.Group widths="equal">
                <Form.Input onChange={e => { this.changeFullName.call(this, e) }} label="Full Name" value={this.state.fullName} placeholder="Full Name" />
                <Form.Input onChange={::this.changeBusinessName} label="Business Name" value={this.state.businessName} placeholder="Business Name" />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input onChange={::this.changeAddress} label="Address" value={this.state.address} placeholder="Address" />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input onChange={::this.changeImageUrl} label="Image Url" value={this.state.imageUrl} placeholder="http://www.pathtoimg.jpg" />
              </Form.Group>
              <Form.Group>
                <Form.Input onChange={::this.changeCity} label="City" value={this.state.city} placeholder="City" width={10} />
                <Form.Dropdown
                  label="State"
                  fluid
                  selection
                  search
                  options={this.state.options}
                  value={this.state.selectedState}
                  placeholder="State"
                  onChange={::this.handleSelectStateChange}
                  onSearchChange={::this.handleStateSearchChange}
                  width={3}
                />
              </Form.Group>
              <Form.Button primary onClick={e => { this.handleFormSubmit(e) }} >Submit </Form.Button>
            </Form>
          </Segment>
        </Container>
      </div>
    )
  }
}

export default Settings
