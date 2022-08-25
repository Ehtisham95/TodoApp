import PropTypes from 'prop-types';

export const propTypes = {
  date: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
};
