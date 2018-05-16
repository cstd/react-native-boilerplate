
const React = require('react-native');

const { Platform } = React;

export default {
  drawerCover: {
    alignSelf: 'stretch',
    width: null,
    padding: 15,
    paddingBottom: 12,
    backgroundColor: '#FCB71E',
  },
  drawerLogo: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 3,
    alignSelf: 'flex-end',
  },
  drawerText: {
    color: 'white',
    fontWeight: 'bold',
    lineHeight: (Platform.OS === 'ios') ? 18 : 20,
    fontSize: 17,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  },
  logo: {
    width: 100,
    height: 46,
    marginBottom: 10,
  },
  listItemDivider: {
    backgroundColor: '#FCB71E',
    paddingBottom: 0,
  },
  listItem: {
    marginLeft: 0,
  },
  textDivider: {
    fontSize: 16,
    color: '#444',
    fontWeight: 'bold',
  },
  icon: {
    color: '#666',
    fontSize: 26,
    width: 30,
    marginLeft: 30,
  },
  text: {
    fontWeight: (Platform.OS === 'ios') ? '500' : '400',
    fontSize: 20,
    marginLeft: 10,
    color: '#666',
  },
  badgeText: {
    fontSize: (Platform.OS === 'ios') ? 13 : 13,
    fontWeight: '400',
    textAlign: 'center',
  },
};
