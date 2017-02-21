import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import AddLiquorAddIns from './addLiquorAddIns'
import AddBeers from './addBeers'
import AddCocktails from './addCocktails'

import { actions } from './duck.Drinks'

@connect(store => ({
  currentAddView: store.drinks.currentAddView,
  beers: store.drinks.menuBeers,
  cocktails: store.drinks.menuCocktails,
  liquors: store.drinks.menuLiquors,
  addIns: store.drinks.menuAddIns,
}))
class Drinks extends Component {
  componentWillMount() {
    axios
      .get('/drinks/getAll')
      .then(response => {
        const arrOfDrinkTypes = Object.values(response.data)
        arrOfDrinkTypes.forEach(drinkArr => {
          drinkArr.sort((current, next) => {
            return current.name.charCodeAt(0) - next.name.charCodeAt(0)
          })
          drinkArr.forEach(drinkObj => {
            drinkObj.price = (drinkObj.price / 100).toFixed(2)
          })
        })
        const beers = response.data.beerArr
        const cocktails = response.data.cocktailArr
        const liquors = response.data.liquorArr
        const addIns = response.data.addInArr

        const drinksObj = { beers, cocktails, liquors, addIns }
        console.log('drinksObj: ', drinksObj)

        this.props.dispatch(actions.getDrinks(drinksObj))
      })
      .catch(err => {
        console.log(err)
      })
  }

  toggleMenu(menuName) {
    this.props.dispatch(actions.toggleMenu(menuName))
  }

  handleDrinkSubmit(drinkObj) {
    console.log('submit ', drinkObj, ' which is type ', drinkObj.type)
    axios.post('/drinks/addToMenu', drinkObj)
      .then(res => { console.log(res) })
      .catch(err => { console.log(err) })
    this.props.dispatch(actions.postDrink(drinkObj))
  }

  render() {
    this.handleDrinkSubmit = ::this.handleDrinkSubmit
    const addView = this.props.currentAddView
    let renderedView = <AddLiquorAddIns />

    if (addView === 'liquorAddIns') {
      renderedView = <AddLiquorAddIns submitAction={this.handleDrinkSubmit} liquors={this.props.liquors} addIns={this.props.addIns} />
    } else if (addView === 'beers') {
      renderedView = <AddBeers submitAction={this.handleDrinkSubmit} beers={this.props.beers} />
    } else if (addView === 'cocktails') {
      renderedView = (<AddCocktails
        submitAction={this.handleDrinkSubmit}
        liquors={this.props.liquors}
        addIns={this.props.addIns}
        cocktails={this.props.cocktails}
      />)
    }

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item name="beers" active={addView === 'beers'} onClick={() => this.toggleMenu('beers')} />
            <Menu.Item name="liquorAddIns" active={addView === 'liquorAddIns'} onClick={() => this.toggleMenu('liquorAddIns')} />
            <Menu.Item name="cocktails" active={addView === 'cocktails'} onClick={() => this.toggleMenu('cocktails')} />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            {renderedView}
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Drinks
