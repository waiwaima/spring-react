import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import faker from 'faker';
import axios from 'axios';
import PostCard from './PostCard';
import { Button } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
  },
  control: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(1),
  },
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  media: {
    height: 100,
  }
});

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: []};
  }

  handleClick = () => {
    this.props.history.push('/posts/new');
  };

  componentDidMount() {
    axios.get('/api/posts')
      .then(response => {
        this.setState({posts: response.data});
      })
      .catch((error) => {
        console.log("Failed to retrieve posts");
        console.log(error);
      });
  } 

  render() {
    const { classes } = this.props; 
    const { posts } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.control}>
          <Button size="small" color="primary" variant="contained" onClick={this.handleClick}>Add Post</Button>
        </div>
        { 
          posts.map(post => {
            return (
              <div className={classes.card} key={post.id}>
                <PostCard 
                    id={post.id}
                    title={post.title} 
                    tag={post.tag}
                    body={post.body} 
                    imgUrl={faker.image.city() + '?random=' + window.performance.now()}/>
              </div>
            );
          })
        }
      </div>
    );
  }
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(withRouter(PostList));