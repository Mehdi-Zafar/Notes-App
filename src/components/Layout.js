import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/typography';
import { List,ListItem,ListItemText,ListItemIcon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';
import {useHistory,useLocation} from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles({
    container:{
        display:"flex",
        justifyContent:"center"
    },
    drawer:{
        width:drawerWidth
    },
    drawerPaper:{
        width:drawerWidth
    },
    listItems:{
        marginBlock:10,
    },
    active:{
        backgroundColor:"#f4f4f4"
      }
})

const Layout = ({children}) => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const menuItems = [
        {
            text:"Notes",
            icon: <SubjectOutlined color="secondary"/>,
            path: "/"
        },
        {
            text:"Create Note",
            icon: <AddCircleOutlineOutlined color="secondary"/>,
            path: "/create"
        }
    ]
    return ( 
        <div className={classes.container}>
            <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{paper: classes.drawerPaper}}
      >
        <List>
            <Typography
            variant="h5"
            color="primary"
            align="center"
            sx={{marginBottom:3}}
            >My Notes</Typography>
          {menuItems.map((item) => (
            <ListItem 
            key={item.text} 
            button 
            onClick={()=>history.push(item.path)}
            sx={{backgroundColor:location.pathname == item.path ? "#f4f4f4" : "white",marginBlock:0.5,paddingBlock:1}}
            >
                {console.log(item.path, location.pathname)}
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        </Drawer>
            <div>
                {children}
            </div>
        </div>
     );
}
 
export default Layout;