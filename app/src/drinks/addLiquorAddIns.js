import React, { Component } from 'react'
import { Button, Segment, Grid, Input } from 'semantic-ui-react'

class AddLiquorAddIns extends Component {
  constructor(props) {
    super(props)

    this.state = {
      liquorName: '',
      liquorPrice: '',
      addInName: '',
      addInPrice: '',
    }
    this.handleLiquorSubmit = ::this.handleLiquorSubmit
    this.handleLiquorChange = ::this.handleLiquorChange
    this.handleLiquorPriceChange = ::this.handleLiquorPriceChange
    this.handleAddInSubmit = ::this.handleAddInSubmit
    this.handleAddInChange = ::this.handleAddInChange
    this.handleAddInPriceChange = ::this.handleAddInPriceChange
  }

  handleLiquorSubmit(e) {
    e.preventDefault()
    console.log('This liquor, ', this.state.liquorName, ', costs ', this.state.liquorPrice)

    const temp = {
      name: this.state.liquorName,
      textPrice: this.state.liquorPrice,
      price: parseFloat(this.state.liquorPrice) * 100,
      type: 'liquor',
    }

    this.setState({
      liquorName: '',
      liquorPrice: '',
    })
    this.props.submitAction(temp, temp)
  }
  handleAddInSubmit(e) {
    e.preventDefault()
    console.log('This add-in, ', this.state.addInName, ', costs ', this.state.addInPrice)

    const temp = {
      name: this.state.addInName,
      textPrice: this.state.addInPrice,
      price: parseFloat(this.state.addInPrice) * 100,
      type: 'addIn',
    }
    this.props.submitAction(temp, 'addIn')
    this.setState({
      addInName: '',
      addInPrice: '',
    })
  }
  handleLiquorChange(event, data) {
    this.setState({ liquorName: data.value })
  }
  handleLiquorPriceChange(event, data) {
    this.setState({ liquorPrice: data.value })
  }
  handleCheckShot(event, data) {
    console.log('event: ', event)
    console.log('data: ', data)
    this.setState({ shotDisabled: data.checked })
  }
  handleAddInChange(event, data) {
    this.setState({ addInName: data.value })
  }
  handleAddInPriceChange(event, data) {
    this.setState({ addInPrice: data.value })
  }

  render() {
    return (
      <div>
        <Grid columns="equal">
          <Grid.Column>
            <Segment.Group>
              <Segment inverted color="grey">
              Liquors
              </Segment>
              <Segment>
                <Input value={this.state.liquorName} onChange={this.handleLiquorChange} label="Add a liquor" placeholder="Liquor Name" />
                <Input value={this.state.liquorPrice} onChange={this.handleLiquorPriceChange} label="Single-shot Price" placeholder='e.g. "3.95"' />
                <Button type="submit" onClick={this.handleLiquorSubmit}>Submit</Button>
              </Segment>
              {this.props.liquors.map(liquor =>
                <Segment key={Math.random() * 100}>
                  {liquor.name}: {liquor.price}
                </Segment>,
            )}
            </Segment.Group>
          </Grid.Column>

          <Grid.Column>
            <Segment.Group>
              <Segment inverted color="grey">
              Add-Ins
            </Segment>
              <Segment>
                <Input value={this.state.addInName} onChange={this.handleAddInChange} label="Add an add-in" placeholder="Add-In Name" />
                <Input value={this.state.addInPrice} onChange={this.handleAddInPriceChange} label="Add price" placeholder='e.g. "3.95"' />
                <Button type="submit" onClick={this.handleAddInSubmit}>Submit</Button>
              </Segment>
              {this.props.addIns.map(addIn =>
                <Segment key={Math.random() * 100}>
                  {addIn.name}: {addIn.price}
                </Segment>,
            )}
            </Segment.Group>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default AddLiquorAddIns

