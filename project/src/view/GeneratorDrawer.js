import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddGenerator from './AddGenerator'
import AddBoxOutlined from '@material-ui/icons/AddBoxOutlined';
import Add from '@material-ui/icons/Add';
import Line from '../UIKit/Line';

const drawerWidth = "30%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  IconButton: {
    // right: -400,
  },
  drawer: {
    flexShrink: 0,
      zIndex: 1,
      position: "absolute",
      top: 10,
      right: 80,
      // width:"200px"
      // backgroundColor: "red", // you can use any color value
      // width: "10%", // or you can use width: any_number
      // height: "200px" // or you can use height: any_number
  },
  drawerPaper: {
    width: drawerWidth,
    height: 'calc(100% - 100px)',
    top: "100px",
      position: "absolute",
      top: 10,
      right: 80,
      border:"black solid 2px",
      width: "350px", // or you can use width: any_number
      height: "200px" // or you can use height: any_number
  },
  // drawerHeader: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   padding: theme.spacing(0, 1),
  //   // necessary for content to be below app bar
  //   // ...theme.mixins.toolbar,
  //   justifyContent: 'flex-start',
  // },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function AddGeneratorDrawer(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    //setOpen(props.openDrawer)
    setOpen(false)

  }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root} style={{ zIndex:1,direction:"rtl"}}>
      <IconButton
        onClick={handleDrawerOpen}
        className={clsx(open && classes.hide)}
        // style={{borderRadius:"50%"},{border:"black solid 3px"}}
        style={{
          zIndex: 1,
          position: "absolute",
          top:0,
          right: 80,
          marginTop:5,
          backgroundColor: "white", // you can use any color value
          // width: "10%", // or you can use width: any_number
          // height: "200px" // or you can use height: any_number
        }}>
        {/* <svg viewBox="0 0 15 15" role="img" width="35px">
          <path
                                   d="m 4.4759086,12.939359 c -0.053073,-0.09101 -0.062993,-0.187217 -0.050553,-0.49033 0.017126,-0.417376 0.084144,-0.607758 0.2907645,-0.825986 l 0.1230465,-0.129958 h 3.0782098 3.0782116 l 0.123045,0.129958 c 0.206621,0.218229 0.27364,0.40861 0.290764,0.825986 0.02746,0.669267 0.407662,0.603553 -3.4920199,0.603553 -3.3053613,0 -3.3768087,-0.0024 -3.4414685,-0.113223 z M 5.0514726,7.5365808 V 4.0999106 H 6.3727648 7.6940573 V 7.5365808 10.973253 H 6.3727648 5.0514726 Z M 6.9283989,8.8031572 C 7.0042499,8.6854456 7.0029164,8.4973151 6.9252793,8.3641971 6.8716161,8.2721731 6.8012916,8.2585697 6.3792238,8.2585697 c -0.3985632,0 -0.4965274,0.016949 -0.5525241,0.095588 -0.084645,0.1188779 -0.087277,0.2955611 -0.00647,0.4341335 0.05378,0.092221 0.1242891,0.1056271 0.5556341,0.1056271 0.3994979,0 0.5052282,-0.01737 0.5525238,-0.090765 z m -0.00958,-1.1022508 c 0.083533,-0.117313 0.088011,-0.3272779 0.00958,-0.4489953 -0.085837,-0.1332054 -1.0254313,-0.1332054 -1.1112681,0 -0.083945,0.1302703 -0.072244,0.3498054 0.02424,0.4546725 0.1237278,0.1344885 0.9808711,0.1299712 1.0774582,-0.00568 z m 0.023405,-1.1289036 c 0.074033,-0.1148873 0.053075,-0.3770692 -0.038058,-0.4761259 -0.062928,-0.0684 -0.1825722,-0.089914 -0.5000405,-0.089914 -0.2295246,0 -0.4598141,0.025077 -0.5117518,0.055716 -0.1104855,0.065187 -0.1578741,0.2861863 -0.098365,0.4587365 0.03932,0.1140193 0.071909,0.1208977 0.5726232,0.1208977 0.3633193,0 0.5450293,-0.021886 0.5755921,-0.06931 z m 1.1984695,0.964578 V 4.0999106 H 9.4619843 10.783278 V 7.5365808 10.973253 H 9.4619843 8.1406916 Z m 1.61935,0.6786705 C 10.04268,7.3937374 10.029289,7.1611465 9.6993506,7.1611465 c -0.1008514,0 -0.1815397,-0.0267 -0.1815397,-0.060058 0,-0.033034 0.033487,-0.1619542 0.074437,-0.2864935 C 9.6911432,6.5138019 9.6861123,6.3749231 9.5721111,6.2590212 9.415254,6.099527 9.3201194,6.217877 9.1280057,6.8114928 9.0353336,7.0978385 8.9595142,7.3890729 8.9595142,7.4586835 c 0,0.2128328 0.1054114,0.3378174 0.2849142,0.3378174 0.088949,0 0.1617205,0.025281 0.1617205,0.056213 0,0.030918 -0.036506,0.1728028 -0.081119,0.3152983 -0.067592,0.2159109 -0.073931,0.2835435 -0.038016,0.4058594 0.033993,0.1157857 0.070131,0.1467742 0.1711165,0.1467742 0.1228826,0 0.1350053,-0.020287 0.3018977,-0.5053913 z M 4.790936,3.5223188 C 4.7013524,3.3832976 4.6978621,3.3005127 4.7744411,3.1308565 4.8298834,3.0080216 4.8561674,3.0024861 5.3839541,3.0024861 h 0.5515735 l 0.017426,-0.3263312 c 0.017818,-0.3335514 0.084162,-0.4822973 0.215096,-0.4822973 0.1313012,0 0.1972679,0.1486588 0.2152455,0.4850598 l 0.017597,0.3290934 0.1906456,-0.017191 0.1906455,-0.017191 0.019191,-0.3347812 c 0.019093,-0.3332261 0.065173,-0.4422153 0.1877069,-0.4440833 0.128257,-0.00194 0.1951578,0.1493216 0.212905,0.4814132 l 0.017426,0.3263307 h 0.697364 0.6973545 L 8.6361431,2.6716786 C 8.6583491,2.3376139 8.7219521,2.1928797 8.8456803,2.194766 8.9682146,2.196626 9.0142826,2.3056244 9.0333841,2.6388492 l 0.019196,0.3347811 H 9.257286 9.4619926 L 9.4728006,2.655955 c 0.01122,-0.329988 0.06869,-0.4620735 0.2010114,-0.4620735 0.1292927,0 0.2162026,0.2089635 0.2162026,0.5198327 v 0.2887941 h 0.5561834 c 0.532549,0 0.558644,0.00548 0.614122,0.1283705 0.07657,0.1696559 0.07308,0.2524411 -0.0165,0.3914625 -0.07322,0.113638 -0.124064,0.1155156 -3.1264402,0.1155156 -3.0023735,0 -3.05321,-0.00188 -3.1264386,-0.1155156 z"
          />
        </svg> */}
        <Add/>
        {/* <MenuIcon></MenuIcon> */}
      </IconButton>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

      </main>
      <Drawer
        containerstyle={{ height: 'calc(100% - 64px)', top: 64 }}
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        style={{ zIndex: 1 }}
      >
        <div className={classes.drawerHeader}>
          <Line>
          <IconButton onClick={handleDrawerClose} className={classes.IconButton}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <h2>הוספת גנרטור</h2>
          </Line>
        </div>
        {/* <div style={{ zIndex: 10}}> */}
          <AddGenerator style={{ zIndex: 1 }} />
        {/* </div> */}
      </Drawer>
    </div>
  );
}
