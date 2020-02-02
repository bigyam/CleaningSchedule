import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';


class NavigationBar extends Component {

	render () {
		return (
			<AppBar >
				<Toolbar>
		          <IconButton edge="start" color="inherit" aria-label="menu">
		            <MenuIcon />
		          </IconButton>
		          <Typography variant="h6">
		            Cleaning Schedule
		          </Typography>

		        </Toolbar>
			</AppBar>
		)
	}
}

export default NavigationBar;