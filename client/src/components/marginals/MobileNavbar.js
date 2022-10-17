import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TrendingUpSharpIcon from '@mui/icons-material/TrendingUpSharp';

// Libraries
import { BarChart, Search } from 'react-feather';
import SearchIcon from '@mui/icons-material/Search';
import {
  Container,
  SwipeableDrawer,
  Typography,
  // InputAdornment,
  TextField,
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

// Assets
import logoFullDark from '../../assets/images/logos/logo_full_black.png';

// Hooks
import useToggle from '../../hooks/useToggle';

// Utils
import ROUTES from '../../utils/getRoutes';

// TODO: Add signin button to the mobile nav when ready.
const MobileNavbar = () => {
  const [isMenuOpen, toggleMenu, setMenuOpen] = useToggle(false);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [IsSearchActive, setIsSearchActive] = useState(false);
  const [IsInputActive, setIsInputActive] = useState(false);


  const router = useRouter();
  const classes = useStyles();

  const searchQuery = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const searchKeyword = (e) => {
    if (e.key === 'Enter') {
      if (searchText.length) {
        router.push(`/search?keyword=${searchText}`, undefined, {
          shallow: true,
        });
      }
    }
  };

  const searchActive = () => {
    setIsInputActive();
    setIsSearchActive(current => !current);
  };

  const inputActive = () => {
    setIsInputActive((current) => !current);
  };

  return (
    <>
          <div
        className={classes.searchMenu}
        style={{
          display: IsSearchActive ? 'block' : 'none',
        }}
      >
        <div className={classes.blackBackground} onClick={searchActive}></div>
        <div className={classes.searchBar}>
          <div className={classes.searchBox}>
            <TextField
              className={classes.searchField}
              id='input-with-icon-textfield'
              placeholder='Search for articles'
              onClick={setIsInputActive}
              color='primary'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant='standard'
            />
            <div
              className={classes.searchSuggestions}
              style={{
                display: IsInputActive ? 'block' : 'none',
              }}
            >
              <ul>
                <div className={classes.trendingList}>
                  <li className={classes.trendingHeading}>
                    Innovision Techfest
                  </li>
                </div>
                <div className={classes.trendingList}>
                  <li className={classes.trendingHeading}>Innovision 2019</li>
                </div>
                <div className={classes.trendingList}>
                  <TrendingUpSharpIcon className={classes.trendingSymbol} />
                  <li className={classes.trendingHeading}>Innovision 2021</li>
                </div>
                <div className={classes.trendingList}>
                  <li className={classes.trendingHeading}>
                    Innovsion Post-Fest
                  </li>
                </div>
                <div className={classes.trendingList}>
                  <li className={classes.trendingHeading}>
                    Innovision Pre-Fest
                  </li>
                </div>
                <div className={classes.trendingList}>
                  <TrendingUpSharpIcon className={classes.trendingSymbol} />
                  <li className={classes.trendingHeading}>
                    Innovision Pro-shows
                  </li>
                </div>
              </ul>
            </div>
          </div>

          <div className={classes.trendingArticles}>
            <TrendingUpSharpIcon />
            <h3 className={classes.trendingArticleHeading}>Trending Tags :</h3>
            <h3 className={classes.trendingArticleName}>Departments</h3>
            <h3 className={classes.trendingArticleName}>Clubs</h3>
            <h3 className={classes.trendingArticleName}>SAC</h3>
            <h3 className={classes.trendingArticleName}>Interview</h3>
            <h3 className={classes.trendingArticleName}>Placement</h3>
          </div>
        </div>
      </div>
      <Container className={classes.header}>
        {/* {!isMenuOpen && ( */}
        <BarChart
          onClick={toggleMenu}
          onKeyDown={toggleMenu}
          role='button'
          tabIndex={0}
          className={classes.menuIcon}
          size={30}
        />
        {/* )} */}

        <div className={classes.logoContainer}>
          <Image
            src={logoFullDark}
            alt='Monday Morning Logo'
            className={classes.logo}
            layout='fill'
            objectFit='cover'
          />
        </div>

        <Search
          className={classes.searchIcon}
          onClick={searchActive}
          // onClick={() => setSearch(!search)}
          onKeyDown={() => {}}
          role='button'
          tabIndex={0}
          size={30}
        />
      </Container>
      {search && (
        <Container>
          <TextField
            id='search-textfield'
            value={searchText}
            onKeyDown={searchKeyword}
            onChange={searchQuery}
            className={classes.searchField}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant='standard'
          />
        </Container>
      )}

      <SwipeableDrawer
        anchor='left'
        open={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        onOpen={() => setMenuOpen(true)}
        swipeAreaWidth={50}
        style={{ zIndex: 10001 }}
      >
        <nav className={classes.navContainer} aria-label='Navigation Container'>
          {ROUTES.CATEGORIES.map(({ name, shortName, path }) => (
            <Link
              key={shortName}
              href={path}
              passHref
              className={classes.navLink}
              exact
              activeClassName={classes.activeHeaderLink}
              onClick={toggleMenu}
            >
              <Typography variant='h3' className={classes.typography}>
                {name}
              </Typography>
            </Link>
          ))}
        </nav>
      </SwipeableDrawer>
    </>
  );
};

export default MobileNavbar;

const useStyles = makeStyles((theme) => ({
  header: {
    width: '100%',
    marginBottom: '10px',
    marginTop: '20px',

    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    position: 'relative',
  },
  menuIcon: {
    transform: 'rotateY(180deg) rotate(-90deg)',
    zIndex: 10000,
  },
  logoContainer: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    width: '40%',
    height: 'auto',
    '& > div': {
      position: 'unset !important',
    },
    '& > span': {
      position: 'unset !important',
    },
  },
  logo: {
    position: 'unset !important',
    width: 'auto !important',
    height: 'auto !important',
  },

  swipeableDrawer: {
    zIndex: 10001,
  },
  navContainer: {
    width: '200px',
    height: 'auto',
    minHeight: '40vh',

    marginTop: '60px',
    zIndex: 10001,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  navLink: {
    width: '100%',
    padding: '20px',
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.palette.secondary.neutral70,
  },
  searchField: {
    width: '100%',
    marginTop: 10,
  },
  activeHeaderLink: {},
  searchMenu: {
    zIndex: '2001',
    width: '100%',
    height: '100%',
    transition: '1s',
  },
  searchBar: {
    paddingLeft: '20px',
    paddingRight: '20px',
    position: 'absolute',
    display: 'block',
    marginRight: 'auto',
    width: '100%',
    paddingBottom: '20px',
    paddingTop: '20px',
    background: '#FEFEFF',
    zIndex: '20000',
  },
  searchBox: {
    position: 'relative',
  },
  searchField: {
    width: '100%',
    color: theme.palette.primary.blue50,
    paddingBottom: '0px',
  },
  trendingArticles: {
    position: 'absoulte',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '20px',
  },
  trendingArticleHeading: {
    paddingLeft: '10px',
    opacity: '0.5',
    zIndex: '2001',
  },
  trendingArticleName: {
    paddingLeft: '10px',
  },
  trendingSymbol: {
    position: 'absolute',
  },
  searchSuggestions: {
    position: 'absolute',
    background: '#FEFEFF',
    width: '100%',
    padding: '20px',
    zIndex: '20022',
    borderRadius: '0px 0px 5px 5px',
    border: '1px #ECEDEC',
    borderStyle: 'none solid solid',
    boxShadow: '0px 0px 5px grey',
  },
  trendingList: {
    alignItems: 'center',
    paddingBottom: '8px',
    paddingTop: '8px',
  },
  trendingHeading: {
    paddingLeft: '50px',
  },
  blackBackground: {
    position: 'fixed',
    background: '#000',
    width: '100%',
    height: '100vh',
    opacity: '0.7',
  },
}));
