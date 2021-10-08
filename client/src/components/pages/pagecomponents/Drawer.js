import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';


export default function LeftDrawer(props) {
    
    function Leftlist() {
        return (
        <div
            style={{ width: "250px", height: "500px" }}
            role="presentation"
        >
            <List>
            </List>
            <Divider />
            <List>
                <ListItem>
                    Item 1
                </ListItem>
                <ListItem button >
                    Item 1
                </ListItem>
                <ListItem button >
                    Item 1
                </ListItem>
            </List>
        </div>
        )
    }

    return (
        <div>
            <Drawer anchor={'left'} open={true} onClose={() => {props.setDrawer(false)}}>
                <Leftlist />
            </Drawer>
        </div>
    );
}
