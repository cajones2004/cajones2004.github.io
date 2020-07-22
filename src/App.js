import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import Modal from '@material-ui/core/Modal';
import Chip from '@material-ui/core/Chip'
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InstagramIcon from '@material-ui/icons/Instagram';
// import articles from './articles.json'
import articlesJSON from './articles.json'
import axios from 'axios'
console.log('opened local JSON ')
console.log(articlesJSON)

// localStorage.setItem('article', 0)
// localStorage.setItem('tag', 'all')

function changeCurrentArticle(newArticleDate) {
  localStorage.setItem('article', newArticleDate)
  window.location.reload()
}

function changeCurrentTag(newTag) {
  localStorage.setItem('tag', newTag)
  window.location.reload()
}

function generateArticlesFromJSON(tag, mediaQuery, articles) {
  // convert the set of articles from JSON into JSX cards
  // default tag is 'all' to show articles of all tags
  let width = 12
  if (mediaQuery) width = 6
  let gridItems = []
  for (let i = 0; i < articles.number_of_articles; i++) {
    if (tag == 'all' || String(articles.articles[i].tag) == tag) {
      gridItems.push(<Grid item xs={12}>{generateArticleCard(articles.articles[i].date, tag, articles)}</Grid>)
    }
  }
  // for (let article of articles.articles) {
  //   if (tag == 'all' || String(article.tag) == tag) {
  //     gridItems.push(<Grid item xs={12}>{generateArticleCard(article.date, tag, articles)}</Grid>)
  //   } 
  // }

  let leftGrid = []
  let rightGrid = []
  for (let i = 0; i < articles.number_of_articles; i++) {
    if (i % 2 == 0) {
      leftGrid.push(gridItems[i])
    } else {
      rightGrid.push(gridItems[i])
    }
  }
  if (mediaQuery) {
    return (
      <>
      <Grid container spacing={6} alignItems='center' justify='center'>
        <Grid item xs={6}>{generateAboutCard()}</Grid>
      </Grid>
      <br />
      <br />
      <br />
      <Grid container spacing={6} alignItems='center' justify='center'>
        <Grid container xs={6} item spacing={3}  alignItems='center' justify='center'>
          {leftGrid}
        </Grid>
        <Grid container xs={6} item spacing={3}  alignItems='center' justify='center'>
          {rightGrid}
        </Grid>
      </Grid>
      </>
    )
  } else {
    return (
      <>
      <Grid container spacing={3}><Grid item xs={12}>{generateAboutCard()}</Grid></Grid>
      <Grid container spacing={3}>
        {gridItems}
      </Grid>
      </>
    )
  }
}

function generateAboutCard() {
  return (
    <Card elevation={20}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                overwatched
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Overwatched is your place to go for all Overwatch news etc etc etc etc
              </Typography>
            </CardContent>
          </CardActionArea>
    </Card>
  )
}

