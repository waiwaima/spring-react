import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  control: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  }
});

class PostEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        tag: '',
        body: ''
      }
    };
  }
  
  handleChange = name => event =>{
    let post = { ...this.state.post };
    post[name] = event.target.value;
    this.setState({ post: post })
  };

  save = async () => {
    console.log('save the post');
    const { post } = this.state;
    await axios({
      url: (post.id)? `/api/posts/${post.id}` : '/api/posts',
      method: (post.id)? 'put' : 'post',
      data: post
    });
    this.props.history.push('/');
  };

  cancel = () => {
    this.props.history.push('/');
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      try {
        let response = await axios.get(`/api/posts/${this.props.match.params.id}`);
        this.setState({ post: response.data });
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { title, tag, body } = this.state.post;
    return (
      <div className={classes.root} >
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label="title"
            className={classes.textField}
            value={title}
            onChange={this.handleChange('title')}
            margin="normal"
          />
          <TextField
            label="tag"
            className={classes.textField}
            value={tag}
            onChange={this.handleChange('tag')}
            margin="normal"
          />
          <TextField
            label="Contents"
            className={classes.textField}
            value={body}
            onChange={this.handleChange('body')}
            margin="normal"
            variant="outlined"
            multiline
            rows="6"
          />
        </form>
        <div className={classes.control}>
          <Button className={classes.button} size="small" color="primary" variant="contained" onClick={this.save}>Save</Button>
          <Button className={classes.button} size="small" color="primary" variant="contained" onClick={this.cancel}>Cancel</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(PostEdit));