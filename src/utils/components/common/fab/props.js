import PropTypes from 'prop-types';

export const propTypes = {
  title: PropTypes.string,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
