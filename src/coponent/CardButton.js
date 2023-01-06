import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

const highlightStyle = {
  width: '100%',
  marginLeft: '0px',
  marginBottom:'10px',
  outlineStyle: 'solid',
  outlineWidth: '2px',
  outlineColor: (theme)=>theme.palette.primary.main
}

const nonHighlightStyle = {
  width: '100%',
  marginLeft: '0px',
  marginBottom:'10px'
}

export default function CardButton(props){

  const {body, title, primaryAction, primaryLabel, secondaryLabel, secondaryAction, highlight} = props;

  return (
    <Card raised={!highlight} sx={!!highlight? highlightStyle : nonHighlightStyle}>
      <CardActionArea onClick={props.onClick} >
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {!!primaryLabel &&
        <Button variant="outlined" size="small" color="primary" onClick={primaryAction}>
          {primaryLabel}
        </Button>
        }
        {!!secondaryLabel &&
          <Button variant="outlined" size="small" color="error" onClick={secondaryAction}>
            {secondaryLabel}
          </Button>
        }
      </CardActions>
    </Card>
  );

}