function generateArticleCard(targetDate, targetTag, articles) {
  // generates a card for the article with the specified date ID
  for (let i = 0; i < articles.number_of_articles; i++) {
    if (articles.articles[i].date == targetDate) {
      var output = (
        <Card elevation={20}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="cover image failed to load"
              height="140"
              image={require('./images/placeholder3.jpg')}
              title="article"
            />
            <CardContent>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                {String(articles.articles[i].date).substring(0,4) + '/' + String(articles.articles[i].date).substring(4,6) + '/' + String(articles.articles[i].date).substring(6,8)}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {articles.articles[i].title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {String(articles.articles[i].content).substring(0, 140) + '...'}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Grid container alignItems="flex-start" justify="flex-start" direction="row">
              <Button size="small" color="success">
                <LabelImportantIcon />
                {articles.articles[i].tag}
              </Button>
            </Grid>
            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
              <Button size="small" color="primary" onClick={() => changeCurrentArticle(articles.articles[i].date)}>
                Read More
              </Button>
            </Grid>
          </CardActions>
        </Card>
      )
    }
  }
  // for (let x of articles.articles) {
  //   if (x.date == targetDate) {
  //     var output = (
  //       <Card elevation={20}>
  //         <CardActionArea>
  //           <CardMedia
  //             component="img"
  //             alt="cover image failed to load"
  //             height="140"
  //             image={require('./images/placeholder3.jpg')}
  //             title="article"
  //           />
  //           <CardContent>
  //             <Typography variant="caption" color="textSecondary" gutterBottom>
  //               {String(x.date).substring(0,4) + '/' + String(x.date).substring(4,6) + '/' + String(x.date).substring(6,8)}
  //             </Typography>
  //             <Typography gutterBottom variant="h5" component="h2">
  //               {x.title}
  //             </Typography>
  //             <Typography variant="body2" color="textSecondary" component="p">
  //               {String(x.content).substring(0, 140) + '...'}
  //             </Typography>
  //           </CardContent>
  //         </CardActionArea>
  //         <CardActions>
  //           <Grid container alignItems="flex-start" justify="flex-start" direction="row">
  //             <Button size="small" color="success">
  //               <LabelImportantIcon />
  //               {x.tag}
  //             </Button>
  //           </Grid>

  //           <Grid container alignItems="flex-start" justify="flex-end" direction="row">
  //             <Button size="small" color="primary" onClick={() => changeCurrentArticle(x.date)}>
  //               Read More
  //             </Button>
  //           </Grid>
  //         </CardActions>
  //       </Card>
  //     )
  //   }
  // }
  return output
}

function generateFullPageArticleCard(targetDate, articles) {
//   // generates a card for the article with the specified date ID
  
  // for (let x of articles.articles) {
  for (let i = 0; i < articles.number_of_articles; i++) {
    if (articles.articles[i].date == targetDate) {
      console.log(String((articles.articles[i].content)))

      let paragraphs = []
      for (let p of String(articles.articles[i].content).split('\n')) {
        paragraphs.push(
          <>
          <Typography variant="body2" color="textSecondary" component="p">
                {p}
          </Typography>
          <br />
          </>
        )
      }

      var output = (
        <Card elevation={20}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="cover image failed to load"
              height="140"
              image={require('./images/placeholder3.jpg')}
              title="article"
            />
            <CardContent>
              
              <Typography variant="caption" color="textSecondary" gutterBottom>
              {String(articles.articles[i].date).substring(0,4) + '/' + String(articles.articles[i].date).substring(4,6) + '/' + String(articles.articles[i].date).substring(6,8)}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {articles.articles[i].title}
              </Typography>
              <Typography variant='subtitle1' color="textSecondary" gutterBottom>
                {/* <Button size="small" color="success"> */}
                  <LabelImportantIcon />
                  {articles.articles[i].tag}
                {/* </Button> */}
              </Typography>
              {paragraphs}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => changeCurrentArticle(0)}>
              More Articles
            </Button>
          </CardActions>
          <CardActions>
            <Button size="small" color="success">
              <LabelImportantIcon />
              {articles.articles[i].tag}
            </Button>
          </CardActions>
          
        </Card>
      )
    }
  }
  return output
}

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: -1,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function footer() {
  return (
    <>
    <Grid container spacing={2} alignItems='center' justify='center'>
      <Grid item xs={12}><a href='https://github.com/cajones2004/overwatch-news'><Chip label='source code'/></a></Grid>   
      <Grid item xs={12}><Chip label='© Copyright  - Cameron Jones 2020'/></Grid>        
    </Grid>
    <br />
    </>
  )
}



class ArticleBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        articles: {}
    };
}

  componentDidMount() {
    var _this = this;
    this.serverRequest = 
      axios
        .get("https://raw.githubusercontent.com/cajones2004/cajones2004.github.io/dev/src/articles.json")
        .then(function(result) {
          console.log('received ' + typeof(result.data.articles) +' from GitHub rawusercontent: ')
          console.log(result.data.articles)    
          _this.setState({
            articles: result.data
          });
          _this.forceUpdate()
        })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    if (localStorage.getItem('article') == 0) {
      return (
        <>
          {generateArticlesFromJSON(localStorage.getItem('tag'), localStorage.getItem('desktop'), this.state.articles)}
        </>
      )
    } else {
      return (
        <>
          {generateFullPageArticleCard(localStorage.getItem('article'), this.state.articles)}
        </>
      )
    }
  }
}

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  localStorage.setItem('desktop', useMediaQuery('(min-width:768px)'))
  // if (localStorage.getItem('article') == 0){
    return (
      <div className="App">
        <CssBaseline />
                <ElevationScroll {...{}}>
                  <AppBar color='blank' elevation={20}>
                    <Toolbar>
                      <Typography variant="h6">overwatched.site</Typography>
                      <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                          <a href='https://www.instagram.com/overwatched.site/'><Button >
                            <InstagramIcon />
                          </Button></a>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                          Browse by category
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={() => changeCurrentTag('all')}>All</MenuItem>
                          <MenuItem onClick={() => changeCurrentTag('overwatch league')}>Overwatch League</MenuItem>
                          <MenuItem onClick={() => changeCurrentTag('power rankings')}>Power Rankings</MenuItem>
                          <MenuItem onClick={() => changeCurrentTag('run it back')}>Run It Back</MenuItem>
                          <MenuItem onClick={() => changeCurrentTag('overwatch world cup')}>Overwatch World Cup</MenuItem>
                        </Menu>
                      </Grid>
                    </Toolbar>
                  </AppBar>
                </ElevationScroll>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Container>
          <ArticleBody />
          {/* {generateArticlesFromJSON(localStorage.getItem('tag'), desktopQuery)} */}
        </Container>
        <br />
        <br />
        <br />
        <Container style={{textAlign: 'center'}}>
          {footer()}
          <br />
        </Container>
      </div>
    )
  // } else {
    // return (
    //   <div className="App">
    //     <CssBaseline />
    //             <ElevationScroll {...{}}>
    //               <AppBar color='blank' elevation={20}>
    //                 <Toolbar>
    //                   <Typography variant="h6">overwatched.site</Typography>
    //                   <Grid container alignItems="flex-start" justify="flex-end" direction="row">
    //                       <a href='https://www.instagram.com/overwatched.site/'><Button >
    //                         <InstagramIcon />
    //                       </Button></a>
    //                     <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
    //                       Browse by category
    //                     </Button>
    //                     <Menu
    //                       id="simple-menu"
    //                       anchorEl={anchorEl}
    //                       keepMounted
    //                       open={Boolean(anchorEl)}
    //                       onClose={handleClose}
    //                     >
    //                       <MenuItem onClick={() => changeCurrentTag('all')}>All</MenuItem>
    //                       <MenuItem onClick={() => changeCurrentTag('overwatch league')}>Overwatch League</MenuItem>
    //                       <MenuItem onClick={() => changeCurrentTag('power rankings')}>Power Rankings</MenuItem>
    //                       <MenuItem onClick={() => changeCurrentTag('run it back')}>Run It Back</MenuItem>
    //                       <MenuItem onClick={() => changeCurrentTag('overwatch world cup')}>Overwatch World Cup</MenuItem>
    //                     </Menu>
    //                   </Grid>
    //                 </Toolbar>
    //               </AppBar>
    //             </ElevationScroll>
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <Container>
    //       <Grid containter spacing={3}>
    //         <Grid item xs={12}>
    //           {/* {generateFullPageArticleCard(localStorage.getItem('article'))} */}
    //         </Grid>
    //       </Grid>
    //     </Container>
    //     <br />
    //     <br />
    //     <br />
    //     <Container style={{textAlign: 'center'}}>
    //       {footer()}
    //       <br />
    //     </Container>
    //   </div>
    // )
  // }
}

export default App;
