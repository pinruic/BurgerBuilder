import React, {Component} from 'react';
import Auxillary from '..//Auxillary/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


//props children refers to any element between opening and closing tag of the component.
//in this case, props.children of layout is BurgerBuilder
class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler =() => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Auxillary>
                <Toolbar drawerTogglerClicked={this.sideDrawerToggleHandler }/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxillary>
        )
    }
} 


export default Layout;
    