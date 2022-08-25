import PropTypes from 'prop-types';

export const propTypes = {
  navigation: PropTypes.any,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.number.isRequired,
    description: PropTypes.number.isRequired,
  }),
};
