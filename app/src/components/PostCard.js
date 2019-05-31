import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import axios from 'axios';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 100,
  },
  avatar: {
    backgroundColor: red[500],
  }
});

class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {deleted: false};
  }

  remove = (id) => {
    axios.delete('/api/posts/' + id)
      .then(response => {
        this.setState({deleted: true});
      }).catch(error => {
        console.log(error);
      });
  };

  render() {
    if (this.state.deleted) {
      return <div></div>;
    }

    const { classes, id, title, tag, body, imgUrl } = this.props; 
    return (
      <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            P
          </Avatar>
        } 
        title={title} 
        subheader={tag}/>
      <CardMedia
        className={classes.media}
        image={imgUrl}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={"/posts/" + id}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={this.remove.bind(null, id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(PostCard);