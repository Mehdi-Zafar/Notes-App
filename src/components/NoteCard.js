import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DeleteOutlined } from '@mui/icons-material';
import {IconButton,Typography} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { yellow,green,pink,blue } from '@mui/material/colors';

const NoteCard = ({note,handleDelete}) => {

    return ( 
        <Card elevation={2}>
            <CardHeader
            avatar={
                <Avatar sx={{backgroundColor: note.category == "work" ? yellow[700] : note.category == "money" ? green[500] : note.category == "todos" ? pink[500] : blue[500]}}>
                    {note.category[0].toUpperCase()}
                </Avatar>
            }
            action={
            <IconButton onClick={()=>handleDelete(note.id)}>
                <DeleteOutlined />
            </IconButton>
            }
            title={note.title}
            subheader={note.category}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                {note.details}
                </Typography>
            </CardContent>
        </Card>
     );
}
 
export default NoteCard;